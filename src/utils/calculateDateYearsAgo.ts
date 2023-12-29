export default function calculateDateYearsAgo(years: number) {
  const currentDate = new Date();
  return new Date(currentDate.setFullYear(currentDate.getFullYear() - years))
    .toISOString()
    .split('T')[0];
}
