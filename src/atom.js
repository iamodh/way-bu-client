import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: null,
});

export const loggedInUserProfileState = atom({
  key: "loggedInUserProfile",
  default: null,
});
