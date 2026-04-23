import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ChatMessage = { role: "user" | "assistant"; content: string };
type Mode = "chat" | "resume" | "recommender";

const portfolioContext = `
Nandini is a full stack developer based in Bangalore, India.
Resume reference: Drupal Developer with 7+ years of experience building scalable web applications using Drupal and PHP. Expertise includes custom module development, theming, API integrations, content architecture, and performance optimization.
Current positioning: AI-powered Full Stack Developer building intelligent web apps, automation systems, and modern React experiences.
Core stack: Drupal 7/8/9/10, PHP, MySQL, ReactJS, TypeScript, Tailwind CSS, JavaScript, HTML, CSS, jQuery, Ajax, Bootstrap, Node.js, Python, REST APIs, Git, AWS, CI/CD.
Drupal expertise: custom modules, hooks, Entity API, Views, Taxonomy, Theming, REST API integrations, caching, performance optimization, reusable module architecture, responsive Drupal themes.
Frontend expertise: HTML, CSS, JavaScript, ReactJS, TypeScript, Tailwind CSS, responsive UI, modern product interfaces.
AI and automation skills: Generative AI, n8n, workflow automation, AI product thinking, data analysis with AI, data visualisation, prompt engineering, AI storytelling.
Data tools: Excel and Power BI.
Professional experience: Senior Software Developer (Drupal), Infanion Software Solutions, 2012–2019. Built and maintained enterprise Drupal applications, custom modules, responsive themes, Views/Taxonomy content structures, REST integrations, and performance improvements.
Achievements: delivered multiple high-performance Drupal projects, reduced page load time significantly, built reusable modules improving efficiency, and mentored junior developers.
Education: Bachelor of Engineering in Computer Science.
Contact: Bangalore, India. Email: nandini.hv8@gmail.com. GitHub: nandini-prashanth. LinkedIn: nandini-gowda-9193b741.
Case studies:
1. Pelgrom — historic Antwerp restaurant/pub website focused on Belgian food, beer culture, heritage, and hospitality storytelling. Drupal, PHP, MySQL, jQuery, Ajax, HTML5, JavaScript, CSS3.
2. Peter De Roover — public profile platform for a Belgian politician; clear biography, updates, public communication, readability, and structured publishing. Drupal, PHP, MySQL, jQuery, Ajax, HTML5, JavaScript, CSS3.
3. Labelinfo — sustainability label information hub helping users understand labels and sustainable products through organized content. Drupal, PHP, MySQL, jQuery, Ajax, HTML5, JavaScript, CSS3.
4. Bimplan — B2B website for BIM consultancy covering 3D modelling, Revit consultancy, BIM coordination, and BIM management. Drupal, PHP, MySQL, Bootstrap, Ajax, CSS3, HTML5, jQuery, JavaScript.
5. Iedereen Wetenschapper — citizen science platform by EOS where citizens discover and subscribe to research projects. Drupal, PHP, jQuery, HTML5, CSS3, Ajax, JavaScript, MySQL.
Brand positioning: calm precision, practical engineering, content-heavy systems, AI-aware delivery, maintainability, clear UX, reliable implementation.
`;

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const sanitizeMessages = (messages: unknown): ChatMessage[] => {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((message): message is ChatMessage =>
      message &&
      typeof message === "object" &&
      ((message as ChatMessage).role === "user" || (message as ChatMessage).role === "assistant") &&
      typeof (message as ChatMessage).content === "string"
    )
    .map((message) => ({ role: message.role, content: message.content.slice(0, 1200) }));
};

const buildMessages = (mode: Mode, body: Record<string, unknown>) => {
  const system = `You are Nandini's portfolio AI assistant. Use only the portfolio context below. Be specific, concise, honest, and helpful. Format with short markdown bullets when useful.\n\n${portfolioContext}`;

  if (mode === "resume") {
    const resume = String(body.resume ?? "").slice(0, 7000);
    return [
      { role: "system", content: `${system}\nSummarize resume text into a sharper personal brand narrative. Do not invent employers, dates, or credentials.` },
      { role: "user", content: `Create: 1) a 2-sentence professional summary, 2) 5 strongest skills, 3) 3 improvement suggestions, and 4) a portfolio headline. Resume text:\n\n${resume}` },
    ];
  }

  if (mode === "recommender") {
    const need = String(body.need ?? "").slice(0, 2000);
    return [
      { role: "system", content: `${system}\nRecommend the most relevant Nandini case study for a visitor's need. Explain why and mention transferable skills.` },
      { role: "user", content: `Visitor project need:\n${need}` },
    ];
  }

  return [
    { role: "system", content: system },
    ...sanitizeMessages(body.messages),
  ];
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("Lovable AI key is unavailable");
      return jsonResponse({ error: "AI assistant is unavailable right now." }, 503);
    }

    const body = await req.json();
    const mode = body.mode as Mode;
    if (!["chat", "resume", "recommender"].includes(mode)) {
      return jsonResponse({ error: "Unsupported AI mode" }, 400);
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: buildMessages(mode, body),
        temperature: 0.35,
      }),
    });

    if (!aiResponse.ok) {
      const detail = await aiResponse.text();
      console.error("Portfolio AI gateway error:", aiResponse.status, detail);
      if (aiResponse.status === 429) return jsonResponse({ error: "AI is receiving too many requests. Please try again shortly." }, 429);
      if (aiResponse.status === 402) return jsonResponse({ error: "AI usage needs credits before this can continue." }, 402);
      return jsonResponse({ error: "AI assistant is unavailable right now." }, 502);
    }

    const data = await aiResponse.json();
    const text = data?.choices?.[0]?.message?.content;
    if (typeof text !== "string" || !text.trim()) {
      console.error("Portfolio AI returned an empty response");
      return jsonResponse({ error: "AI assistant returned an empty response." }, 502);
    }

    return jsonResponse({ text });
  } catch (error) {
    console.error("Portfolio AI function error:", error);
    return jsonResponse({ error: "AI assistant is unavailable right now." }, 500);
  }
});
