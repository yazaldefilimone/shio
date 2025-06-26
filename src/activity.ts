let last_active = Date.now();

const events = ["click", "keydown", "mousemove", "touchstart"];

function updateActivity() {
  last_active = Date.now();
}

events.forEach((evt) => window.addEventListener(evt, updateActivity));

export function getLastActive(): number {
  return last_active;
}
