import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { prompt } = await req.json();

      console.log(prompt);

      const response = await openai.chat.completions.create({
        messages: [{ role: "assistant", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      const generatedText = response.choices[0].message.content;

      return NextResponse.json({ gptresponse: generatedText });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "An error occurred" });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
