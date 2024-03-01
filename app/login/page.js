"use client";

import { signInWithGoogle } from "@/connections/signIn";

export default function login() {
  return (
    <>
      <h1>hello from login</h1>
      <button onClick={signInWithGoogle}>signin</button>
    </>
  );
}
