type ExerciseAPIData = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}

type ExerciseSet = {
  reps: number | null
  weight: number | null
  rpe?: number | null
  id: string
}

type Unit = "kg" | "lbs"
type Exercise = {
  id: string
  exercise?: ExerciseAPIData
  sets?: ExerciseSet[]
  units: Unit
}

type Workout = {
  id: string
  name: string
  dateCreated: string
  exercises: Exercise[]
}
