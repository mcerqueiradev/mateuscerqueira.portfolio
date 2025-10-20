import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

type NavItem = {
  name: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Works",
    href: "#works",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const BottomNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        open &&
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(target) &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Função de scroll suave melhorada
  const handleSmoothScroll = (href: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (href === "/") {
      // Scroll para topo com fallback
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Fallback para navegadores antigos
        window.scrollTo(0, 0);
      }
    } else if (href === "/contact") {
      // Navega para página de contato
      window.location.href = href;
    } else if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);

      if (section) {
        // Método mais confiável com timeout
        setTimeout(() => {
          if ("scrollBehavior" in document.documentElement.style) {
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            // Fallback
            const yOffset = -80; // Ajuste se necessário
            const y =
              section.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo(0, y);
          }
        }, 100);
      }
    }

    setOpen(false);
  };

  const yPosition = isScrolled ? -20 : -40;

  const springTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  return (
    <motion.nav
      className="fixed left-0 right-0 z-50 max-w-2xl mx-auto"
      initial={false}
      animate={{ y: yPosition }}
      transition={springTransition}
      style={{ bottom: 0 }}
    >
      <div
        className={`mx-4 rounded-2xl overflow-hidden bg-neutral-950 backdrop-blur-md`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              key="nav-menu"
              ref={menuRef}
              id="navigation-menu"
              role="menu"
              aria-label="Navigation menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className=""
            >
              <ul className="flex items-start flex-col gap-5 p-5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.name} className="w-full">
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(item.href, e)}
                      className="flex items-center gap-5 text-2xl text-white cursor-pointer w-full p-5 rounded-lg "
                      role="menuitem"
                      whileHover={{
                        backgroundColor: "rgb(2, 11, 206)",
                        x: 8,
                      }}
                      whileTap={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-5 flex items-center gap-5 z-10">
          <div id="profile" className="flex items-center gap-3">
            <div
              id="avatar"
              className="size-16 rounded-lg bg-neutral-900 hidden md:block overflow-hidden"
            >
              <img
                src="/avatar.PNG"
                alt="Mateus Cerqueira"
                className="w-full h-full object-cover"
              />
            </div>
            <div id="role" className="flex flex-col items-start">
              <h2 className="text-white font-semibold text-xl md:text-2xl font-display">
                Mateus Cerqueira
              </h2>
              <p className="text-xs md:text-sm text-neutral-300">
                C# | .NET | Angular | Full Stack | SQL
              </p>
            </div>
          </div>

          <div className="flex-1" />

          <button
            ref={btnRef}
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className=" rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center size-10"
            type="button"
          >
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-100 hover:text-neutral-400 transition-all duration-300 cursor-pointer"
                  aria-label="Close menu"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-100 hover:text-neutral-400 transition-all duration-300 cursor-pointer"
                  aria-label="Open menu"
                >
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                  <path d="M4 6h16"></path>
                </svg>
              )}
            </motion.span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
