"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "./input"
import { ExerciseLookup } from "../forms/ExerciseLookup"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "./button"

type SetBuilderCardProps = {
  saveExerciseToWorkout: (exercise: Exercise) => void
}

export function SetBuilderCard({ saveExerciseToWorkout }: SetBuilderCardProps) {
  const { control, watch, register, handleSubmit, reset } = useForm<Exercise>({
    defaultValues: {
      exercise: null,
      sets: [{ set: 1, reps: null }],
    },
  })
  const { fields: sets, append: appendSet } = useFieldArray({
    name: "sets",
    control,
  })

  console.log(watch())

  const onSubmit = (data: Exercise) => {
    saveExerciseToWorkout(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="max-w-md bg-slate-50">
        <CardHeader>New Excercise</CardHeader>
        <CardContent>
          <ExerciseLookup name="exercise" control={control} className="mb-4" />
          <div className="grid gap-3">
            {sets.map((field, index) => {
              return (
                <div key={field.id} className="grid gap-1 ">
                  <label>Set {index + 1}</label>
                  <div className="grid gap-2 grid-cols-2">
                    <Input
                      placeholder="Reps"
                      {...register(`sets.${index}.reps`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Input
                      placeholder="Weight"
                      {...register(`sets.${index}.weight`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
              )
            })}
            <Button
              type="button"
              onClick={() =>
                appendSet({ set: sets.length + 1, reps: null, weight: null })
              }
              className="bg-slate-300 text-slate-600 mt-2"
            >
              Add set
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto bg-slate-700">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

SetBuilderCard.displayName = "SetBuilderCard"
