import Link from "next/link"

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    createdAt: Date
    published: boolean
  }
  showStatus?: boolean
}

export default function PostCard({ post, showStatus = false }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="bg-[var(--card-bg)] p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <Link href={`/blog/${post.slug}`} className="no-underline">
          <h3 className="text-xl font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
            {post.title}
          </h3>
        </Link>
        {showStatus && (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              post.published
                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
            }`}
          >
            {post.published ? "Published" : "Draft"}
          </span>
        )}
      </div>
      <time className="text-sm opacity-60 block mb-3">{formattedDate}</time>
      {post.excerpt && (
        <p className="text-sm opacity-80 line-clamp-3">{post.excerpt}</p>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-block mt-4 text-sm font-medium text-[var(--accent)] hover:underline"
      >
        Read more →
      </Link>
    </article>
  )
}
