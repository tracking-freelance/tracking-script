import { record } from "rrweb";

let events: any[] = [];

record({
  emit(event) {
    events.push(event);
  }
});

async function save() {
  const body = JSON.stringify({ events });
  events = [];
  await fetch(import.meta.env.VITE_SERVER + "/trackings", {
    method: "POST",
    body,
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

setInterval(save, 5000);

window.addEventListener("beforeunload", () => {
  save().then(async () => {
    await fetch(import.meta.env.VITE_SERVER + "/trackings/end", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
});
