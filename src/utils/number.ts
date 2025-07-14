export function formatNumber(num: number | undefined): string {
  if (num) return Number(num).toLocaleString();
  else return "";
}
