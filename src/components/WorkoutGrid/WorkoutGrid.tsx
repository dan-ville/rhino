"use client"

import { useState } from "react"
import { WorkoutDisplay } from "../WorkoutDisplay"
import { WorkoutType } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import Link from "next/link"
import { Maximize2, Trash2 } from "lucide-react"
import { Button, buttonVariants } from "../ui"
import { useWorkoutsDB } from "@/lib/hooks"

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
  const [filteredData, setFilteredData] = useState<WorkoutType[]>([])
  const [filterValue, setFilterValue] = useState(getDefaultFilterValue())

  const service = useWorkoutsDB()

  // TODO: Create workout context so no need to recreate this function in different spots
  const deleteWorkout = (workout: WorkoutType) =>
    service.deleteWorkoutById(workout.id)

  // Hacky way to recreate button styles until I make linkVariants
  // h-[max-content] is to prevent flex item from resizing, idk how to flexbox it
  const linkClass =
    "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-700 border-solid bg-transparent hover:bg-accent hover:text-accent-foreground p-1 w-[25px] h-[25px]"

  const renderWorkout = (workout: WorkoutType) => (
    <WorkoutDisplay
      key={workout.id}
      workout={workout}
      actions={
        <div className="flex gap-2 items-center">
          <Link href={`/my-workouts/${workout.id}`} className={linkClass}>
            <Maximize2 />
          </Link>
          {/* TODO: Create WorkoutContext so this can be a standalone component */}
          <Button
            onClick={() => deleteWorkout(workout)}
            className={buttonVariants({
              variant: "outline",
              className: "text-color-primary p-1 w-[25px] h-[25px]",
              size: "sm",
            })}
          >
            <Trash2 className="grow-0" />
          </Button>
        </div>
      }
    />
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
