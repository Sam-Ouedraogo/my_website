import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { SignOutButton } from "@/components/admin/SignOutButton"

export const metadata = {
  title: "Admin | Samuel W. Ouedraogo",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Allow access to login page without auth
  const isLoginPage = false // This will be handled by middleware or conditional rendering

  if (!session && !isLoginPage) {
    // We'll handle this in individual pages
  }

  return (
    <div className="min-h-[calc(100vh-120px)]">
      {session && (
        <nav className="bg-[var(--card-bg)] px-6 py-4 flex items-center justify-between mb-6">
          <div className="flex gap-6">
            <Link
              href="/admin"
              className="font-medium hover:text-[var(--accent)] transition-colors no-underline text-[var(--foreground)]"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/posts"
              className="font-medium hover:text-[var(--accent)] transition-colors no-underline text-[var(--foreground)]"
            >
              Posts
            </Link>
            <Link
              href="/admin/posts/new"
              className="font-medium hover:text-[var(--accent)] transition-colors no-underline text-[var(--foreground)]"
            >
              New Post
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-70">{session.user?.email}</span>
            <SignOutButton />
          </div>
        </nav>
      )}
      {children}
    </div>
  )
}
