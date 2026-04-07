import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const certificates = [
  {
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "January 25, 2026",
    pdf: "/certificates/cert1.pdf",
    skills: [
      "Create presentations using AI in under 5 min",
      "Analyse data using AI in under 30 min",
      "Code and Debug using AI in under 10 min",
    ],
  },
  {
    title: "Python Using AI Workshop",
    issuer: "AI For Techies",
    date: "February 8, 2026",
    pdf: "/certificates/cert2.pdf",
    skills: [
      "Create interactive visualizations in Python in minutes",
      "Debug Python code in seconds using AI",
      "Write code in Python by using AI in seconds",
    ],
  },
  {
    title: "AI Fundamentals & Ecosystem Mastery",
    issuer: "AI Career Accelerator Program",
    date: "February 28, 2026",
    pdf: "/certificates/cert3.pdf",
    skills: [
      "The AI Generalist Mindset",
      "Generative AI Ecosystem Deep Dive",
      "Research work using AI & LinkedIn optimisation with AI",
    ],
  },
];

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section id="certificates" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and completed workshops.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass glass-hover rounded-xl p-6 flex flex-col cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                    {cert.title}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{cert.date}</span>
              </div>

              <ul className="space-y-2 mt-auto">
                {cert.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl h-[85vh] p-0 gap-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle>{selectedCert?.title}</DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <iframe
              src={selectedCert.pdf}
              className="w-full flex-1 border-0 rounded-b-lg"
              title={selectedCert.title}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
