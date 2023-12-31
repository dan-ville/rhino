import { getHours } from "date-fns"

export function getWorkoutTimeOfDay() {
  let currentDate = new Date()
  const currentHour = getHours(currentDate)

  if (currentHour >= 0 && currentHour < 12) {
    return "Morning workout"
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Afternoon workout"
  } else {
    return "Evening workout"
  }
}
