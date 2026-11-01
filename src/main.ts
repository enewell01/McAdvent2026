import "./styles.css";
import { DAYS, DIFFICULTIES, TYPE_LABELS, type ChallengeType, type Difficulty } from "./challenges";
import { celebrate, motionOff, startSceneFx, systemReducesMotion, updateSceneFx } from "./festive";
import { drawScene, installFestiveArt, installRockLayers, skinFor } from "./pixels";
import { startSnow } from "./snow";
import {
  clearProgress,
  doneKey,
  loadDifficulty,
  loadDone,
  loadOpened,
  loadPeek,
  loadMotionChoice,
  saveDifficulty,
  saveDone,
  saveMotionChoice,
  saveOpened,
  savePeek,
} from "./storage";

// Future doors stay shut until their date. Set to true to bring back the
// "Peek at future doors" toggle.
const PEEK_ENABLED = false;

const YEAR = 2026;
const DOOR_COUNT = DAYS.length;
const SERVER_ADDRESS = "AdventCraft.ooguy.com";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = DAYS.map((_, i) => new Date(YEAR, 10, 1 + i));

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const dialog = el<HTMLDialogElement>("door-dialog");
const doneButton = el<HTMLButtonElement>("dialog-done");
const shareButton = el<HTMLButtonElement>("share");
const peekInput = el<HTMLInputElement>("peek");
const toastEl = el("toast");
const burst = el<HTMLCanvasElement>("burst");

let opened = loadOpened(DOOR_COUNT);
let done = loadDone();
let difficulty = loadDifficulty();
let peek = PEEK_ENABLED && loadPeek();
let currentDoor = -1;

// Index of today's door in the viewer's local time. Negative before Nov 1,
// past the end after Dec 25. Rounding absorbs daylight-saving days.
function todayIndex(): number {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((midnight.getTime() - dates[0].getTime()) / 86400000);
}

const isLocked = (door: number) => door > todayIndex() && !peek;
// A door counts as complete once any of its three challenges is done.
const isDoorDone = (door: number) => DIFFICULTIES.some((level) => done.has(doneKey(door, level)));
const shortDate = (door: number) =>
  dates[door].toLocaleDateString("en-CA", { month: "long", day: "numeric" });

let toastTimer = 0;
function toast(message: string) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2600);
}

// Doors are built once and updated in place, so keyboard focus survives updates.
const doors = DAYS.map((_, i) => {
  const date = dates[i];
  const button = document.createElement("button");
  button.type = "button";
  button.className = "door";
  button.innerHTML = `<span class="num">${date.getDate()}</span><span class="dow">${WEEKDAYS[date.getDay()]}</span><span class="pips"><i></i><i></i><i></i></span>`;
  button.addEventListener("click", () => {
    if (isLocked(i)) {
      button.classList.remove("rattle");
      void button.offsetWidth;
      button.classList.add("rattle");
      toast(`This door opens on ${shortDate(i)}`);
    } else {
      openDoor(i);
    }
  });
  el(date.getMonth() === 10 ? "november" : "december").append(button);
  return button;
});
doors[DOOR_COUNT - 1].classList.add("big-day");

function paint() {
  const today = todayIndex();
  doors.forEach((button, i) => {
    const locked = isLocked(i);
    const doorDone = isDoorDone(i);
    button.classList.toggle("today", i === today);
    button.classList.toggle("locked", locked);
    button.classList.toggle("opened", opened.has(i));
    button.classList.toggle("done", doorDone);
    DIFFICULTIES.forEach((level, pip) => {
      button.querySelectorAll("i")[pip].classList.toggle("earned", done.has(doneKey(i, level)));
    });
    button.style.setProperty("--skin", skinFor(locked ? "locked" : DAYS[i].type, i));
    button.setAttribute("aria-disabled", String(locked));
    button.setAttribute(
      "aria-label",
      shortDate(i) + (locked ? ", locked" : `: ${DAYS[i][difficulty].title}`) + (doorDone ? ", completed" : ""),
    );
  });

  const level = DAYS.filter((_, i) => isDoorDone(i)).length;
  el("level").textContent = String(level);
  el("xp-fill").style.width = `${(level / DOOR_COUNT) * 100}%`;
  el("xp-bar").setAttribute("aria-valuenow", String(level));
  el("xp-caption").textContent = `${level} of ${DOOR_COUNT} completed`;
  shareButton.disabled = today < 0;
}

