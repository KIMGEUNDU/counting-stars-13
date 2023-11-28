export function writeDate() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${currentDate
    .getDate()
    .toString()
    .padStart(2, '0')} ${currentDate
    .getHours()
    .toString()
    .padStart(2, '0')}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

  return formattedDate;
}
