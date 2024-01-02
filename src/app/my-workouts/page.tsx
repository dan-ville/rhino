"use client"
import { Page, WorkoutGrid, useAppContextSelector } from "@/components"


export default function MyWorkoutsPage() {
  const workouts = useAppContextSelector((state) => state.workouts)

  return (
    <Page>
      <WorkoutGrid workouts={workouts} />
    </Page>
  )
}
