/* eslint-disable @typescript-eslint/no-explicit-any */
import { careerPrograms } from "@/public/data/coursedata";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const courseData = careerPrograms


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
      model: "openai/gpt-4.1",
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

The Faculty of Computing and Technology (FCT) at the University of Kelaniya offers a future-focused suite of BSc (Hons) degrees designed for both Maths and Technology stream students. With programs in Computer Science, Information & Communication Technology, Engineering Technology, and Biosystems Technology, FCT equips undergraduates with cutting-edge skills in software, AI, cybersecurity, applied engineering, and biotech. Students benefit from hands-on projects, industry links, research opportunities, and a campus culture built around innovation and tech leadership—making FCT UoK one of the top choices for anyone aiming for a tech-driven career in Sri Lanka or beyond.

The University of Moratuwa offers an acclaimed suite of BSc Engineering (Honours) degrees, spanning both core and specialized branches. In its flagship program, students dive into rigorous coursework across Civil, Mechanical, Electrical, Electronic & Telecommunication, Computer Science & Engineering, and Chemical & Process Engineering, all embedded within a strong research and industry-linked curriculum. In addition, Moratuwa offers dedicated honours degrees in Materials Science & Engineering, Earth Resources Engineering, Textile & Apparel Engineering, and Transport & Logistics Engineering—all full four-year programs. With top-tier laboratories, extensive industry partnerships, and a culture of innovation, Moratuwa stands as the premier choice for engineers ready to shape infrastructure, technology, and sustainable industries in Sri Lanka and beyond.

The University of Colombo School of Computing (UCSC)—established in September 2002 by merging the Department of Computer Science and the Institute of Computer Technology—is Sri Lanka’s leading institute for computing education and research 
Wikipedia
+15
emuseum.ucsc.cmb.ac.lk
+15
YouTube
+15
. It offers prestigious undergraduate degrees such as the BSc in Computer Science and BSc in Information Systems, alongside an internally-run BSc in ICT program. UCSC also delivers widely-enrolled external degrees like the BIT, which has produced thousands of graduates and operates a robust, self-financed model 
Faculty of Science
+3
Parliament of Sri Lanka
+3
Faculty of Science
+3
. Known for its state-of-the-art labs, strong industry ties, and emphasis on practical, project-based learning, the school has been central to national computing initiatives—from election systems to broadcasting tools—and celebrated its 20-year anniversary in 2022 
Facebook
. UCSC serves as a hub for innovation and professional development, now even offering postgraduate options like the Master of Cybersecurity, reinforcing its mission to shape socially responsible tech leaders

Refer this ${courseData} important

when give answering use proper markdown format and propper new line and code block format.

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
