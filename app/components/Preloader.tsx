"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const letters = ["L", "O", "G", "O"];

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const headerLogo = document.querySelector("[data-header-logo]") as HTMLElement | null;
      if (!headerLogo || !logoWrapRef.current || !overlayRef.current) return;

      gsap.set(headerLogo, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(headerLogo, { opacity: 1 });
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      // Hide letters immediately via GSAP
      lettersRef.current.forEach((letter, i) => {
        gsap.set(letter, { yPercent: i % 2 === 0 ? -100 : 100 });
      });

      // Each letter drops from above or rises from below, alternating
      lettersRef.current.forEach((letter, i) => {
        const fromAbove = i % 2 === 0;
        tl.fromTo(
          letter,
          { yPercent: fromAbove ? -100 : 100 },
          { yPercent: 0, duration: 0.5, ease: "power3.out" },
          i * 0.12
        );
      });

      // Brief hold
      tl.to({}, { duration: 0.4 });

      // Calculate flight path to header logo
      const from = logoWrapRef.current.getBoundingClientRect();
      const to = headerLogo.getBoundingClientRect();

      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      const scaleRatio = to.height / from.height;

      // Animate to navbar position
      tl.to(logoWrapRef.current, {
        x: dx,
        y: dy,
        scale: scaleRatio,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // Fade out overlay while the logo is flying
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        "-=0.4"
      );
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div ref={logoWrapRef} className="flex text-5xl md:text-7xl text-black">
        {letters.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              ref={(el) => { if (el) lettersRef.current[i] = el; }}
              className="inline-block"
            >
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
