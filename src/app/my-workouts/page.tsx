"use client"

import { useAppContextSelector } from "@/components/AppContext"
import { WorkoutGrid } from "@/components/WorkoutGrid"
import { Page } from "@/components/layout"


export default function MyWorkoutsPage() {
  const workouts = useAppContextSelector((state) => state.workouts)

  return (
    <Page>
      <WorkoutGrid workouts={workouts} />
    </Page>
  )
}
