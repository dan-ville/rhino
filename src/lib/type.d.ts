type ExerciseAPIData = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}

type ExerciseSet = {
  set: number | null
  reps: number | null
  weight: number | null
  rpe?: number | null
}

type Unit = "kg" | "lbs"
type Exercise = {
  id: string
  exercise: ExerciseAPIData | null
  sets: ExerciseSet[]
  units: Unit
}

type Workout = {
  id: string
  exercises: Exercise[]
}
