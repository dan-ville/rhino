import { Page } from "@/components"
import { Workout } from "@/components/Workout"

export default async function Home() {
  return (
    <main>
      <Page>
        <Workout />
      </Page>
    </main>
  )
}
