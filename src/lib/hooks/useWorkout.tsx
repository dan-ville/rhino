"use client"

import { useCallback, useId, useState } from "react"

export function useWorkout() {
  const [workout, setWorkout] = useState<Workout>({
    exercises: [],
  })
  const id = useId()

  const saveWorkout = useCallback(() => {
    localStorage.setItem(`workout-${id}`, JSON.stringify(workout))
  }, [workout, id])

  const saveExerciseToWorkout = useCallback((exercise: Exercise) => {
    setWorkout((workout) => ({
      ...workout,
      exercises: [...workout.exercises, exercise],
    }))
  }, [])

  return { workout, setWorkout, id, saveWorkout, saveExerciseToWorkout }
}
