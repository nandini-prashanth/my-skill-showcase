import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Product interface systems",
    description: "Premium frontends with strong hierarchy, responsive states, and motion that makes the product feel alive.",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Content and workflow engines",
    description: "Structured CMS, API, and data flows that make complex information easy to publish, find, and maintain.",
    skills: ["Drupal", "PHP", "Node.js", "Python", "MySQL", "REST APIs"],
  },
  {
    title: "Reliable delivery loops",
    description: "Practical engineering habits for shipping cleanly, collaborating well, and improving without adding noise.",
    skills: ["Git", "AWS", "CI/CD", "Bootstrap", "jQuery", "Ajax"],
  },
  {
    title: "AI automation layers",
    description: "Assistants, summarizers, recommenders, and workflow automations that make products feel smarter.",
    skills: ["Workflow Automation", "Prompt Engineering", "AI Product Thinking", "Data Analysis", "Data Visualisation", "AI Storytelling"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative section-reveal" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Skills presented as <span className="text-gradient">product capabilities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Not a tools checklist — a system of capabilities for designing, building, and improving AI-powered digital products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 44 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: categoryIndex * 0.08 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="glass rounded-2xl p-7 glass-hover hover-depth min-h-[25rem] flex flex-col"
            >
              <div className="mb-7">
                <p className="text-primary text-sm font-medium mb-3">0{categoryIndex + 1}</p>
                <h3 className="font-display font-bold text-2xl mb-3">{category.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{category.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.08 + skillIndex * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-2 rounded-full bg-secondary/55 text-secondary-foreground text-sm font-medium border border-border/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
