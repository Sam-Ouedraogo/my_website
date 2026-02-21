import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { DeletePostButton } from "@/components/admin/DeletePostButton"

type PostRow = {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

async function getPosts(): Promise<PostRow[]> {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export default async function AdminPostsPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  let posts: PostRow[] = []
  try {
    posts = await getPosts()
  } catch {
    posts = []
  }

  return (
    <div className="px-6 lg:px-12 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-[var(--sidebar-bg)] rounded-lg font-medium hover:opacity-90 transition-opacity no-underline text-[var(--foreground)]"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-[var(--card-bg)] p-8 rounded-xl text-center">
          <p className="text-lg opacity-70 mb-4">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="text-[var(--accent)] hover:underline"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[var(--sidebar-bg)]">
              <tr>
                <th className="text-left px-6 py-4 font-medium">Title</th>
                <th className="text-left px-6 py-4 font-medium">Status</th>
                <th className="text-left px-6 py-4 font-medium">Created</th>
                <th className="text-left px-6 py-4 font-medium">Updated</th>
                <th className="text-right px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sidebar-bg)]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[var(--background)]">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm opacity-60">/{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.published
                          ? "bg-green-500/20 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm opacity-70">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm opacity-70">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-sm text-[var(--accent)] hover:underline"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-sm text-[var(--accent)] hover:underline"
                      >
                        Edit
                      </Link>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
