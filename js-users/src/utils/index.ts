export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function getformattedDate(date: string) {
  return `${date.split('T')[0].replaceAll('-', '.')}. ${date
    .split('T')[1]
    .replace(/\.\S+/, '')}`;
}
