'use client'

import { Page, SetDisplayCard } from "@/components"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useWorkoutsDB } from "@/lib/hooks"

export default function MyWorkoutsPage() {
  const { storedWorkouts } = useWorkoutsDB()

  return (
    <main>
      <Page>
        {!storedWorkouts.workouts.length ? (
          <p>You have not worked out...</p>
        ) : (
          storedWorkouts.workouts.map((workout) => (
            <Card key={workout.id} className="bg-slate-200">
              <CardHeader>
                <h2 className="text-2xl text-slate-800 font-semibold">
                  WORKOUT
                </h2>
              </CardHeader>
              <CardContent>
                {workout.exercises.map((exercise) => {
                  return (
                    <SetDisplayCard key={exercise.id} exercise={exercise} />
                  )
                })}
              </CardContent>
            </Card>
          ))
        )}
      </Page>
    </main>
  )
}
