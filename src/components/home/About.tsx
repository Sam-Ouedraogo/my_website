export default function About() {
  return (
    <section className="py-8 px-6 lg:px-12 bg-[var(--card-bg)]" id="about">
      <div className="max-w-4xl">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
          <em>What I Do</em>
        </h2>
        <p className="text-base lg:text-lg leading-relaxed">
          I apply statistics, probability, and optimization to model complex systems and financial market behavior.
          My work emphasizes performance, rigor, and real-world impact. I also build AWS cloud-native software solutions,
          designing scalable data pipelines, deploying model-driven services, and ensuring reliability from research to production.
        </p>
      </div>
    </section>
  )
}
