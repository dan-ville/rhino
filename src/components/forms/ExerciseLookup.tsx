"use client"
import { Controller } from "react-hook-form"
import Select from "react-select/async"
import { Props, GroupBase } from "react-select"

type Exercise = {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
}

interface SelectFieldProps<Option, IsMulti, Group> extends Props {
  name: string
  control: any
}

export const ExerciseLookup = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectFieldProps<Option, IsMulti, Group>
) => {
  const { name, control, ...selectProps } = props

  const loadExerciseOptions = async (inputValue: string) => {
    const url = new URL(`https://api.api-ninjas.com/v1/exercises`)
    url.searchParams.set("name", inputValue)

    const data = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJA_KEY!,
      },
    })
    const exercises = await data.json()
    return exercises
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Select
            {...field}
            {...selectProps}
            loadOptions={loadExerciseOptions}
            getOptionLabel={(opt: Exercise) => opt.name}
            getOptionValue={(opt: Exercise) => opt.name}
          />
        )
      }}
    />
  )
}
