import React, { PropsWithChildren } from "react"

export function Page(props: PropsWithChildren) {
  return <div className="p-3">{props.children}</div>
}
