"use client"

import { useWorkout } from "@/lib/hooks"
import { SetBuilderCard } from "./ui/SetBuilderCard"
import { SetDisplayCard } from "./ui/SetDisplayCard"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"

export function Workout() {
  const { workout, saveWorkout, saveExerciseToWorkout } = useWorkout()
  const [editingId, setEditingId] = useState<string | null>(null)
  const { register, watch, handleSubmit } = useForm({
    defaultValues: workout,
  })

  const handleSaveWorkout = () => {
    handleSubmit((data) => {
      saveWorkout({
        ...workout,
        ...data,
      })
    })
  }

  return (
    <div className="flex gap-6 flex-col">
      <div className="max-w-xl mx-auto">
        <SetBuilderCard saveExerciseToWorkout={saveExerciseToWorkout} />
      </div>
      {workout.exercises.length ? (
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
            {workout.exercises.map((exercise) => {
              return <SetDisplayCard key={exercise.id} exercise={exercise} />
            })}
          </CardContent>
          <CardFooter>
            <Button
              className="ml-auto bg-slate-700"
              onClick={() => handleSaveWorkout()}
            >
              Save Workout
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  )
}
