export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto py-6 text-center text-sm opacity-70 border-t border-[var(--sidebar-bg)]">
      <p>Copyright &copy; {currentYear} Samuel W. Ouedraogo. All Rights Reserved.</p>
    </footer>
  )
}
