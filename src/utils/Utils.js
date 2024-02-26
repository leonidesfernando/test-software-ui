
export function validatePeriod(startDate, endDate){
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (end < start) {
    throw new Error("The finalDate must be equal or greater than startDate")
  }
}
