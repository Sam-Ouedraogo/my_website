import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  return post
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  let post
  try {
    post = await getPost(slug)
  } catch {
    return {
      title: "Post Not Found | Samuel W. Ouedraogo",
    }
  }

  if (!post) {
    return {
      title: "Post Not Found | Samuel W. Ouedraogo",
    }
  }

  return {
    title: `${post.title} | Samuel W. Ouedraogo`,
    description: post.excerpt || post.title,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="py-8 px-6 lg:px-12">
      <article className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-block mb-6 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm opacity-70">
            <time>{formattedDate}</time>
            {post.author?.name && (
              <>
                <span>•</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>
        </header>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
