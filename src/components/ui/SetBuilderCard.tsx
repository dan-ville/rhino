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
  const { fields, append: appendSet } = useFieldArray({
    name: "sets",
    control,
  })

  console.log(watch())

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Card>
        <CardHeader>New Excercise</CardHeader>
        <CardContent>
          <ExerciseLookup name="exercise" control={control} className="mb-6" />
          <div className="grid gap-2">
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <label className="mb-3">Set {index + 1}</label>
                  <Input
                    placeholder="Reps"
                    {...register(`sets.${index}.reps`, { valueAsNumber: true })}
                  />
                </div>
              )
            })}
            <Button
              type="button"
              onClick={() => appendSet({ set: fields.length + 1, reps: null })}
              className="bg-slate-300 text-slate-600"
            >
              Add set
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="float-right bg-slate-700">Save</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

SetBuilderCard.displayName = "SetBuilderCard"
