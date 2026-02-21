import Image from "next/image"

const skills = [
  {
    name: "C++",
    icon: "/assets/cpp.png",
    description: "I use C++ to develop high-performance and resource-efficient applications, with a focus on system-level programming, numerical computation, and low-latency execution. I have experience leveraging C++ libraries and frameworks to build reliable software for data-driven and embedded environments."
  },
  {
    name: "Python",
    icon: "/assets/python.png",
    description: "I leverage Python for statistical analysis, quantitative modeling, and machine learning, with extensive experience using libraries such as Pandas, NumPy, and SciPy to analyze large datasets, build predictive models, and derive actionable insights."
  },
  {
    name: "NodeJS",
    icon: "/assets/nodejs.png",
    description: "I design and build robust backend systems using Node.js, focusing on scalable servers, high-performance APIs, and clean system architecture. I have hands-on experience with Express.js and modern databases including MongoDB and PostgreSQL, and I prioritize reliability, security, and maintainability in production environments."
  },
  {
    name: "TypeScript React",
    icons: ["/assets/javaScript.png", "/assets/reactjs.png"],
    description: "I specialize in building modern, scalable web applications using TypeScript and React. I design intuitive, interactive user interfaces with a strong focus on responsiveness, accessibility, and performance, while applying frontend best practices across the entire development lifecycle."
  },
  {
    name: "SQL MongoDB DynamoDB",
    icons: ["/assets/sql.png", "/assets/dynamodb.svg"],
    description: "I have extensive experience querying, transforming, and managing data across both SQL and NoSQL systems. I regularly write optimized SQL queries for complex joins, aggregations, and performance-critical analytics, and work with NoSQL databases such as MongoDB and DynamoDB to wrangle semi-structured data, design efficient schemas, and support scalable data pipelines."
  }
]

export default function Skills() {
  return (
    <section className="py-8 px-6 lg:px-12" id="skills">
      <div className="max-w-6xl">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-center">
          <em>Skills & Technologies</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[var(--card-bg)] p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {skill.icons ? (
                  skill.icons.map((icon) => (
                    <Image
                      key={icon}
                      src={icon}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ))
                ) : (
                  <Image
                    src={skill.icon!}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm leading-relaxed opacity-80">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
