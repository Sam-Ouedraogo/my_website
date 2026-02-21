import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Samuel W. Ouedraogo | Computer Engineer",
  description: "Personal portfolio website of Samuel W. Ouedraogo - Computer Engineer specializing in software engineering, machine learning, and full-stack development.",
  icons: {
    icon: "/assets/profile_picture.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Sidebar />
          <Header />
          <main className="md:ml-[220px] lg:ml-[280px] md:pt-16 pt-14 flex-1">
            {children}
          </main>
          <div className="md:ml-[220px] lg:ml-[280px]">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
