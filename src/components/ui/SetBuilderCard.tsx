"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "./input"
import { ExerciseLookup } from "../forms/ExerciseLookup"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "./button"

type Exercise = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
} | null

type ExerciseSet = {
  set: number | null
  reps: number | null
}

type FormValues = {
  exercise: Exercise | null
  sets: ExerciseSet[]
}

export function SetBuilderCard() {
  const { control, watch, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      sets: [{ set: 1, reps: null }],
    },
  })
  const { fields: sets, append: appendSet } = useFieldArray({
    name: "sets",
    control,
  })

  console.log(watch())

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Card className="max-w-md">
        <CardHeader>New Excercise</CardHeader>
        <CardContent>
          <ExerciseLookup name="exercise" control={control} className="mb-4" />
          <div className="grid gap-3">
            {sets.map((field, index) => {
              return (
                <div key={field.id} className="grid gap-1">
                  <label>Set {index + 1}</label>
                  <Input
                    placeholder="Reps"
                    {...register(`sets.${index}.reps`, { valueAsNumber: true })}
                  />
                </div>
              )
            })}
            <Button
              type="button"
              onClick={() =>
                appendSet({ set: sets.length + 1, reps: null })
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
