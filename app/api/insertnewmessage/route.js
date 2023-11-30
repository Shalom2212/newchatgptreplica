import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { chat_id, message_data } = await req.json();

      console.log(chat_id, message_data);

      if (!chat_id || !message_data)
        return NextResponse.json({ err: "all parameter required" }, 400);

      const { data, error } = await supabase.from("Messages").insert([
        {
          chat_id: chat_id,
          message_data: message_data,
        },
      ]);

      if (error) {
        console.log(error);
        return NextResponse.json({ error: "something went wrong" }, 400);
      }

      return NextResponse.json({ message: "Success full inserted data" });
    } catch (err) {
      console.log("Error:", err);
      return NextResponse.json({ err: "An error occurred" }, 500);
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, 405);
  }
}
