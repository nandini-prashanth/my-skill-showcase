import { motion, useInView } from "framer-motion";
import { Bot, FileText, Loader2, Send, Sparkles } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ChatMessage = { role: "user" | "assistant"; content: string };

type Mode = "chat" | "resume" | "recommender";

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi, I’m Nandini’s portfolio assistant. Ask about her skills, case studies, AI automation interests, or which project best matches your needs.",
  },
];

const invokePortfolioAi = async (mode: Mode, payload: Record<string, unknown>) => {
  const { data, error } = await supabase.functions.invoke("portfolio-ai", {
    body: { mode, ...payload },
  });

  if (error) throw error;
  if (!data?.text) throw new Error("AI response was empty");
  return data.text as string;
};

export function AITools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(starterMessages);
  const [chatInput, setChatInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [resumeSummary, setResumeSummary] = useState("");
  const [projectNeed, setProjectNeed] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loadingMode, setLoadingMode] = useState<Mode | null>(null);

  const handleChat = async (event: FormEvent) => {
    event.preventDefault();
    const prompt = chatInput.trim();
    if (!prompt) return;

    const nextMessages: ChatMessage[] = [...chatMessages, { role: "user", content: prompt }];
    setChatMessages(nextMessages);
    setChatInput("");
    setLoadingMode("chat");

    try {
      const text = await invokePortfolioAi("chat", { messages: nextMessages });
      setChatMessages([...nextMessages, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Portfolio chatbot failed:", error);
      toast.error("The portfolio assistant is unavailable right now.");
    } finally {
      setLoadingMode(null);
    }
  };

  const handleResume = async () => {
    const resume = resumeInput.trim();
    if (resume.length < 80) {
      toast.error("Paste a little more resume text for a useful summary.");
      return;
    }

    setLoadingMode("resume");
    try {
      setResumeSummary(await invokePortfolioAi("resume", { resume }));
    } catch (error) {
      console.error("Resume summarizer failed:", error);
      toast.error("Could not summarize the resume right now.");
    } finally {
      setLoadingMode(null);
    }
  };

  const handleRecommendation = async () => {
    const need = projectNeed.trim();
    if (need.length < 20) {
      toast.error("Describe the project need in a bit more detail.");
      return;
    }

    setLoadingMode("recommender");
    try {
      setRecommendation(await invokePortfolioAi("recommender", { need }));
    } catch (error) {
      console.error("Project recommender failed:", error);
      toast.error("Could not recommend a project right now.");
    } finally {
      setLoadingMode(null);
    }
  };

  return (
    <section id="ai" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Try my AI assistant 🤖</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            A live product layer for exploring <span className="text-gradient">fit, skills, and stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ask questions, summarize experience, or match a project need to the most relevant case study — directly inside the portfolio.
          </p>
        </motion.div>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <motion.article
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 md:p-8 min-h-[34rem] flex flex-col glass-hover hover-depth"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary shadow-lg shadow-primary/10"><Bot className="w-6 h-6" /></div>
              <div>
                <h3 className="font-display text-2xl font-bold">Portfolio chatbot</h3>
                <p className="text-muted-foreground text-sm">Ask about Nandini’s skills, projects, and fit.</p>
              </div>
            </div>

            <div className="flex-1 rounded-lg bg-secondary/45 border border-border/10 p-4 overflow-y-auto space-y-4 mb-5 max-h-[26rem]">
              {chatMessages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div className={`max-w-[88%] rounded-lg p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card/65 border border-border/10"}`}>
                      <div className="prose prose-sm prose-invert max-w-none prose-p:my-0 prose-ul:my-2 prose-li:my-0">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                  </div>
                </div>
              ))}
              {loadingMode === "chat" && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</div>
              )}
            </div>

            <form onSubmit={handleChat} className="flex gap-3">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-secondary/55 border border-border/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Ask about a project, skill, or collaboration fit..."
              />
              <motion.button
                type="submit"
                disabled={loadingMode !== null}
                whileHover={{ scale: loadingMode ? 1 : 1.04 }}
                whileTap={{ scale: loadingMode ? 1 : 0.96 }}
                className="px-4 rounded-lg bg-primary text-primary-foreground disabled:opacity-60"
                aria-label="Send chat message"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.article>

          <div className="grid gap-6">
            <motion.article
              initial={{ opacity: 0, x: 36 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="glass rounded-2xl p-6 glass-hover hover-depth"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-primary/10 text-primary"><FileText className="w-5 h-5" /></div>
                <h3 className="font-display text-2xl font-bold">Resume summarizer</h3>
              </div>
              <textarea
                value={resumeInput}
                onChange={(event) => setResumeInput(event.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-secondary/55 border border-border/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none mb-4"
                placeholder="Paste resume text here..."
              />
              <button onClick={handleResume} disabled={loadingMode !== null} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
                {loadingMode === "resume" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Summarize Resume
              </button>
              {resumeSummary && (
                <div className="prose prose-sm prose-invert max-w-none mt-5 text-muted-foreground">
                  <ReactMarkdown>{resumeSummary}</ReactMarkdown>
                </div>
              )}
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 36 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="glass rounded-2xl p-6 glass-hover hover-depth"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-primary/10 text-primary"><Sparkles className="w-5 h-5" /></div>
                <h3 className="font-display text-2xl font-bold">Project recommender</h3>
              </div>
              <textarea
                value={projectNeed}
                onChange={(event) => setProjectNeed(event.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-secondary/55 border border-border/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none mb-4"
                placeholder="Describe your project goal or industry..."
              />
              <button onClick={handleRecommendation} disabled={loadingMode !== null} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
                {loadingMode === "recommender" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Recommend Case Study
              </button>
              {recommendation && (
                <div className="prose prose-sm prose-invert max-w-none mt-5 text-muted-foreground">
                  <ReactMarkdown>{recommendation}</ReactMarkdown>
                </div>
              )}
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
