const pressureMap = new Map<string, number[]>();

const PRESSURE_WINDOW = 5000; // 5s
const PRESSURE_LIMIT = 3;

export function registerAccess(key: string) {
  const now = Date.now();
  const times = pressureMap.get(key) ?? [];
  const recent = times.filter((t) => now - t < PRESSURE_WINDOW);
  pressureMap.set(key, [...recent, now]);
}

export function isUnderPressure(key: string): boolean {
  const now = Date.now();
  const times = pressureMap.get(key) ?? [];
  return times.filter((t) => now - t < PRESSURE_WINDOW).length >= PRESSURE_LIMIT;
}
