import { record } from "rrweb";

const UserLocalStorageIdKey = "tracking_user_id";

(() => {
  try {
    record({
      emit(event) {
        const userId = localStorage.getItem(UserLocalStorageIdKey);
        if (userId) {
          fetch(import.meta.env.VITE_SERVER + "/trackings", {
            method: "POST",
            body: JSON.stringify({ ...event }),
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          }).catch(console.error);
        } else {
          fetch(import.meta.env.VITE_SERVER + "/track/init", {
            method: "POST"
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              localStorage.setItem(UserLocalStorageIdKey, res.userId);
            })
            .catch(console.error);
        }
      },
      sampling: {
        mousemove: true,
        scroll: 0,
        mouseInteraction: true
      }
    });
  } catch (error) {
    console.error(error);
  }
})();
