"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "./input"
import { ExerciseLookup } from "../forms/ExerciseLookup"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "./button"
import { v4 as uuidv4 } from "uuid"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Label } from "./label"

type SetBuilderCardProps = {
  saveExerciseToWorkout: (exercise: Exercise) => void
}

const FormItem = ({ children }: { children: React.ReactNode }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">{children}</div>
)

export function SetBuilderCard({ saveExerciseToWorkout }: SetBuilderCardProps) {
  const id = uuidv4()

  const { control, register, handleSubmit, reset, watch, setValue, setFocus } =
    useForm<Exercise>({
      defaultValues: {
        id,
        exercise: null,
        sets: [{ set: 1, reps: null }],
        units: "lbs",
      },
    })
  const { fields: sets, append: appendSet } = useFieldArray({
    name: "sets",
    control,
  })

  const onSubmit = (data: Exercise) => {
    saveExerciseToWorkout(data)
    reset()
    setFocus("exercise")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-slate-50">
        <CardHeader>
          <div className="w-full">
            <ExerciseLookup name="exercise" control={control} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sets.map((field, index) => {
              return (
                <div key={field.id} className="grid gap-1 ">
                  <label>Set {index + 1}</label>
                  <div className="grid gap-2 grid-cols-2">
                    <FormItem>
                      <Label htmlFor={`sets.${index}.reps`}>Reps</Label>
                      <Input
                        placeholder="Reps"
                        {...register(`sets.${index}.reps`, {
                          valueAsNumber: true,
                        })}
                        required
                      />
                    </FormItem>
                    <FormItem>
                      <Label htmlFor={`sets.${index}.weight`}>Weight</Label>
                      <Input
                        placeholder="Weight"
                        {...register(`sets.${index}.weight`, {
                          valueAsNumber: true,
                        })}
                        required
                      />
                    </FormItem>
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
          <div className="w-10px">
            <Select onValueChange={(value) => setValue("units", value as Unit)}>
              <SelectTrigger>
                <SelectValue placeholder={watch("units")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lbs">lbs</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="ml-auto bg-slate-700">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

SetBuilderCard.displayName = "SetBuilderCard"
