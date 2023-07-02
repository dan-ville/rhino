import React, { PropsWithChildren } from "react"

export function Page(props: PropsWithChildren) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {props.children}
    </div>
  )
}
