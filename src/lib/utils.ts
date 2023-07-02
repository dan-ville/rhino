import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStoredWorkouts(): { workouts: Workout[] } {
  const storedWorkoutsJSON = localStorage.getItem("workouts")
  const storedWorkouts = storedWorkoutsJSON
    ? JSON.parse(storedWorkoutsJSON)
    : {}

  return storedWorkouts.workouts !== undefined
    ? { workouts: storedWorkouts.workouts }
    : { workouts: [] }
}