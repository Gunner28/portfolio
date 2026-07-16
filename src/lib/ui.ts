// Lightweight window-event bus so the command palette can drive the
// theme toggle, ambient audio, and toasts without prop-drilling or context.
export const UI_EVENTS = {
  toggleTheme: "gp:toggle-theme",
  toggleAmbient: "gp:toggle-ambient",
  toast: "gp:toast",
  openPalette: "gp:open-palette",
  unlockDiary: "gp:unlock-diary",
} as const;

export function emit(name: string, detail?: unknown) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function toast(message: string) {
  emit(UI_EVENTS.toast, message);
}
