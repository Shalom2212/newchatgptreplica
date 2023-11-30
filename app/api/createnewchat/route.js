import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { user_id, title } = await req.json();

      console.log(user_id, title);

      if (!user_id || !title)
        return NextResponse.json({ err: "all parameter required" }, 400);

      const id = uuidv4();

      const currenttime = new Date().toISOString();

      const { data, error } = await supabase.from("Chats").insert([
        {
          id: id,
          created_at: currenttime,
          user_id: user_id,
          title: title,
        },
      ]);

      if (error) {
        console.log(error);
        return NextResponse.json({ error: "something went wrong" }, 400);
      }

      return NextResponse.json({ chatid: id });
    } catch (err) {
      console.log("Error:", err);
      return NextResponse.json({ err: "An error occurred" }, 500);
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, 405);
  }
}
