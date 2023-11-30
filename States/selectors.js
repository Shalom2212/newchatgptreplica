// import { selector } from "recoil";
// import { responsehistory } from "./atoms";

// export const updateresponse = selector({
//   key: "updateresponse",
//   get: ({ get }) => get(responsehistory),
//   set: ({ set }, newvalue, user, chatgpt) => {
//     const currentList = newvalue;
//     const updateList = [
//       ...currentList,
//       {
//         user: user,
//         chatgpt: chatgpt,
//       },
//     ];

//     set(responselist, updateList);
//   },
// });
