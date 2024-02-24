"use client"
import { Card, CardContent, CardFooter, CardHeader, Button } from "@/components"
import { Input } from "./Input"
import { useFieldArray, useFormContext } from "react-hook-form"

import { v4 as uuidv4 } from "uuid"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"
import { Label } from "./Label"
import { PlusCircle, MinusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Unit } from "@/lib/types"
import { ErrorMessage } from "@hookform/error-message"
import { renderErrorMessage } from "./utils"
import { ExerciseLookup } from "../forms"

type SetBuilderCardProps = {
  exerciseIndex: number
  removeExercise: () => void
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
export function SetBuilderCard({
  exerciseIndex,
  removeExercise,
}: SetBuilderCardProps) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()
  const {
    fields: sets,
    append: appendSet,
    remove: removeSet,
  } = useFieldArray({
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
        <div className="w-full grid gap-2 grid-cols-[1fr_auto]">
          <div>
            <ExerciseLookup
              name={`exercises.${exerciseIndex}.exercise`}
              control={control}
              rules={{ required: "Please select an exercise." }}
            />
            <ErrorMessage
              name={`exercises.${exerciseIndex}.exercise`}
              errors={errors}
              render={renderErrorMessage}
            />
          </div>
          <Button
            variant="secondary"
            type="button"
            onClick={() => removeExercise()}
          >
            Remove Exercise
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {sets.map((field, setIndex) => {
            return (
              <div key={field.id} className="grid gap-1 ">
                <label>Set {setIndex + 1}</label>
                <div className="grid gap-2 grid-cols-[1fr_1fr__auto_auto]">
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
                          required: "This field is required.",
                          valueAsNumber: true,
                        }
                      )}
                    />
                    <ErrorMessage
                      name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                      errors={errors}
                      render={renderErrorMessage}
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
                          required: "This field is required.",
                          valueAsNumber: true,
                        }
                      )}
                    />
                    <ErrorMessage
                      name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                      errors={errors}
                      render={renderErrorMessage}
                    />
                  </FormItem>
                  {/* Appends new set with current values for reps and sets */}
                  <Button
                    className="self-end w-max px-2 border-none bg-transparent text-slate-700 hover:bg-transparent"
                    onClick={() => removeSet(setIndex)}
                    type="button"
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    className="self-end w-max px-2 border-none bg-transparent text-slate-700 hover:bg-transparent"
                    onClick={() => duplicateSet(setIndex)}
                    type="button"
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
            variant="secondary"
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
