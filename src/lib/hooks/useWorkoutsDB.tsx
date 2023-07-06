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
    (workout: Workout) => {
      if (typeof window === undefined) return

      const newWorkouts = storedWorkouts.workouts
        ? [...storedWorkouts.workouts, workout]
        : [workout]

      localStorage.setItem(
        "workouts",
        JSON.stringify({ workouts: newWorkouts })
      )
    },
    [storedWorkouts.workouts]
  )

  return { storedWorkouts, saveWorkout }
}
