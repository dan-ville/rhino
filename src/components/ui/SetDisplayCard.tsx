"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type SetBuilderCardProps = {
  exercise: Exercise
}

export function SetDisplayCard({ exercise }: SetBuilderCardProps) {
  return (
    <Card className="max-w-md bg-slate-50 h-max">
      <CardHeader>
        <p className="font-semibold">{exercise.exercise?.name}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {exercise.sets?.length
            ? exercise.sets.map((set, index) => {
                return (
                  <div key={set.id} className="grid gap-1">
                    <p>
                      <span className="font-medium">Set {index + 1}</span>:{" "}
                      {set.reps} x {set.weight} {exercise.units}
                    </p>
                  </div>
                )
              })
            : null}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
