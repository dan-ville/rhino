"use client"

import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useWorkoutsDB } from "./useWorkoutsDB"

export function useWorkout(id = undefined) {
  const newId = uuidv4()
  const workoutId = id || newId
  const { storedWorkouts, saveWorkout } = useWorkoutsDB()

  const [workout, setWorkout] = useState<Workout>(
    storedWorkouts.workouts.find((workout) => workout.id === workoutId) || {
      id: workoutId,
      exercises: [],
    }
  )

  const saveExerciseToWorkout = useCallback((exercise: Exercise) => {
    setWorkout((workout) => ({
      ...workout,
      exercises: [...workout.exercises, exercise],
    }))
  }, [])

  return {
    workout,
    setWorkout,
    workoutId,
    saveWorkout,
    saveExerciseToWorkout,
  }
}
