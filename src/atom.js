import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: null,
});

export const isDarkModeState = atom({
  key: "isDarkMode",
  default: false,
});
