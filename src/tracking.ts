import { record } from "rrweb";

(() => {
  record({
    emit(event) {
      fetch(import.meta.env.VITE_SERVER + "/track", {
        method: "POST",
        body: JSON.stringify(event)
      })
    },
    sampling: {
      mousemove: true,
      scroll: 0,
      mouseInteraction: true,
    },
  })
})()

