import { invalidate } from "./cache";
import { notify } from "./events";

const channel = new BroadcastChannel("shio");

export function broadcastInvalidate(key: string): void {
  channel.postMessage({ key });
}

channel.onmessage = (event) => {
  if (event.data?.key) {
    invalidate(event.data.key);
    notify(event.data.key);
  }
};
