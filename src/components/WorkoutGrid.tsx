"use client"

import { SetDisplayCard } from "@/components"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useWorkoutsDB } from "@/lib/hooks"
import { getWorkoutTimeOfDay } from "@/lib/utils"
import Link from "next/link"
import { Fragment } from "react"

export function WorkoutGrid() {
  const { storedWorkouts } = useWorkoutsDB()

  return (
    <div className="grid gap-2">
      {!storedWorkouts.workouts.length ? (
        <p>You have not worked out...</p>
      ) : (
        storedWorkouts.workouts.map((workout) => (
          <Card key={workout.id} className="bg-slate-200">
            <CardHeader className="flex-row justify-between">
              <h2 className="text-2xl text-slate-800 font-semibold">
                {workout.name || getWorkoutTimeOfDay(workout.dateCreated)}
              </h2>
              <Link
                href={`/my-workouts/${workout.id}`}
                className="text-sm font-normal"
              >
                Go to workout
              </Link>
            </CardHeader>
            <CardContent>
              {workout.exercises.map((exercise) => {
                return (
                  <Fragment key={exercise.id}>
                    <p className="font-semibold py-2">
                      {exercise.exercise?.name}
                    </p>
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
        ))
      )}
    </div>
  )
}
