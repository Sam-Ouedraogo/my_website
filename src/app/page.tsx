import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Skills from "@/components/home/Skills"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Skills />
    </div>
  )
}
