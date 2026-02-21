import { prisma } from "@/lib/prisma"
import PostCard from "@/components/blog/PostCard"
import Link from "next/link"

export const revalidate = 60

export const metadata = {
  title: "Blog | Samuel W. Ouedraogo",
  description: "Thoughts on software engineering, machine learning, and technology.",
}

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  createdAt: Date
  published: boolean
}

async function getPosts(page: number = 1, limit: number = 10): Promise<{
  posts: BlogPost[]
  totalPages: number
  currentPage: number
}> {
  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        createdAt: true,
        published: true,
      },
    }),
    prisma.post.count({ where: { published: true } }),
  ])

  return {
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || "1", 10)

  let data
  try {
    data = await getPosts(page)
  } catch {
    data = { posts: [], totalPages: 0, currentPage: 1 }
  }

  const { posts, totalPages, currentPage } = data

  return (
    <div className="py-8 px-6 lg:px-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-lg opacity-70 mb-8">
          Thoughts on software engineering, machine learning, and technology.
        </p>

        {posts.length === 0 ? (
          <div className="bg-[var(--card-bg)] p-8 rounded-xl text-center">
            <p className="text-lg opacity-70 mb-4">No posts yet.</p>
            <p className="text-sm opacity-50">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className="px-4 py-2 bg-[var(--card-bg)] rounded-lg hover:bg-[var(--sidebar-bg)] transition-colors no-underline text-[var(--foreground)]"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 text-sm opacity-70">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className="px-4 py-2 bg-[var(--card-bg)] rounded-lg hover:bg-[var(--sidebar-bg)] transition-colors no-underline text-[var(--foreground)]"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
