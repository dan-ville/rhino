"use client"
import React, { Fragment } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { WorkoutType } from "@/lib/types"
import Link from "next/link"
import { getWorkoutTimeOfDay } from "@/lib/utils"
import { SetDisplayCard } from "./ui/SetDisplayCard"
import { useWorkoutsDB } from "@/lib/hooks"
import { Maximize2, Trash2 } from "../../public/icons"
import { Button, buttonVariants } from "./ui/button"

type Props = {
  workout: WorkoutType
}

export default function WorkoutDisplay({ workout }: Props) {
  const service = useWorkoutsDB()

  const deleteWorkout = () => service.deleteWorkoutById(workout.id)

  // Hacky way to recreate button styles until I make linkVariants
  // h-[max-content] is to prevent flex item from resizing, idk how to flexbox it
  const linkClass =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-700 border-solid bg-transparent hover:bg-accent hover:text-accent-foreground p-2 h-[max-content]"

  return (
    <Card key={workout.id} className="bg-slate-200">
      <CardHeader className="flex-row justify-between items-center">
        <h2 className="text-2xl text-slate-800 font-semibold">
          {workout.name || getWorkoutTimeOfDay(workout.createdTime)}
        </h2>
        <div className="flex gap-2">
          <Link href={`/my-workouts/${workout.id}`} className={linkClass}>
            <Maximize2 />
          </Link>
          <Button
            onClick={deleteWorkout}
            className={buttonVariants({
              variant: "outline",
              className: "text-color-primary p-2 h-[max-content]",
            })}
          >
            <Trash2 className="grow-0" />
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
