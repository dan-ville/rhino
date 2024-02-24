import Link from "next/link"
import React from "react"
import { buttonVariants } from "../ui/Button"

export function Header() {
  return (
    <header>
      <div className="p-6 flex justify-between items-center max-w-5xl mx-auto">
        <span className="text-2xl">RHINO</span>
        <nav className="flex gap-3">
          <Link
            href="/my-workouts"
            className={buttonVariants({ variant: "secondary" })}
          >
            My Workouts
          </Link>
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            New
          </Link>
        </nav>
      </div>
    </header>
  )
}
