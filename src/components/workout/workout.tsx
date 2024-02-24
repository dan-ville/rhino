"use client"
import { useParams, useRouter } from "next/navigation"
import { useWorkoutsDB } from "@/lib/hooks"
import { useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import { getWorkoutTimeOfDay } from "@/lib/utils"
import { WorkoutType } from "@/lib/types"
import { STATUS } from "@/lib/constants"
import { v4 as uuidv4 } from "uuid"
import { WorkoutForm } from "../WorkoutForm/WorkoutForm"
import { WorkoutDisplay } from "../WorkoutDisplay"

type Props = {
  workout?: WorkoutType
  isEditing?: boolean
}

export function Workout({ workout, isEditing: _isEditing }: Props) {
  const params = useParams()
  const router = useRouter()
  const { saveWorkout } = useWorkoutsDB()

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
      userDate: new Date().toDateString(),
    },
  })

  const [isEditing, setIsEditing] = useState(_isEditing || false)
  const [saveStatus, setSaveStatus] = useState(STATUS.IDLE)

  useEffect(() => {
    // workout data does not arrive immediately, and hook form refs do not update with re-renders, so use reset to hydrate the form
    if (workout) {
      form.reset({ ...workout })
    }
  }, [workout, form])

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
      setIsEditing(false)
    } catch (error) {
      // Handle any errors here
      console.error(error)
      setSaveStatus(STATUS.IDLE)
    }
  }

  const onSubmitFail: SubmitErrorHandler<WorkoutType> = () => {
    console.error("Failed to submit")
  }

  const onSubmit = form.handleSubmit(onSubmitSuccess, onSubmitFail)

  return (
    <Card className="bg-slate-200">
      {isEditing ? (
        <WorkoutForm form={form} onSubmit={onSubmit} saveStatus={saveStatus} />
      ) : (
        <WorkoutDisplay
          workout={form.watch()}
          actions={
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="secondary"
              type="button"
              size="sm"
            >
              Edit
            </Button>
          }
        />
      )}
    </Card>
  )
}
