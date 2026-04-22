import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend Craft",
    description: "Interfaces that feel polished, responsive, and maintainable.",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Backend & CMS",
    description: "Reliable content systems, APIs, and data-backed experiences.",
    skills: ["Drupal", "PHP", "Node.js", "Python", "MySQL", "REST APIs"],
  },
  {
    title: "Delivery Toolkit",
    description: "Practical engineering habits for collaboration and release quality.",
    skills: ["Git", "AWS", "CI/CD", "Bootstrap", "jQuery", "Ajax"],
  },
  {
    title: "AI & Automation",
    description: "Using AI to summarize, recommend, analyze, and automate workflows.",
    skills: ["Workflow Automation", "Prompt Engineering", "AI Product Thinking", "Data Analysis", "Data Visualisation", "AI Storytelling"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Skill System</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            A stack built for <span className="text-gradient">practical impact</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From CMS-heavy builds to AI-assisted workflows, I combine stable engineering with curiosity for smarter delivery.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 44 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: categoryIndex * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-7 glass-hover min-h-[25rem] flex flex-col"
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
                    className="px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
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
