"use client"

import { useWorkout } from "@/lib/hooks"
import { SetBuilderCard } from "./ui/SetBuilderCard"
import { SetDisplayCard } from "./ui/SetDisplayCard"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export function Workout() {
  const { workout, saveWorkout, saveExerciseToWorkout } =
    useWorkout()
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="flex gap-6 flex-col">
      <div className="max-w-xl mx-auto">
        <SetBuilderCard saveExerciseToWorkout={saveExerciseToWorkout} />
      </div>
      {workout.exercises.length ? (
        <Card className="bg-slate-200">
          <CardHeader>
            <h2 className="text-2xl text-slate-800 font-semibold">WORKOUT</h2>
          </CardHeader>
          <CardContent>
            {workout.exercises.map((exercise) => {
              return <SetDisplayCard key={exercise.id} exercise={exercise} />
            })}
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-slate-700" onClick={saveWorkout}>
              Save Workout
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  )
}
