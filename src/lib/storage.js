// src/lib/storage.js

const keyFor = (slot) => `shanmei_char_${slot}`;

export function saveSlot(slot, data) {
  try {
    localStorage.setItem(keyFor(slot), JSON.stringify(data));
  } catch (err) {
    console.warn("Save failed:", err);
  }
}

export function loadSlot(slot) {
  try {
    const raw = localStorage.getItem(keyFor(slot));
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn("Load failed:", err);
    return null;
  }
}