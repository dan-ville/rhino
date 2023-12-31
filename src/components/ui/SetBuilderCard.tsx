"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "./input"
import { ExerciseLookup } from "../forms/ExerciseLookup"
import { useFieldArray, useFormContext } from "react-hook-form"
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
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type SetBuilderCardProps = {
  exerciseIndex: number
}

const FormItem = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn("grid w-full items-center gap-1.5", className)}>
    {children}
  </div>
)
export function SetBuilderCard({ exerciseIndex }: SetBuilderCardProps) {
  const { control, register, watch, setValue } = useFormContext()
  const { fields: sets, append: appendSet } = useFieldArray({
    name: `exercises.${exerciseIndex}.sets`,
    control,
  })

  const handleAppendSet = () => {
    appendSet({ set: sets.length + 1, reps: null, weight: null, id: uuidv4() })
  }

  const duplicateSet = (setIndex: number) => {
    appendSet({
      reps: watch(`exercises.${exerciseIndex}.sets.${setIndex}.reps`),
      weight: watch(`exercises.${exerciseIndex}.sets.${setIndex}.weight`),
      id: uuidv4(),
    })
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
                <div className="grid gap-2 grid-cols-[1fr_1fr_auto]">
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
                  {/* Appends new set with current values for reps and sets */}
                  <Button
                    className="self-end w-max px-2 border-none bg-transparent text-slate-700 hover:bg-transparent"
                    onClick={() => duplicateSet(setIndex)}
                  >
                    <PlusCircle />
                  </Button>
                </div>
              </div>
            )
          })}
          <Button
            type="button"
            onClick={() => handleAppendSet()}
            className="bg-slate-300 text-slate-600 mt-2 hover:bg-slate-200"
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
