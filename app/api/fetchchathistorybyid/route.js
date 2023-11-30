import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { chat_id } = await req.json();

      console.log(chat_id);

      if (!chat_id)
        return NextResponse.json({ err: "all parameter required" }, 400);

      const { data, error } = await supabase
        .from("Messages")
        .select("message_data")
        .eq("chat_id", chat_id);

      console.log(data);

      if (error) {
        console.log(error);
        return NextResponse.json({ error: "something went wrong" }, 400);
      }

      return NextResponse.json({ data: data });
    } catch (err) {
      console.log("Error:", err);
      return NextResponse.json({ err: "An error occurred" }, 500);
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, 405);
  }
}
