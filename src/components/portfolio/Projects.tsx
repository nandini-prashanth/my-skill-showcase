import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Zap } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    title: "Pelgrom",
    category: "Hospitality website",
    challenge: "A historic Antwerp restaurant needed a digital presence that could communicate atmosphere, heritage, meals, and Belgian beer culture without feeling generic.",
    approach: "Built a Drupal-based content structure with polished frontend interactions, reusable content areas, and clear presentation for food, drink, and venue storytelling.",
    outcome: "A more trustworthy, experience-led website that supports discovery and makes the restaurant feel memorable before visitors arrive.",
    tags: ["Drupal", "PHP", "MySQL", "jQuery", "Ajax", "HTML5", "JavaScript", "CSS3"],
  },
  {
    title: "Peter De Roover",
    category: "Public profile platform",
    challenge: "A political public figure required a clear and credible web presence where biography, updates, and constituency communication could be organized cleanly.",
    approach: "Developed structured pages and content workflows with attention to readability, navigation, and maintainable publishing for a high-information audience.",
    outcome: "A professional platform that helps visitors quickly understand the profile, work, and public communication of the representative.",
    tags: ["Drupal", "PHP", "MySQL", "jQuery", "Ajax", "HTML5", "JavaScript", "CSS3"],
  },
  {
    title: "Labelinfo",
    category: "Sustainability information hub",
    challenge: "Users needed a practical way to understand sustainability labels and make sense of product information across categories.",
    approach: "Created content-led pages with organized taxonomy, accessible presentation, and frontend patterns that make complex label information easier to scan.",
    outcome: "A clearer knowledge resource that helps people compare labels and make more informed sustainability decisions.",
    tags: ["Drupal", "PHP", "MySQL", "jQuery", "Ajax", "HTML5", "JavaScript", "CSS3"],
  },
  {
    title: "Bimplan",
    category: "B2B service website",
    challenge: "A BIM consultancy needed to explain specialized 3D modelling, Revit consulting, BIM coordination, and BIM management services to business buyers.",
    approach: "Built a service-focused digital structure using Drupal and Bootstrap, balancing technical credibility with clear business messaging.",
    outcome: "A stronger B2B presence that communicates expertise and helps prospective clients understand the company’s value quickly.",
    tags: ["Drupal", "PHP", "MySQL", "Bootstrap", "Ajax", "CSS3", "HTML5", "jQuery", "JavaScript"],
  },
  {
    title: "Iedereen Wetenschapper",
    category: "Citizen science platform",
    challenge: "EOS needed a platform where citizens could discover many research projects and subscribe to participate in citizen science initiatives.",
    approach: "Worked on a Drupal-powered platform with organized project discovery, participation flows, and content structures for science communication.",
    outcome: "A public-facing platform that lowers the barrier between curious citizens and active research participation.",
    tags: ["Drupal", "PHP", "jQuery", "HTML5", "CSS3", "Ajax", "JavaScript", "MySQL"],
  },
];

const systemSignals = [Cpu, Layers, Zap];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative section-reveal" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Featured AI Projects</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Case studies framed like product systems.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            A product-style view of how I shape messy content, workflows, and user needs into intelligent digital experiences.
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 42 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.008 }}
              className="glass rounded-2xl p-6 md:p-8 glass-hover hover-depth group relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8">
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-primary text-sm font-medium">{project.category}</span>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-3xl md:text-4xl mb-4">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">Built as a focused product surface: structured content, clear user paths, and an experience that makes complex information easier to act on.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    ["Challenge", project.challenge],
                    ["Approach", project.approach],
                    ["Outcome", project.outcome],
                  ].map(([label, copy]) => (
                    <motion.div key={label} whileHover={{ y: -5 }} className="rounded-lg bg-secondary/60 border border-border p-5 transition-colors duration-300 hover:border-primary/30">
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                        {(() => {
                          const Icon = systemSignals[["Challenge", "Approach", "Outcome"].indexOf(label as string)] ?? Layers;
                          return <Icon className="w-4 h-4" />;
                        })()}
                        {label}
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">{copy}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
