"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SetBuilderCardProps = {
  exercise: Exercise
  workout: Workout
}

export function SetDisplayCard({ exercise, workout }: SetBuilderCardProps) {
  return exercise.sets?.length ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Set</TableHead>
          <TableHead>Reps</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Units</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercise.sets?.map((set, i) => (
          <TableRow key={set.id}>
            <TableCell>{i}</TableCell>
            <TableCell>{set.reps}</TableCell>
            <TableCell>{set.weight}</TableCell>
            <TableCell>{exercise.units}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : null
}
