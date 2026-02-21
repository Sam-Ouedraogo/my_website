"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="hidden md:flex fixed top-0 right-0 left-[220px] lg:left-[280px] z-50 bg-[var(--background)] border-b border-[var(--sidebar-bg)] px-6 py-4 items-center justify-between">
      <nav className="flex gap-6">
        <Link href="/" className="hover:text-[var(--accent)] transition-colors no-underline">
          Home
        </Link>
        <Link href="/blog" className="hover:text-[var(--accent)] transition-colors no-underline">
          Blog
        </Link>
      </nav>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative w-12 h-6 rounded-full bg-[var(--card-bg)] border-2 border-[var(--sidebar-bg)] cursor-pointer"
        aria-label="Toggle theme"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[var(--sidebar-bg)] transition-transform duration-300 ${
            mounted && theme === "dark" ? "translate-x-6" : ""
          }`}
        />
      </button>
    </header>
  )
}
