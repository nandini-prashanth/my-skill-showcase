import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";


const projects = [
  {
    title: "Pelgrom",
    description:
      "Pelgrom is a well known restaurant and pub located in a unique location in Antwerp going back to 1425. With a focus on delighted meals combined with Belgian beer, the Pelgrom is the place to be for everyone who wants to experience the Belgian food and drink culture.",
    tags: ["Drupal", "PHP", "MySQL", "jQuery", "Ajax", "HTML5", "JavaScript", "CSS3"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Peter de roover",
    description:
      "Peter De Roover is a Belgian politician, economist, journalist and former broadcaster and a member of the Flemish nationalist New Flemish Alliance party. De Roover was elected as a member of the Belgian Chamber of Representatives in 2014 for the Antwerp constituency.",
    tags: ["Drupal", "PHP", "MySQL", "jQuery", "Ajax", "HTML5", "JavaScript", "CSS3"],
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
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
  {
    title: "Iedereen Wetenschapper",
    description:
      "Iedereen Wetenschapper is the citizen science platform of EOS, the leading science magazine in the Benelux. Citizens interested in participating in citizen science research projects can find information about many citizen science projects and can directly subscribe to participate in a citizen science project.",
    tags: ["Drupal", "PHP", "jQuery", "HTML5", "CSS3", "Ajax", "JavaScript", "MySQL"],
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop",
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
