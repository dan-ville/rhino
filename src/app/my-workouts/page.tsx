"use client"
import { Page, WorkoutGrid } from "@/components"
import { useAppContextSelector } from "@/components/AppContext"

export default function MyWorkoutsPage() {
  const workouts = useAppContextSelector((state) => state.workouts)

  return (
    <main>
      <Page>
        <WorkoutGrid workouts={workouts} />
      </Page>
    </main>
  )
}
