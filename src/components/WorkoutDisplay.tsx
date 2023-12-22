"use client"
import React, { Fragment } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { WorkoutType } from "@/lib/types"
import Link from "next/link"
import { getWorkoutTimeOfDay } from "@/lib/utils"
import { SetDisplayCard } from "./ui/SetDisplayCard"
import { useWorkoutsDB } from "@/lib/hooks"
import { Maximize2, Trash2 } from "../../public/icons"
import { Button } from "./ui/button"

type Props = {
  workout: WorkoutType
}

export default function WorkoutDisplay({ workout }: Props) {
  const service = useWorkoutsDB()

  const deleteWorkout = () => service.deleteWorkoutById(workout.id)

  return (
    <Card key={workout.id} className="bg-slate-200">
      <CardHeader className="flex-row justify-between">
        <h2 className="text-2xl text-slate-800 font-semibold">
          {workout.name || getWorkoutTimeOfDay(workout.createdTime)}
        </h2>
        <div className="flex gap-2 items-start">
          <Link
            href={`/my-workouts/${workout.id}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-slate-300 font-xl text-slate-700 hover:text-slate-300 hover:bg-slate-400"
          >
            <Maximize2 />
          </Link>
          <Button
            onClick={deleteWorkout}
            className="bg-slate-300 font-xl text-slate-700 hover:text-slate-300 hover:bg-slate-400"
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {workout.exercises.map((exercise) => {
          return (
            <Fragment key={exercise.id}>
              <p className="font-semibold py-2">{exercise.exercise?.name}</p>
              <SetDisplayCard
                key={exercise.id}
                exercise={exercise}
                workout={workout}
              />
            </Fragment>
          )
        })}
      </CardContent>
    </Card>
  )
}
