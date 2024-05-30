import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const loggedInUserProfileState = atom({
  key: "loggedInUserProfile",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
