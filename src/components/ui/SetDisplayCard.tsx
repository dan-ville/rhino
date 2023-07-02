"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "./button"

type SetBuilderCardProps = {
  exercise: Exercise
}

export function SetDisplayCard({ exercise }: SetBuilderCardProps) {
  return (
    <Card className="max-w-md bg-slate-50 h-max">
      <CardHeader>
        <p className="font-semibold">{exercise.exercise?.name || `Unnamed exercise`}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {exercise.sets.map((set, index) => {
            return (
              <div key={set.set} className="grid gap-1">
                <p>
                  <span className="font-medium">Set {index + 1}</span>: {set.reps} x {set.weight}{" "}
                  {exercise.units}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto bg-slate-700">
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}