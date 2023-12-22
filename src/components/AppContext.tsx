"use client"

import { WorkoutType } from "@/lib/types"
import { getStoredWorkouts } from "@/lib/utils"
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type AppContextState = {
  workouts: WorkoutType[]
  setWorkouts: Dispatch<SetStateAction<WorkoutType[]>>
}

const AppContext = createContext<AppContextState | undefined>(undefined)
const { Provider } = AppContext

export function AppContextProvider({ children }: PropsWithChildren) {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([])
  console.log(workouts)
  useEffect(() => {
    // set workouts from only after component has mounted, as getWorkouts depends on localStorage which is not available on the server
    if (typeof window === undefined) return
    const data = getStoredWorkouts()
    setWorkouts(data.workouts)
  }, [])

  const value = {
    workouts,
    setWorkouts,
  }

  return <Provider value={value}>{children}</Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined)
    throw new Error("Cannot call useAppContext outside of AppProvider")

  return context
}

// This uses a helper function in the generic to infer the return type of the callback function automatically
export function useAppContextSelector<
  T extends (state: AppContextState) => any
>(callback: T): ReturnType<T> {
  const context = useContext(AppContext)

  if (context === undefined)
    throw new Error("Cannot call useAppContextSelector outside of AppProvider")

  return callback(context)
}
