export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
