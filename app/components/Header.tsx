"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Αρχική", href: "#" },
  { label: "Σχετικά", href: "#about" },
  { label: "Υπηρεσίες", href: "#services" },
  { label: "Επικοινωνία", href: "#contact" },
];

export default function Header() {
  const menuRef = useRef<HTMLButtonElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLAnchorElement[]>([]);
  const [open, setOpen] = useState(false);
  const [darkBg, setDarkBg] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Button should be white when nav is open OR when scrolled over the dark photo
  const buttonWhite = open || darkBg;

  // Animate nav open / close
  const animateNav = useCallback((opening: boolean) => {
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    if (opening) {
      document.body.style.overflow = "hidden";

      tl.set(navRef.current, { display: "flex" });

      tl.fromTo(
        navRef.current,
        { clipPath: "circle(0% at 40px 40px)" },
        { clipPath: "circle(150% at 40px 40px)", duration: 0.8, ease: "power3.inOut" }
      );

      tl.fromTo(
        navLinksRef.current,
        { yPercent: 600, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        0.3
      );
    } else {
      tl.to(navLinksRef.current, {
        yPercent: -500,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });

      tl.to(
        navRef.current,
        { clipPath: "circle(0% at 40px 40px)", duration: 0.5, ease: "power3.inOut" },
        0.1
      );

      tl.set(navRef.current, { display: "none" });
      tl.add(() => {
        document.body.style.overflow = "";
      });
    }
  }, []);

  // Hamburger → X morph
  useEffect(() => {
    const line1 = linesRef.current[0];
    const line2 = linesRef.current[1];
    if (!line1 || !line2) return;

    if (open) {
      gsap.to(line1, { rotation: 45, y: 5, xPercent: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(line2, { rotation: -45, y: -5, xPercent: 0, duration: 0.4, ease: "power2.inOut" });
    } else {
      gsap.to(line1, { rotation: 0, y: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(line2, { rotation: 0, y: 0, duration: 0.4, ease: "power2.inOut" });
    }
  }, [open]);

  // Scroll-driven color change
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.querySelector("[data-hero-spacer]"),
        start: "top top",
        end: "+=200%",
        onUpdate: (self) => {
          setDarkBg(self.progress > 0.5);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Hover animation
  useEffect(() => {
    const button = menuRef.current;
    if (!button) return;

    let isAnimating = false;

    const onEnter = () => {
      if (isAnimating || open) return;
      isAnimating = true;

      const lines = linesRef.current;
      const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });

      tl.to(lines, { xPercent: 100, duration: 0.2, stagger: 0.06, ease: "power2.in" });
      tl.set(lines, { xPercent: -100 });
      tl.to(lines, { xPercent: 0, duration: 0.2, stagger: 0.06, ease: "power2.out" });
    };

    button.addEventListener("mouseenter", onEnter);
    return () => button.removeEventListener("mouseenter", onEnter);
  }, [open]);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    animateNav(next);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-5 md:px-10 pointer-events-none">
        <button
          ref={menuRef}
          type="button"
          aria-label="Menu"
          onClick={handleToggle}
          className={`pointer-events-auto flex flex-col gap-2 p-2 transition-colors duration-300 cursor-pointer ${
            buttonWhite ? "text-white" : "text-black"
          } ${open ? "" : "overflow-hidden"}`}
        >
          <span ref={(el) => { if (el) linesRef.current[0] = el; }} className="block h-0.5 w-8 bg-current" />
          <span ref={(el) => { if (el) linesRef.current[1] = el; }} className="block h-0.5 w-8 bg-current" />
        </button>

        <a
          href="#book"
          className="pointer-events-auto group block rounded-full bg-white text-black px-7 py-3 text-base md:text-lg font-medium"
        >
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              Κλείσε ραντεβού
            </span>
            <span className="absolute top-0 left-0 w-full translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Κλείσε ραντεβού
            </span>
          </span>
        </a>
      </header>

      {/* Logo — separate stacking context so mix-blend-mode works against page content */}
      <span
        data-header-logo
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[61] text-lg md:text-xl font-medium text-white mix-blend-difference pointer-events-none"
      >
        LOGO
      </span>

      {/* Full-screen nav overlay */}
      <nav
        ref={navRef}
        className="fixed inset-0 z-[55] hidden flex-col items-center justify-center gap-6 bg-black"
        style={{ clipPath: "circle(0% at 40px 40px)" }}
      >
        {navLinks.map((link, i) => (
          <div key={link.href} className="overflow-hidden">
            <a
              ref={(el) => { if (el) navLinksRef.current[i] = el; }}
              href={link.href}
              onClick={() => { setOpen(false); animateNav(false); }}
              className="block text-5xl md:text-7xl text-white transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          </div>
        ))}
      </nav>
    </>
  );
}
