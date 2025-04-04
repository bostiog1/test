export function generateDistinctRandomValues(
  count: number,
  min: number,
  max: number,
): number[] {
  if (max - min + 1 < count) {
    throw new Error(
      `Cannot generate ${count} distinct values in range [${min}, ${max}]`,
    );
  }

  const values: Set<number> = new Set();
  while (values.size < count) {
    values.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return Array.from(values);
}
