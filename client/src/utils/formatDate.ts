export function formatNoteDate(createdAt: string, updatedAt: string, createdBy: string, updatedBy?: string): string {
  const isUpdated = updatedAt > createdAt;
  const date = new Date(isUpdated ? updatedAt : createdAt);
  const formatted = date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return isUpdated
    ? `Updated by ${updatedBy ?? createdBy}: ${formatted}`
    : `Created by ${createdBy}: ${formatted}`;
}
