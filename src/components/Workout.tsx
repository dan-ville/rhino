"use client"

import { useWorkout } from "@/lib/hooks"
import { SetBuilderCard } from "./ui/SetBuilderCard"
import { SetDisplayCard } from "./ui/SetDisplayCard"
import { useState } from "react"
import styles from "./Workout.module.scss"

export function Workout() {
  const { workout, setWorkout, id, saveWorkout, saveExerciseToWorkout } =
    useWorkout()
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="flex gap-6">
      <div className={styles["new-exercise-card"]}>
        <SetBuilderCard saveExerciseToWorkout={saveExerciseToWorkout} />
      </div>
      <div className={styles["display-cards"]}>
        {workout.exercises.map((exercise) => {
          return <SetDisplayCard key={exercise.id} exercise={exercise} />
        })}
      </div>
    </div>
  )
}
