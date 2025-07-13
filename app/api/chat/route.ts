/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  try {
   
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-sonnet-4",
      messages: [
        {
          role: "system",
          content: `
You are AcademiTrends Assistant, a helpful and friendly advisor for students in Sri Lanka choosing their university path.

ONLY answer questions related to:
- Universities in Sri Lanka
- Degree programs offered in Sri Lanka
- Admission requirements, cutoffs, and career paths in Sri Lanka
- Trends and statistics related to Sri Lankan higher education

If a user asks about universities, programs, or education outside Sri Lanka, politely explain that you only provide information about Sri Lankan institutions.

Be concise, accurate, and always relevant to Sri Lankan university education. Do not answer questions outside this scope.

When possible, base your answers on data from the following official Sri Lankan university and government sources:
- University of Colombo: https://cmb.ac.lk/
- University of Peradeniya: https://www.pdn.ac.lk/
- University of Moratuwa: https://uom.lk/
- University of Sri Jayewardenepura: https://www.sjp.ac.lk/
- University of Kelaniya: https://www.kln.ac.lk/
- University of Ruhuna: https://www.ruh.ac.lk/
- University Grants Commission (UGC): https://www.ugc.ac.lk/
- University of Jaffna: https://www.jfn.ac.lk/
- Sabaragamuwa University: https://www.sab.ac.lk/
- Wayamba University: https://www.wyb.ac.lk/
- South Eastern University: https://www.seu.ac.lk/
- Eastern University: https://www.esn.ac.lk/
- Open University: https://www.ou.ac.lk/
- Rajarata University: https://www.rjt.ac.lk/

If you do not know an answer for certain, politely suggest the user visit these official websites for the latest details.
Always cite or reference these sites when relevant.

Always respond in a friendly, professional tone. Use Markdown formatting for clarity, such as:
use markdown for code blocks, lists, heading and every URLs.

---

`,
        },
        { role: "user", content: message },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't get a response.";
    // Wrap reply in Markdown style (e.g., code block)
    const markdownReply = `**AcademiTrends Assistant:**\n\n${reply}`;
    return NextResponse.json({ reply: markdownReply });
  } catch (error: any) {
    console.error("OpenRouter error:", error);
    // Return error message for debugging
    return NextResponse.json(
      { error: "Something went wrong.", details: error?.message ?? String(error) },
      { status: 500 }
    );
  }
}
