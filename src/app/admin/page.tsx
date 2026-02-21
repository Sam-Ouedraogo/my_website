import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

type RecentPost = {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: Date
}

async function getStats(): Promise<{
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  recentPosts: RecentPost[]
}> {
  const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
  ])

  const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      createdAt: true,
    },
  })

  return { totalPosts, publishedPosts, draftPosts, recentPosts }
}

export default async function AdminDashboard() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  let stats
  try {
    stats = await getStats()
  } catch {
    stats = { totalPosts: 0, publishedPosts: 0, draftPosts: 0, recentPosts: [] }
  }

  const { totalPosts, publishedPosts, draftPosts, recentPosts } = stats

  return (
    <div className="px-6 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--card-bg)] p-6 rounded-xl">
          <h3 className="text-sm font-medium opacity-70 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold">{totalPosts}</p>
        </div>
        <div className="bg-[var(--card-bg)] p-6 rounded-xl">
          <h3 className="text-sm font-medium opacity-70 mb-2">Published</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {publishedPosts}
          </p>
        </div>
        <div className="bg-[var(--card-bg)] p-6 rounded-xl">
          <h3 className="text-sm font-medium opacity-70 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {draftPosts}
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-[var(--card-bg)] p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 bg-[var(--sidebar-bg)] rounded-lg font-medium hover:opacity-90 transition-opacity no-underline text-[var(--foreground)]"
          >
            New Post
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-center py-8 opacity-70">
            No posts yet. Create your first post!
          </p>
        ) : (
          <div className="divide-y divide-[var(--sidebar-bg)]">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <time className="text-sm opacity-60">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.published
                        ? "bg-green-500/20 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-sm text-[var(--accent)] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
