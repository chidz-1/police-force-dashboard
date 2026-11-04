export default function isNightTime(datetime: string): boolean {
  const hour = new Date(datetime).getHours();
  return hour >= 22 || hour < 6;
}
