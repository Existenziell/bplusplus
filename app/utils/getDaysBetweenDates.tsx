export async function getDaysBetweenDates(d1: Date, d2: Date) {
  let days
  days = (d2.getFullYear() - d1.getFullYear()) * 365
  days -= d1.getDate()
  days += d2.getDate()
  return days <= 0 ? 0 : days
}
