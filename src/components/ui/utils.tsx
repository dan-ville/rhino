import { ReactNode } from "react"
import { MultipleFieldErrors } from "react-hook-form"

export const renderErrorMessage = (data: {
  message: string
  messages?: MultipleFieldErrors | undefined
}): ReactNode | undefined => {
  return <p className="text-red-500">{data.message}</p>
}
