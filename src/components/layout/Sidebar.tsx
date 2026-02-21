"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const socialLinks = [
  { href: "https://linkedin.com/in/samuel-ouedraogo", icon: "/assets/linkedin.png", alt: "LinkedIn" },
  { href: "https://github.com/samuelwouedraogo", icon: "/assets/github.webp", alt: "GitHub" },
  { href: "https://x.com/Drago231231", icon: "/assets/x.webp", alt: "X (Twitter)" },
]

const menuItems = [
  { href: "#about", icon: "/assets/about_me.webp", label: "About Me" },
  { href: "/assets/Resume.pdf", icon: "/assets/resume.png", label: "Resume", external: true },
  { href: "mailto:samwdrago@outlook.com", icon: "/assets/email.jpg", label: "Email", external: true },
]

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 flex flex-col justify-between w-8 h-6 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span className={`w-full h-0.5 bg-[var(--foreground)] transition-transform ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
        <span className={`w-full h-0.5 bg-[var(--foreground)] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-full h-0.5 bg-[var(--foreground)] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
      </button>

      {/* Mobile theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="md:hidden fixed top-4 right-4 z-50 w-12 h-6 rounded-full bg-[var(--card-bg)] border-2 border-[var(--sidebar-bg)]"
        aria-label="Toggle theme"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[var(--sidebar-bg)] transition-transform duration-300 ${
            mounted && theme === "dark" ? "translate-x-6" : ""
          }`}
        />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[220px] lg:w-[280px] bg-[var(--sidebar-bg)] p-6 flex flex-col items-center gap-6 z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h4 className="text-lg font-semibold mt-8 md:mt-0">Samuel W. Ouedraogo</h4>

        <div className="relative w-32 h-32 lg:w-40 lg:h-40">
          <Image
            src="/assets/profile_picture.jpg"
            alt="Samuel W. Ouedraogo"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>

        <p className="text-sm text-center text-[var(--foreground)] opacity-80">
          Hello my name is Samuel Ouedraogo and I have a background in Mathematics, Computer Engineering, and Analytics.
          <br />
          Welcome to my personal website!
        </p>

        {/* Social icons */}
        <ul className="flex gap-4 list-none p-0">
          {socialLinks.map((link) => (
            <li key={link.alt}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-8 h-8 relative hover:scale-110 hover:-translate-y-1 transition-transform"
              >
                <Image src={link.icon} alt={link.alt} fill className="rounded-full object-cover" />
              </a>
            </li>
          ))}
        </ul>

        {/* Menu items */}
        <ul className="flex flex-col gap-4 list-none p-0 w-full">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors cursor-pointer no-underline text-[var(--foreground)]"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src={item.icon} alt={item.label} width={24} height={24} className="rounded-full" />
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors cursor-pointer no-underline text-[var(--foreground)]"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src={item.icon} alt={item.label} width={24} height={24} className="rounded-full" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Blog link */}
        <Link
          href="/blog"
          className="mt-auto mb-4 px-6 py-2 bg-[var(--card-bg)] rounded-full font-medium hover:scale-105 transition-transform no-underline text-[var(--foreground)]"
          onClick={() => setMenuOpen(false)}
        >
          Read Blog
        </Link>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
