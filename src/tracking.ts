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

window.addEventListener("beforeunload", (e) => {
  e = e || window.event;
  // For IE and Firefox prior to version 4
  if (e) {
    e.returnValue = "";
  }
  save().then(async () => {});
  fetch(import.meta.env.VITE_SERVER + "/trackings/end", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  // For Safari
  return false;
});
