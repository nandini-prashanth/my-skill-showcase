import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";


const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative project management tool with real-time updates and team features.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Labelinfo",
    description:
      "Labelinfo is a website providing useful information about all kind of sustainability labels and sustainable products.",
    tags: ["Drupal", "PHP", "MySQL", "jQuery", "Ajax", "HTML5", "JavaScript", "CSS3"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Bimplan",
    description:
      "Bimplan is a growing Belgian company leading and specialised in the implementation of 3D building information models. 3D modelling, Revit consultancy, BIM coordination and BIM management are the key services of Bimplan.",
    tags: ["Drupal", "PHP", "MySQL", "Bootstrap", "Ajax", "CSS 3", "HTML 5", "jQuery", "JavaScript"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">My Work</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one taught me something new.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden glass-hover group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>
              
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
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
