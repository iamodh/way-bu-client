import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: null,
});