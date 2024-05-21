import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: null,
});

export const mypageIndexState = atom({
  key: "mypageIndex",
  default: "update",
});
