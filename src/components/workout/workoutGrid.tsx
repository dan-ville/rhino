"use client"

import { useState } from "react"
import WorkoutDisplay from "./workoutDisplay"
import { WorkoutType } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { format } from "path"

type Props = {
  workouts: WorkoutType[]
}

const exerciseParams = ["difficulty", "equipment", "muscle", "type"]

const formatFilterValue = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

const getDefaultFilterValue = () => {
  const val = "difficulty"
  return val
}

export function WorkoutGrid({ workouts }: Props) {
  const [data, setData] = useState<WorkoutType[]>([])
  const [filterValue, setFilterValue] = useState(getDefaultFilterValue())

  const renderWorkout = (workout: WorkoutType) => (
    <WorkoutDisplay key={workout.id} workout={workout} />
  )

  const sortByNewest = (a: WorkoutType, b: WorkoutType) =>
    new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()

  // const filterSelectOptions = new Set(
  //   workouts.reduce((arr, workout) => {
  //     arr.indexOf()
  //     return arr
  //   }, [])
  // )

  const formattedFilterValue = formatFilterValue(filterValue)

  return (
    <div>
      <div className="mb-4">
        <Select onValueChange={(value) => setFilterValue(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{formattedFilterValue}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {exerciseParams.map((val) => (
              <SelectItem key={val} value={val}>
                {formatFilterValue(val)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        {workouts.sort(sortByNewest).map(renderWorkout)}
      </div>
    </div>
  )
}
