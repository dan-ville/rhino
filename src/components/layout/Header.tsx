import Link from "next/link"
import React from "react"

export function Header() {
  const linkClass = "bg-slate-700 px-2 py-1 rounded-lg"
  return (
    <header>
      <div className="p-6 flex justify-between items-center max-w-5xl mx-auto">
        <span className="text-2xl">RHINO</span>
        <nav className="flex gap-3">
          <Link href="my-workouts" className={linkClass}>
            My Workouts
          </Link>
          <Link href="/" className={linkClass}>
            New
          </Link>
        </nav>
      </div>
    </header>
  )
}
