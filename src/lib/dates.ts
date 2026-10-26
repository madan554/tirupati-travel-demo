export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function isFutureDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && value >= todayISO();
}
