"use client"

import { useCallback } from "react"

import { WorkoutType } from "../types"
import { useAppContext } from "@/components/AppContext"

// TODO: Convert this to a singleton function/class outside of react lifecycle
export function useWorkoutsDB() {
  const { workouts, setWorkouts } = useAppContext()

  const saveWorkout = useCallback(
    (workout: WorkoutType, id?: string) => {
      if (typeof window === "undefined") return

      let updatedWorkouts = workouts
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
      setWorkouts(updatedWorkouts)
    },
    [workouts, setWorkouts]
  )

  const getWorkoutById = useCallback(
    (id: string) => workouts.find((w) => w.id === id),
    [workouts]
  )

  const deleteWorkoutById = useCallback(
    (id: string) => {
      const filteredWorkouts = workouts.filter((w) => w.id !== id)
      localStorage.setItem(
        "workouts",
        JSON.stringify({ workouts: filteredWorkouts })
      )
      setWorkouts(filteredWorkouts)
      return filteredWorkouts
    },
    [workouts, setWorkouts]
  )

  return { workouts, saveWorkout, getWorkoutById, deleteWorkoutById }
}
