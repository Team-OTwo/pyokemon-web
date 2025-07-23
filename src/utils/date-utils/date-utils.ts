export function formatDate(date: Date, format: string): string {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")

  return format.replace("YYYY", year).replace("MM", month).replace("DD", day)
}
