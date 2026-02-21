import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-8 px-6 lg:px-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
          <em>Samuel W. Ouedraogo</em>
        </h1>
        <h4 className="text-xl lg:text-2xl text-[var(--foreground)] opacity-80 mb-6">
          <em>Computer Engineer</em>
        </h4>

        <p className="text-base lg:text-lg leading-relaxed mb-8" id="about-me">
          I am a dedicated and innovative computer engineer with a strong foundation in software engineering.
          I build scalable, high-performance solutions using C++, Python, Node.js, and React, with experience
          across backend systems, data-driven applications, and modern web development. I am particularly
          passionate about machine learning, embedded systems, and full-stack development. Known for extracting
          actionable insights from complex datasets and collaborating effectively with cross-functional teams,
          I thrive in environments that value innovation, rigor, and continuous learning. I am deeply motivated
          to stay current with emerging technologies at the intersection of software, data, and finance.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a
            href="/assets/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[var(--sidebar-bg)] text-[var(--foreground)] rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all no-underline"
          >
            View Resume
          </a>
          <Link
            href="/blog"
            className="px-6 py-3 bg-[var(--card-bg)] text-[var(--foreground)] rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all no-underline"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </section>
  )
}
