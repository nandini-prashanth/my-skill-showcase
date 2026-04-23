import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Bot, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const proofPoints = ["AI copilots for content-heavy workflows", "Automation layers that remove repeat work", "Product interfaces built for clarity and speed"];

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 180]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 animated-gradient-bg opacity-80" />
      <motion.div
        className="absolute inset-0 parallax-glow opacity-80 will-change-transform"
        style={{ y: useTransform(scrollY, [0, 700], [0, -90]) }}
      />
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <img src={heroBg} alt="Abstract developer workspace background" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.18),transparent_32%),radial-gradient(circle_at_85%_20%,hsl(var(--primary)/0.10),transparent_28%)]"
          animate={{ backgroundPosition: ["0% 0%", "100% 40%", "0% 0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-medium mb-7"
            >
              <Sparkles className="w-4 h-4" />
              AI systems · Product engineering · Automation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-4xl md:text-6xl xl:text-7xl font-display font-bold leading-[0.98] mb-7 max-w-5xl"
            >
              I build AI-powered systems that turn complex workflows into clear product experiences.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-9"
            >
              Premium web apps, intelligent assistants, and automation layers designed with product storytelling, fast interaction, and practical engineering depth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:glow text-center shadow-lg shadow-primary/20"
              >
                Explore AI Projects
              </motion.a>
              <motion.a
                href="#ai"
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-lg glass glass-hover text-foreground font-semibold text-center"
              >
                <span className="inline-flex items-center justify-center gap-2"><Bot className="w-4 h-4" /> Talk to My AI Assistant</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="flex items-center gap-5"
            >
              {[
                { icon: Github, href: "https://github.com/nandini-prashanth", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/nandini-gowda-9193b741/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:nandini.hv8@gmail.com", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.18, y: -3 }}
                  className="p-3 rounded-full glass glass-hover text-muted-foreground hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="relative hidden lg:block"
          >
            <div className="glass rounded-2xl p-7 relative overflow-hidden transition-transform duration-500 hover:-translate-y-2">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="flex items-center gap-2 mb-7">
                <span className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="w-3 h-3 rounded-full bg-accent/60" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/50" />
              </div>
              <div className="space-y-5">
                {proofPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.12 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="rounded-lg bg-secondary/55 border border-border/10 p-5 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <p className="text-sm text-primary font-medium mb-2">SYSTEM / 0{index + 1}</p>
                    <p className="font-display text-2xl font-semibold">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute left-6 bottom-2 hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          Scroll
        </motion.a>
      </div>
    </section>
  );
}
