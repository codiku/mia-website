export function excludeField<
  Table extends { [k: string]: unknown },
  Key extends keyof Table
>(table: Table, keys: Key[]): Omit<Table, Key> {
  return Object.fromEntries(
    Object.entries(table).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<Table, Key>;
}
