"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "./input"
import { ExerciseLookup } from "../forms/ExerciseLookup"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
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
  exerciseIndex: number
}

const FormItem = ({ children }: { children: React.ReactNode }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">{children}</div>
)

export function SetBuilderCard({ exerciseIndex }: SetBuilderCardProps) {
  const { control, register, watch, setValue } = useFormContext()
  const { fields: sets, append: appendSet } = useFieldArray({
    name: `exercises.${exerciseIndex}.sets`,
    control,
  })
  const handleAppendSet = () => {
    appendSet({ set: sets.length + 1, reps: null, weight: null })
  }
  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <div className="w-full">
          <ExerciseLookup
            name={`exercises.${exerciseIndex}.exercise`}
            control={control}
            required
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {sets.map((field, setIndex) => {
            return (
              <div key={field.id} className="grid gap-1 ">
                <label>Set {setIndex + 1}</label>
                <div className="grid gap-2 grid-cols-2">
                  <FormItem>
                    <Label
                      htmlFor={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                    >
                      Reps
                    </Label>
                    <Input
                      placeholder="Reps"
                      {...register(
                        `exercises.${exerciseIndex}.sets.${setIndex}.reps`,
                        {
                          valueAsNumber: true,
                        }
                      )}
                      required
                    />
                  </FormItem>
                  <FormItem>
                    <Label
                      htmlFor={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                    >
                      Weight
                    </Label>
                    <Input
                      placeholder="Weight"
                      {...register(
                        `exercises.${exerciseIndex}.sets.${setIndex}.weight`,
                        {
                          valueAsNumber: true,
                        }
                      )}
                      required
                    />
                  </FormItem>
                </div>
              </div>
            )
          })}
          <Button
            type="button"
            onClick={() => handleAppendSet()}
            className="bg-slate-300 text-slate-600 mt-2"
          >
            Add set
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-10px">
          <Select
            onValueChange={(value) =>
              setValue(`exercises.${exerciseIndex}.units`, value as Unit)
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={watch(`exercises.${exerciseIndex}.units`)}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lbs">lbs</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  )
}

SetBuilderCard.displayName = "SetBuilderCard"
