"use client"

import WorkoutDisplay from "./WorkoutDisplay"
import { WorkoutType } from "@/lib/types"

type Props = {
  workouts: WorkoutType[]
}
export function WorkoutGrid({ workouts }: Props) {
  console.log("re-render workout grid")
  const renderWorkout = (workout: WorkoutType) => (
    <WorkoutDisplay key={workout.id} workout={workout} />
  )

  const sortByNewest = (a: WorkoutType, b: WorkoutType) =>
    new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()

  return (
    <div className="grid gap-2">
      {workouts.sort(sortByNewest).map(renderWorkout)}
    </div>
  )
}
