"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components"
import { Exercise, WorkoutType } from "@/lib/types"

type SetBuilderCardProps = {
  exercise: Exercise
  workout: WorkoutType
}

export function SetDisplayCard({ exercise, workout }: SetBuilderCardProps) {
  return exercise.sets?.length ? (
    <Table>
      <TableHeader>
        <TableRow className="p-1">
          <TableHead className="p-1">Set</TableHead>
          <TableHead className="p-1">Reps</TableHead>
          <TableHead className="p-1">Weight</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercise.sets?.map((set, i) => (
          <TableRow key={set.id}>
            <TableCell className="p-1 w-[60px]">{i + 1}</TableCell>
            <TableCell className="p-1 w-[60px]">{set.reps}</TableCell>
            <TableCell className="p-1">
              {set.weight}{" "}
              <span className="font-light text-slate-500">
                {exercise.units}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : null
}
