export function parseTTL(input?: string | number): number | undefined {
  if (typeof input === "number") return input;

  if (typeof input === "string") {
    const sliding = input.endsWith("+");
    const raw = sliding ? input.slice(0, -1) : input;
    const match = raw.match(/^(\d+)(ms|s|m|h|d)?$/);

    if (!match) return undefined;

    const [, num, unit = "ms"] = match;
    const n = parseInt(num);
    const ttl = {
      ms: n,
      s: n * 1_000,
      m: n * 60_000,
      h: n * 60 * 60_000,
      d: n * 24 * 60 * 60_000,
    }[unit];

    return ttl;
  }
  return undefined;
}
