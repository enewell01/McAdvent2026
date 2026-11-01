// Every access is wrapped: storage can throw when blocked or in a private window,
// and the calendar still has to work for that visit.

import { DIFFICULTIES, type Difficulty } from "./challenges";

// "ba26-done2" replaced "ba26-done" when each door gained three difficulties.
const KEYS = { opened: "ba26-opened", done: "ba26-done2", peek: "ba26-peek" } as const;

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

// Completed challenges, stored as "door:difficulty", for example "11:hard".
export const doneKey = (door: number, difficulty: Difficulty) => `${door}:${difficulty}`;

export function loadDone(): Set<string> {
  const value = read(KEYS.done);
  if (!Array.isArray(value)) return new Set();
  return new Set(value.filter((key) => typeof key === "string" && /^\d+:(easy|medium|hard)$/.test(key)));
}

export const saveOpened = (doors: Set<number>) => write(KEYS.opened, [...doors]);
export const saveDone = (keys: Set<string>) => write(KEYS.done, [...keys]);
export const loadPeek = () => read(KEYS.peek) === true;
export const savePeek = (peek: boolean) => write(KEYS.peek, peek);

// Display choices live apart from KEYS, so a progress reset keeps them.
const DIFFICULTY_KEY = "ba26-difficulty";
export const saveDifficulty = (difficulty: Difficulty) => write(DIFFICULTY_KEY, difficulty);
export function loadDifficulty(): Difficulty {
  const value = read(DIFFICULTY_KEY);
  return DIFFICULTIES.find((difficulty) => difficulty === value) ?? "medium";
}

const MOTION_KEY = "ba26-motion";
export const loadMotionOff = () => read(MOTION_KEY) === false;
export const saveMotionChoice = (allowed: boolean) => write(MOTION_KEY, allowed);

export function clearProgress(): void {
  for (const key of Object.values(KEYS)) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Nothing was saved, so there is nothing to clear.
    }
  }
}
