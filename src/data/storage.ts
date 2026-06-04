import type { StoreProfile } from "./questions";

const KEY_PROFILE = "edv_profile";
const KEY_ANSWERS = "edv_answers";
const KEY_OPEN = "edv_open";
const KEY_STEP = "edv_step";

export function saveProfile(profile: StoreProfile) {
  localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
}

export function loadProfile(): StoreProfile | null {
  const raw = localStorage.getItem(KEY_PROFILE);
  return raw ? JSON.parse(raw) : null;
}

export function saveAnswers(answers: Record<string, number>) {
  localStorage.setItem(KEY_ANSWERS, JSON.stringify(answers));
}

export function loadAnswers(): Record<string, number> {
  const raw = localStorage.getItem(KEY_ANSWERS);
  return raw ? JSON.parse(raw) : {};
}

export function saveOpenAnswers(answers: Record<string, string>) {
  localStorage.setItem(KEY_OPEN, JSON.stringify(answers));
}

export function loadOpenAnswers(): Record<string, string> {
  const raw = localStorage.getItem(KEY_OPEN);
  return raw ? JSON.parse(raw) : {};
}

export function saveStep(step: number) {
  localStorage.setItem(KEY_STEP, String(step));
}

export function loadStep(): number {
  return Number(localStorage.getItem(KEY_STEP) ?? 0);
}

export function clearAll() {
  [KEY_PROFILE, KEY_ANSWERS, KEY_OPEN, KEY_STEP].forEach((k) => localStorage.removeItem(k));
}

export function hasSavedSession(): boolean {
  return !!localStorage.getItem(KEY_PROFILE);
}