function paintCountdown() {
  const today = todayIndex();
  const now = new Date();
  let text = `All ${DOOR_COUNT} doors are open. Merry Christmas!`;
  if (today < DOOR_COUNT - 1) {
    const next = Math.max(today + 1, 0);
    const minutes = Math.ceil((dates[next].getTime() - now.getTime()) / 60000);
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const time = days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes % 60}m`;
    text = `${today < 0 ? "First" : "Next"} door opens in ${time}`;
  }
  el("next-door").textContent = text;

  const sleeps = DOOR_COUNT - 1 - today;
  el("sleeps").textContent = sleeps > 0 ? `${sleeps} ${sleeps === 1 ? "sleep" : "sleeps"} until Christmas` : "";
}

function openDoor(door: number) {
  if (isLocked(door)) return;
  currentDoor = door;
  const firstOpen = !opened.has(door);
  opened.add(door);
  saveOpened(opened);

  el("dialog-date").textContent = dates[door].toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  el("dialog-type").textContent = TYPE_LABELS[DAYS[door].type];
  fillChallenge();

  history.replaceState(null, "", `#day-${door + 1}`);
  if (!dialog.open) dialog.showModal();
  if (firstOpen) celebrate(burst, "snow");
  paint();
}

function fillChallenge() {
  const { title, challenge, tip } = DAYS[currentDoor][difficulty];
  el("dialog-title").textContent = title;
  el("dialog-body").textContent = challenge;
  el("dialog-tip").textContent = `Tip: ${tip}`;
  syncDoneButton();
}

function syncDoneButton() {
  doneButton.textContent = done.has(doneKey(currentDoor, difficulty)) ? "Mark not done" : "Mark complete";
}

// The page and the dialog each have a difficulty switch, and they stay in step.
const difficultyInputs = [...document.querySelectorAll<HTMLInputElement>(".difficulty input")];

function setDifficulty(next: Difficulty) {
  difficulty = next;
  saveDifficulty(next);
  for (const input of difficultyInputs) input.checked = input.value === next;
  if (dialog.open) fillChallenge();
  paint();
}

for (const input of difficultyInputs) {
  input.checked = input.value === difficulty;
  input.addEventListener("change", () => setDifficulty(input.value as Difficulty));
}

doneButton.addEventListener("click", () => {
  const key = doneKey(currentDoor, difficulty);
  if (done.has(key)) {
    done.delete(key);
  } else {
    done.add(key);
    const level = el("level");
    level.classList.remove("level-up");
    void level.offsetWidth;
    level.classList.add("level-up");
    celebrate(burst, "confetti");
  }
  saveDone(done);
  syncDoneButton();
  paint();
});

el("dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  history.replaceState(null, "", location.pathname + location.search);
});

// Deep links such as #day-12. Day numbers run through the season: #day-31 is Dec 1.
function openFromHash() {
  const match = /^#day-(\d+)$/.exec(location.hash);
  if (!match) return;
  const door = Number(match[1]) - 1;
  if (door < 0 || door >= DOOR_COUNT) return;
  if (isLocked(door)) {
    history.replaceState(null, "", location.pathname + location.search);
    toast(`Day ${door + 1} opens on ${shortDate(door)}`);
  } else {
    openDoor(door);
  }
}
addEventListener("hashchange", openFromHash);

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.className = "offscreen";
    document.body.append(area);
    area.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      // Falls through to the manual copy dialog.
    }
    area.remove();
    return copied;
  }
}

