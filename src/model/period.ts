import type { PeriodItem } from './types';

/** 月份列表不保证排序；无参数时选最新，显式指定月份时绝不静默回退。 */
export function selectMonth(months: PeriodItem[] | null | undefined, query = ''): PeriodItem | null {
  const available = (months ?? [])
    .filter(month => Number.isSafeInteger(month?.index) && month.index >= 100001 && month.index <= 999912 && month.index % 100 >= 1 && month.index % 100 <= 12)
    .sort((a, b) => b.index - a.index);
  const input = query.trim();

  if (!input) {
    return available[0] ?? null;
  }

  const full = input.match(/^(\d{4})[-年]?(\d{1,2})月?$/);

  if (full) {
    return available.find(month => month.index === Number(full[1]) * 100 + Number(full[2])) ?? null;
  }

  const short = input.match(/^(\d{1,2})月?$/);

  return short ? (available.find(month => month.index % 100 === Number(short[1])) ?? null) : null;
}
