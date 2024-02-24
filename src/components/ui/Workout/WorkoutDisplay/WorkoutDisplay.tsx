"use client"
import React, { Fragment } from "react"

import { WorkoutType } from "@/lib/types"
import { getWorkoutTimeOfDay } from "@/lib/utils"
import { SetDisplayCard, Card, CardContent, CardHeader } from "@/components"

type Props = {
  workout: WorkoutType
  actions?: React.ReactNode
}

export function WorkoutDisplay(props: Props) {
  const { workout, actions } = props

  return (
    <Card key={workout.id} className="bg-slate-200">
      <CardHeader className="flex-row justify-between items-center p-6 flex-wrap">
        <div className="flex gap-4 items-center flex-wrap">
          <span className="text-xl text-slate-800 font-semibold">
            {workout.name || getWorkoutTimeOfDay(workout.userDate)}
          </span>
          <span>{new Date(workout.userDate).toLocaleDateString()}</span>
        </div>
        {actions}
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {workout.exercises.map((exercise) => {
          return (
            <Fragment key={exercise.id}>
              <p className="font-medium py-1 border-b border-solid border-gray-300">
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
  )
}
