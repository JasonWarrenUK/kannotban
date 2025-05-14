import { Temporal } from '@js-temporal/polyfill';

export function getCurrentTimestamp(): number {
  return Temporal.Now.instant().epochMilliseconds;
}

export function formatTimestamp(timestamp: number): string {
  const instant = Temporal.Instant.fromEpochMilliseconds(timestamp);
  const zonedDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
  
  return zonedDateTime.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function isDueDatePast(dueDate: number): boolean {
  const now = Temporal.Now.instant();
  const due = Temporal.Instant.fromEpochMilliseconds(dueDate);
  
  return Temporal.Instant.compare(due, now) < 0;
}

export function isDueDateApproaching(dueDate: number): boolean {
  const now = Temporal.Now.instant();
  const due = Temporal.Instant.fromEpochMilliseconds(dueDate);
  const diffInHours = Temporal.Instant.until(now, due, { largestUnit: 'hour' }).hours;
  
  return diffInHours > 0 && diffInHours <= 24;
}