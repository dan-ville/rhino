"use client"

import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useWorkoutsDB } from "./useWorkoutsDB"
import { getWorkoutTimeOfDay } from "../utils"

export function useWorkout(id = undefined) {
  const newId = uuidv4()
  const workoutId = id || newId
  const { storedWorkouts, saveWorkout } = useWorkoutsDB()

  const [workout, setWorkout] = useState<Workout>(
    storedWorkouts.workouts.find((workout) => workout.id === workoutId) || {
      id: workoutId,
      exercises: [],
      dateCreated: new Date().toISOString().slice(0, 10),
      name: getWorkoutTimeOfDay(),
    }
  )

  const saveExerciseToWorkout = useCallback((newExercise: Exercise) => {
    setWorkout((workout) => {
      const exerciseIndex = workout.exercises.findIndex(
        (exercise) => exercise.id === newExercise.id
      )

      if (exerciseIndex === -1) {
        // exercise id not found, add the new exercise to the array
        return {
          ...workout,
          exercises: [...workout.exercises, newExercise],
        }
      } else {
        // exercise id found, update the existing exercise
        const updatedExercises = workout.exercises.map((exercise, index) =>
          index === exerciseIndex ? newExercise : exercise
        )

        return {
          ...workout,
          exercises: updatedExercises,
        }
      }
    })
  }, [])

  return {
    workout,
    setWorkout,
    workoutId,
    saveWorkout,
    saveExerciseToWorkout,
  }
}
