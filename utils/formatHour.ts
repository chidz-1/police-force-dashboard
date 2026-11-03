export default function formatHour(hour: string | number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}
