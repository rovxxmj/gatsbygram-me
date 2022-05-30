import { atom } from "recoil";

export const isDark = atom({
  key: "isDark",
  default: false,
});

export const user = atom({
  key: "userData",
  default: {
    nickname: "Kyle_mathews",
  },
});
