export function formatDateToDDMMYY(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}${month}${year}`;
}

export function formatDateTimeToUTC(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function formatDateTimeToTH(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  };
  return new Intl.DateTimeFormat("th-TH", options).format(date);
}

export function formatToYMD(date: Date | null): string | null {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function setLastDateByDay(lastDate: number): string | null {
  const today = new Date();
  let start: Date | null = null;
  start = new Date(today);
  start.setDate(today.getDate() - lastDate);
  return formatToYMD(start);
}

export function getCurrentDateTimeLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export function formatDateToLocalInputString(
  isoDateString: string | null
): string {
  const date = new Date(isoDateString ?? new Date());
  date.setHours(date.getHours() - 7);

  // แปลงเวลาให้เป็นโซนเวลาท้องถิ่น (ไทยคือ UTC+7)
  const tzOffset = date.getTimezoneOffset() * 60000; // เป็น milliseconds
  const localDate = new Date(date.getTime() - tzOffset);

  return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
}
