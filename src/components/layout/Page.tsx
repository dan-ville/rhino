import React, { PropsWithChildren } from "react"

export function Page(props: PropsWithChildren) {
  return <div className="p-6">{props.children}</div>
}
