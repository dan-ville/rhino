import React from "react"

export function Header() {
  return (
    <header>
      <div className="p-6 flex justify-between items-center max-w-5xl mx-auto">
        <span className="text-2xl">RHINO</span>
        <nav>My Workouts</nav>
      </div>
    </header>
  )
}
