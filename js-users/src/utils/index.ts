export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function getformattedDate(date: string) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 1);

  return newDate.toUTCString().replace(/\W\d+\W(?=GMT)\w*/, '');
}
