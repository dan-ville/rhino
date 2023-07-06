"use client"

import { useWorkoutsDB } from "@/lib/hooks"
import { SetBuilderCard } from "./ui/SetBuilderCard"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { useForm, FormProvider, useFieldArray } from "react-hook-form"
import { Input } from "./ui/input"
import { v4 as uuidv4 } from "uuid"
import { getWorkoutTimeOfDay } from "@/lib/utils"

export function Workout() {
  const { saveWorkout } = useWorkoutsDB()
  const [isEditing, setIsEditing] = useState(false)
  const formMethods = useForm<Workout>({
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
      dateCreated: new Date().toISOString().slice(0, 10),
      name: getWorkoutTimeOfDay(),
    },
  })
  const { register, control } = formMethods
  const { fields: exercises, append: appendExercise } = useFieldArray({
    name: "exercises",
    control: control,
  })

  const handleAppendExercise = () => {
    appendExercise({
      id: uuidv4(),
      units: "lbs",
      sets: [{ id: uuidv4(), reps: null, weight: null }],
      exercise: undefined,
    })
  }

  return (
    <form
      className="flex gap-6 flex-col"
      onSubmit={formMethods.handleSubmit(saveWorkout)}
    >
      <FormProvider {...formMethods}>
        <Card className="bg-slate-200">
          <CardHeader>
            <Input
              className="text-xl text-slate-800 font-semibold bg-slate-200"
              {...register("name")}
            />
            <Input
              type="date"
              {...register("dateCreated")}
              className="text-slate-800 bg-slate-200"
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