el("copy-server").addEventListener("click", async () => {
  toast((await copyText(SERVER_ADDRESS)) ? "Copied" : `Copy failed. The address is ${SERVER_ADDRESS}`);
});

const shareDialog = el<HTMLDialogElement>("share-dialog");
const shareText = el<HTMLTextAreaElement>("share-text");

shareButton.addEventListener("click", async () => {
  const today = Math.min(todayIndex(), DOOR_COUNT - 1);
  if (today < 0) return;
  const { title, challenge } = DAYS[today][difficulty];
  const text = `Day ${today + 1}: ${title} – ${challenge}\n${location.origin}${location.pathname}`;
  if (await copyText(text)) {
    toast("Copied");
  } else {
    shareText.value = text;
    shareDialog.showModal();
    shareText.select();
  }
});
el("share-close").addEventListener("click", () => shareDialog.close());

const resetButton = el<HTMLButtonElement>("reset");
const resetConfirm = el("reset-confirm");

function showResetConfirm(show: boolean) {
  resetButton.hidden = show;
  resetConfirm.hidden = !show;
  (show ? el("reset-cancel") : resetButton).focus();
}

resetButton.addEventListener("click", () => showResetConfirm(true));
el("reset-cancel").addEventListener("click", () => showResetConfirm(false));
el("reset-yes").addEventListener("click", () => {
  clearProgress();
  opened = new Set();
  done = new Set();
  peek = false;
  peekInput.checked = false;
  showResetConfirm(false);
  paint();
  toast("Progress reset");
});

if (PEEK_ENABLED) {
  el("peek-toggle").hidden = false;
  peekInput.checked = peek;
  peekInput.addEventListener("change", () => {
    peek = peekInput.checked;
    savePeek(peek);
    paint();
  });
}

// Doors reveal themselves at local midnight, even on a page left open overnight.
let lastToday = todayIndex();
function checkDay() {
  const today = todayIndex();
  if (today !== lastToday) {
    lastToday = today;
    paint();
    if (today >= 0 && today < DOOR_COUNT) toast(`Day ${today + 1} is open`);
  }
  paintCountdown();
}
setInterval(checkDay, 30000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) checkDay();
});

document.documentElement.classList.toggle("still", motionOff());
if (systemReducesMotion()) {
  const motionButton = el<HTMLButtonElement>("motion");
  motionButton.hidden = false;
  motionButton.textContent = motionOff() ? "Turn on snow and animations" : "Turn off snow and animations";
  motionButton.addEventListener("click", () => {
    saveMotionChoice(!loadMotionChoice());
    location.reload();
  });
}

const LEGEND: ChallengeType[] = ["build", "survive", "explore", "ice", "redstone", "nether", "festive"];
el("legend").innerHTML = LEGEND.map(
  (type) => `<li><i class="swatch" style='background-image:${skinFor(type)}'></i>${TYPE_LABELS[type]}</li>`,
).join("");

installRockLayers(document.documentElement);
installFestiveArt(document.documentElement);

const scene = el<HTMLCanvasElement>("scene");
const sceneFx = el<HTMLCanvasElement>("scene-fx");
let sceneWidth = 0;
function redrawScene() {
  // Mobile browsers fire resize when the address bar hides; only width matters here.
  if (scene.clientWidth === sceneWidth) return;
  sceneWidth = scene.clientWidth;
  const anchors = drawScene(scene);
  updateSceneFx(sceneFx, scene.width, scene.height, anchors);
}
addEventListener("resize", redrawScene);
redrawScene();

startSceneFx(sceneFx);
startSnow(el<HTMLCanvasElement>("snow"), el("xp-bar"), todayIndex() === DOOR_COUNT - 1);
paint();
paintCountdown();
openFromHash();

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // The calendar works online without it.
    });
  });
}
