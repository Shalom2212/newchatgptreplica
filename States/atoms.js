import { atom } from "recoil";

export const responsehistory = atom({
  key: "responsehistory",
  default: [],
});

export const sidebardata = atom({
  key: "sidebardata",
  default: [],
});

export const sidebaraddress = atom({
  key: "sidebaraddress",
  default: "",
});
