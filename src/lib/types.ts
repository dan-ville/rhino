export type ExerciseAPIData = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}

export type ExerciseSet = {
  reps: number | null
  weight: number | null
  rpe?: number | null
  id: string
}

export type Unit = "kg" | "lbs"

export type Exercise = {
  id: string
  exercise?: ExerciseAPIData
  sets?: ExerciseSet[]
  units: Unit
}

export type WorkoutType = {
  id: string
  name: string
  createdTime: string
  exercises: Exercise[]
}
