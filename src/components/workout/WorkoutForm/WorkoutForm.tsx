import React, { useState } from "react"
import { FormProvider, UseFormReturn, useFieldArray } from "react-hook-form"
import { WorkoutType } from "@/lib/types"
import { Button, Input, SetBuilderCard } from "../../ui"
import { CardContent, CardFooter, CardHeader } from "../../ui/Card"
import { DatePicker } from "../../ui/DatePicker"
import { v4 as uuidv4 } from "uuid"
import { STATUS } from "@/lib/constants"

type Props = {
  form: UseFormReturn<WorkoutType, any, undefined>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  saveStatus: STATUS
}

export function WorkoutForm(props: Props) {
  const { form, onSubmit, saveStatus } = props
  const { register, control } = form

  const initialUserDate = form.getValues("userDate")

  const [userDate, setUserDate] = useState<Date | undefined>(
    initialUserDate ? new Date(initialUserDate) : new Date()
  )

  const handleSetUserDate = (date?: Date) => {
    setUserDate(date)
    form.setValue("userDate", date?.toDateString() ?? new Date().toDateString())
  }

  const {
    fields: exercises,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
    name: "exercises",
    control: control,
  })
  const handleAppendExercise = () => {
    appendExercise({
      id: uuidv4(),
      units: "lbs",
      sets: [{ id: uuidv4(), reps: null, weight: null }],
      exercise: null,
    })
  }

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <FormProvider {...form}>
        <CardHeader className="flex-row items-center gap-4">
          <Input
            className="text-xl text-slate-800 font-semibold bg-slate-200"
            {...register("name")}
            placeholder="Workout Name"
          />
          <DatePicker date={userDate} setDate={handleSetUserDate} required />
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 mb-3">
            {exercises.map((exercise, index) => {
              return (
                <SetBuilderCard
                  key={exercise.id}
                  exerciseIndex={index}
                  removeExercise={() => removeExercise(index)}
                />
              )
            })}
          </div>
          <Button variant="dashed" type="button" onClick={handleAppendExercise}>
            Add Exercise
          </Button>
        </CardContent>
        <CardFooter className="gap-2 justify-end">
          <Button
            variant="default"
            type="submit"
            disabled={saveStatus !== STATUS.IDLE}
            loading={saveStatus === STATUS.LOADING}
            success={saveStatus === STATUS.SUCCESS}
            successMessage="Saved!"
          >
            Save Workout
          </Button>
        </CardFooter>
      </FormProvider>
    </form>
  )
}
