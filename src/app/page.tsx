import { Page, SetBuilderCard } from "@/components"

export default function Home() {
  const classes = {
    input: "p-2 w-full",
  }

  return (
    <main>
      <Page>
        <SetBuilderCard />
      </Page>
    </main>
  )
}
