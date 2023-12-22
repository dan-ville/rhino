import { WorkoutType } from "../types"

export function getStoredWorkouts(): { workouts: WorkoutType[] } {
  const storedWorkoutsJSON = localStorage.getItem("workouts")
  const storedWorkouts = storedWorkoutsJSON
    ? JSON.parse(storedWorkoutsJSON)
    : {}

  return storedWorkouts.workouts !== undefined
    ? { workouts: storedWorkouts.workouts }
    : { workouts: [] }
}
