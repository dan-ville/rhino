"use client"

import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { getStoredWorkouts } from "../utils"

export function useWorkout(id = undefined) {
  const newId = uuidv4()
  const workoutId = id || newId

  const [workout, setWorkout] = useState<Workout>(
    localStorage.getItem(`workout-${workoutId}`)
      ? JSON.parse(localStorage.getItem(`workout-${workoutId}`)!)
      : {
          id: workoutId,
          exercises: [],
        }
  )

  const saveWorkout = useCallback(() => {
    const storedWorkouts = getStoredWorkouts()

    const newWorkouts = storedWorkouts.workouts
      ? [...storedWorkouts.workouts, workout]
      : [workout]

    localStorage.setItem("workouts", JSON.stringify({ workouts: newWorkouts }))
  }, [workout])

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
