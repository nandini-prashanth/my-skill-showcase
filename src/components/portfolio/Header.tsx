import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Systems", href: "#projects", id: "projects" },
  { name: "Assistant", href: "#ai", id: "ai" },
  { name: "Certificates", href: "#certificates", id: "certificates" },
  { name: "Capabilities", href: "#skills", id: "skills" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-end">
          
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <a
                  href={item.href}
                  className={`transition-colors duration-300 font-medium ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>

        </nav>
      </div>
    </motion.header>
  );
}
