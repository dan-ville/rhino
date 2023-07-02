"use client"

import { useWorkout } from "@/lib/hooks"
import { SetBuilderCard } from "./ui/SetBuilderCard"

export function Workout() {
  const { workout, setWorkout, id, saveWorkout, saveExerciseToWorkout } =
    useWorkout()

  return (
    <div>
      <SetBuilderCard saveExerciseToWorkout={saveExerciseToWorkout} />
      
    </div>
  )
}
