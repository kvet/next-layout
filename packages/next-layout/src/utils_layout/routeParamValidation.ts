function isPositiveInteger(value: string): boolean {
  return /^\d+$/.test(value);
}

export function safeParseStringParam(
  param: string | readonly string[] | undefined,
): string | undefined {
  if (!param || typeof param !== 'string') {
    return undefined;
  }
  return param;
}

export function safeParsePositiveIntegerParam(
  param: string | readonly string[] | undefined,
): number | undefined {
  if (!param || typeof param !== 'string' || !isPositiveInteger(param)) {
    return undefined;
  }
  const parsedValue = parseInt(param, 10);
  return parsedValue !== 0 ? parsedValue : undefined;
}
