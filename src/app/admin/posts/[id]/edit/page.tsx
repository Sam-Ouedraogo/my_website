import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import PostEditor from "@/components/blog/PostEditor"

export const metadata = {
  title: "Edit Post | Admin",
}

type Props = {
  params: Promise<{ id: string }>
}

async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      published: true,
    },
  })
}

export default async function EditPostPage({ params }: Props) {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  const { id } = await params

  let post
  try {
    post = await getPost(id)
  } catch {
    notFound()
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="px-6 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <div className="max-w-4xl">
        <PostEditor post={post} />
      </div>
    </div>
  )
}
