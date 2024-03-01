import { supabase } from "./supabase";
import { useRouter } from "next/router";

export async function signOut() {
  const signOut = await supabase.auth.signOut();
}
