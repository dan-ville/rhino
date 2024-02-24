import { Workout, Page } from "@/components"

export default async function Home() {
  return (
    <Page>
      <Workout isEditing />
    </Page>
  )
}
