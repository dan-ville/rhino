"use client"
import { useParams, useRouter } from "next/navigation"
import { useWorkoutsDB } from "@/lib/hooks"
import { SetBuilderCard } from "./ui/SetBuilderCard"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form"
import { Input } from "./ui/input"
import { v4 as uuidv4 } from "uuid"
import { getWorkoutTimeOfDay } from "@/lib/utils"
import { WorkoutType } from "@/lib/types"

type Props = {
  workout?: WorkoutType
}

export function Workout({ workout }: Props) {
  const params = useParams()
  const router = useRouter()
  const { saveWorkout } = useWorkoutsDB()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<WorkoutType>({
    defaultValues: {
      id: uuidv4(),
      exercises: [
        {
          id: uuidv4(),
          units: "lbs",
          sets: [{ id: uuidv4(), reps: null, weight: null }],
          exercise: undefined,
        },
      ],
      createdTime: new Date().toUTCString(),
      name: getWorkoutTimeOfDay(),
    },
  })

  const { register, control } = form

  const { fields: exercises, append: appendExercise } = useFieldArray({
    name: "exercises",
    control: control,
  })

  useEffect(() => {
    // workout data does not arrive immediately, and hook form refs do not update with re-renders, so use reset to hydrate the form
    if (workout) {
      form.reset({ ...workout })
    }
  }, [workout, form])

  const handleAppendExercise = () => {
    appendExercise({
      id: uuidv4(),
      units: "lbs",
      sets: [{ id: uuidv4(), reps: null, weight: null }],
      exercise: undefined,
    })
  }

  const onSubmitSuccess: SubmitHandler<WorkoutType> = (data) => {
    saveWorkout(data, params.id)
    // If already on a Workout page, exit early
    if ("id" in params) return
    // Navigate to newly saved Workout
    else {
      router.push(`/my-workouts/${data.id}`)
    }
  }

  return (
    <form
      className="flex gap-6 flex-col"
      onSubmit={form.handleSubmit(onSubmitSuccess)}
    >
      <FormProvider {...form}>
        <Card className="bg-slate-200">
          <CardHeader>
            <Input
              className="text-xl text-slate-800 font-semibold bg-slate-200"
              {...register("name")}
            />
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 mb-3">
              {exercises.map((exercise, index) => {
                return (
                  <SetBuilderCard key={exercise.id} exerciseIndex={index} />
                )
              })}
            </div>
            <Button
              className="bg-slate-200 border border-dashed border-slate-400 text-slate-700 w-full hover:bg-slate-100"
              onClick={handleAppendExercise}
            >
              Add Exercise
            </Button>
          </CardContent>
          <CardFooter className="gap-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto bg-slate-200 border border-solid border-slate-700 text-slate-700"
            >
              Edit
            </Button>
            <Button className="bg-slate-700" type="submit">
              Save Workout
            </Button>
          </CardFooter>
        </Card>
      </FormProvider>
    </form>
  )
}
