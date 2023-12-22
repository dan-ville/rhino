"use client"
import { Page, Workout } from "@/components"
import { STATUS } from "@/lib/constants"
import { useWorkoutsDB } from "@/lib/hooks"
import { WorkoutType } from "@/lib/types"
import React, { useEffect, useState } from "react"

type PageProps = { params: { id: string } }

export default function WorkoutPage({ params: { id } }: PageProps) {
  const { getWorkoutById } = useWorkoutsDB()
  const [data, setData] = useState<WorkoutType>()
  const [status, setStatus] = useState(STATUS.IDLE)

  useEffect(() => {
    setStatus(STATUS.LOADING)
    try {
      const workout = getWorkoutById(id)
      setData(workout)
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setStatus(STATUS.ERROR)
    }
  }, [id, getWorkoutById])

  let content = null

  switch (status) {
    case STATUS.LOADING:
      content = <p>Loading...</p>
    case STATUS.ERROR:
      content = <p>We could not find a workout with id of {id}</p>
    case STATUS.SUCCESS:
      content = <Workout workout={data} />
  }

  return (
    <main>
      <Page>{content}</Page>
    </main>
  )
}
