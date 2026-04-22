import { motion, useInView } from "framer-motion";
import { BrainCircuit, Code2, Layers3, Rocket } from "lucide-react";
import { useRef } from "react";

const highlights = [
  {
    icon: Code2,
    title: "Engineering with ownership",
    description: "I build maintainable Drupal, PHP, React, and TypeScript experiences that teams can keep improving after launch.",
  },
  {
    icon: Layers3,
    title: "Content-heavy systems",
    description: "My work spans restaurants, politics, sustainability, BIM, and citizen science—domains where structure and clarity matter.",
  },
  {
    icon: BrainCircuit,
    title: "AI-aware delivery",
    description: "I use automation, prompt design, and data analysis to speed up workflows while keeping the product grounded in user needs.",
  },
  {
    icon: Rocket,
    title: "Performance mindset",
    description: "I focus on fast interfaces, clean handoffs, and practical decisions that turn ideas into shipped products.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative section-reveal" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-primary font-medium mb-4 block">About Nandini</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            A developer who connects engineering, storytelling, and automation.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Based in Bangalore, I bring a full-stack mindset to digital products: shaping content architecture, building reliable interfaces, and exploring how AI can make everyday work smarter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
            className="glass rounded-2xl p-8 flex flex-col justify-between hover-depth"
          >
            <div>
              <p className="text-2xl font-display font-semibold mb-6">Personal brand</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I’m strongest where practical development meets thoughtful product judgment. I can translate ambiguous requirements into working systems, improve existing sites without overcomplicating them, and use AI as a productivity layer rather than a gimmick.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My portfolio reflects work across public information platforms, business websites, and content-rich experiences—each built with attention to usability, maintainability, and real-world constraints.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8">
              {["10+", "5", "AI+"].map((metric, index) => (
                <motion.div key={metric} whileHover={{ y: -4, scale: 1.04 }} className="rounded-lg bg-secondary/70 border border-border p-4 text-center">
                  <p className="text-2xl font-display font-bold text-primary">{metric}</p>
                  <p className="text-xs text-muted-foreground mt-1">{["Skills", "Case studies", "Automation"][index]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                whileHover={{ y: -7, scale: 1.015 }}
                className="glass rounded-xl p-6 glass-hover hover-depth"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
