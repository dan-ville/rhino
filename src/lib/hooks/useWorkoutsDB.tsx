"use client"

import { useCallback, useEffect, useState } from "react"
import { getStoredWorkouts } from "../utils"

export function useWorkoutsDB() {
  const [storedWorkouts, setStoredWorkouts] = useState<{ workouts: Workout[] }>(
    { workouts: [] }
  )

  useEffect(() => {
    // set storedWorkouts from only after component has mounted, as getStoredWorkouts depends on localStorage which is not available on the server
    if (typeof window === undefined) return
    const data = getStoredWorkouts()
    setStoredWorkouts(data)
  }, [])

const saveWorkout = useCallback(
  (workout: Workout, id?: string) => {
    if (typeof window === "undefined") return

    let updatedWorkouts = storedWorkouts.workouts
    const workoutIndex = updatedWorkouts.findIndex((w) => w.id === id)

    if (workoutIndex !== -1) {
      // Update existing workout
      updatedWorkouts[workoutIndex] = workout
    } else {
      // Add new workout
      updatedWorkouts = [...updatedWorkouts, workout]
    }

    localStorage.setItem(
      "workouts",
      JSON.stringify({ workouts: updatedWorkouts })
    )
  },
  [storedWorkouts.workouts]
)

  const getWorkoutById = useCallback(
    (id: string) => storedWorkouts.workouts.find((w) => w.id === id),
    [storedWorkouts.workouts]
  )

  return { storedWorkouts, saveWorkout, getWorkoutById }
}
