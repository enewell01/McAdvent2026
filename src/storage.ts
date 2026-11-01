// Every access is wrapped: storage can throw when blocked or in a private window,
// and the calendar still has to work for that visit.

const KEYS = { opened: "ba26-opened", done: "ba26-done", peek: "ba26-peek" } as const;

function read(key: string): unknown {
  try {
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Progress lasts until the page closes.
  }
}

function readDoors(key: string, doorCount: number): Set<number> {
  const value = read(key);
  if (!Array.isArray(value)) return new Set();
  return new Set(value.filter((n) => Number.isInteger(n) && n >= 0 && n < doorCount));
}

export const loadOpened = (doorCount: number) => readDoors(KEYS.opened, doorCount);
export const loadDone = (doorCount: number) => readDoors(KEYS.done, doorCount);
export const saveOpened = (doors: Set<number>) => write(KEYS.opened, [...doors]);
export const saveDone = (doors: Set<number>) => write(KEYS.done, [...doors]);
export const loadPeek = () => read(KEYS.peek) === true;
export const savePeek = (peek: boolean) => write(KEYS.peek, peek);

export function clearProgress(): void {
  for (const key of Object.values(KEYS)) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Nothing was saved, so there is nothing to clear.
    }
  }
}
