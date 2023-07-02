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
}

type Exercise = {
  exercise: ExerciseAPIData | null
  sets: ExerciseSet[]
}

type Workout = {
  exercises: Exercise[]
}
