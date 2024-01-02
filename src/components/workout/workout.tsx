"use client"
import { useParams, useRouter } from "next/navigation"
import { useWorkoutsDB } from "@/lib/hooks"
import { SetBuilderCard } from "../ui/setBuilderCard"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form"
import { Input } from "../ui/input"
import { v4 as uuidv4 } from "uuid"
import { getWorkoutTimeOfDay } from "@/lib/utils"
import { WorkoutType } from "@/lib/types"
import { STATUS } from "@/lib/constants"

type Props = {
  workout?: WorkoutType
}

export function Workout({ workout }: Props) {
  const params = useParams()
  const router = useRouter()
  const { saveWorkout } = useWorkoutsDB()
  const [isEditing, setIsEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState(STATUS.IDLE)

  const form = useForm<WorkoutType>({
    defaultValues: {
      id: uuidv4(),
      exercises: [
        {
          id: uuidv4(),
          units: "lbs",
          sets: [{ id: uuidv4(), reps: null, weight: null }],
          exercise: null,
        },
      ],
      createdTime: new Date().toUTCString(),
      name: getWorkoutTimeOfDay(),
    },
  })

  const { register, control } = form

  const {
    fields: exercises,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
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
      exercise: null,
    })
  }

  const onSubmitSuccess: SubmitHandler<WorkoutType> = async (data) => {
    setSaveStatus(STATUS.LOADING)

    // Introduce a slight delay to ensure UI updates
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      await saveWorkout(data, params.id)
      setSaveStatus(STATUS.SUCCESS)

      // Delay the switch back to IDLE
      setTimeout(() => {
        setSaveStatus(STATUS.IDLE)

        // Navigate if not already on a Workout page
        if (!("id" in params)) {
          router.push(`/my-workouts/${data.id}`)
        }
      }, 500) // half a second to show the success message
    } catch (error) {
      // Handle any errors here
      console.error(error)
      setSaveStatus(STATUS.IDLE)
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
                  <SetBuilderCard
                    key={exercise.id}
                    exerciseIndex={index}
                    removeExercise={() => removeExercise(index)}
                  />
                )
              })}
            </div>
            <Button
              variant="dashed"
              type="button"
              onClick={handleAppendExercise}
            >
              Add Exercise
            </Button>
          </CardContent>
          <CardFooter className="gap-2 justify-end">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="secondary"
              type="button"
            >
              Edit
            </Button>
            <Button
              variant="default"
              type="submit"
              disabled={saveStatus !== STATUS.IDLE}
              loading={saveStatus === STATUS.LOADING}
              success={saveStatus === STATUS.SUCCESS}
              successMessage="Saved!"
            >
              Save Workout
            </Button>
          </CardFooter>
        </Card>
      </FormProvider>
    </form>
  )
}
