import { Workout } from "@/components/Workout"
import { Page } from "@/components/layout"

export default async function Home() {
  return (
    <Page>
      <Workout isEditing />
    </Page>
  )
}
