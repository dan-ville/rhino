"use client"

import { useCallback, useId, useState } from "react"

export function useWorkout( id = undefined) {
  const newId = useId()
  const workoutId = id || newId

  const [workout, setWorkout] = useState<Workout>(
    localStorage.getItem(`workout-${workoutId}`)
      ? JSON.parse(localStorage.getItem(`workout-${workoutId}`)!)
      : {
          exercises: [],
        }
  )

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
