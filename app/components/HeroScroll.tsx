"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

function Title({ className }: { className?: string }) {
  return (
    <h1
      className={`grid grid-cols-2 text-5xl md:text-7xl lg:text-8xl leading-tight ${className ?? ""}`}
    >
      <span className="text-right pr-3 md:pr-5">Πέπη</span>
      <span className="text-left pl-3 md:pl-5">Ρογδάκη</span>
      <span className="text-right pr-3 md:pr-5">Χειρουργός</span>
      <span className="text-left pl-3 md:pl-5">Οδοντίατρος</span>
    </h1>
  );
}

export default function HeroScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const whiteClipRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        },
      });

      // Photo expands from right half to full screen
      tl.to(
        panelRef.current,
        {
          width: "100%",
          ease: "none",
          duration: 1,
        },
        0,
      );

      // White title clip expands in sync with the photo
      tl.to(
        whiteClipRef.current,
        {
          clipPath: "inset(0 0 0 0%)",
          ease: "none",
          duration: 1,
        },
        0,
      );

      // Title blurs and fades away quickly
      tl.to(
        titleWrapRef.current,
        {
          opacity: 0,
          filter: "blur(20px)",
          ease: "none",
          duration: 0.3,
        },
        0,
      );

      // Subtitle slides in from the right with the photo
      const subtitle = subtitleRef.current!;
      const textWidth = subtitle.scrollWidth;
      const vw = window.innerWidth;

      tl.fromTo(
        subtitle,
        { x: vw },
        { x: -(textWidth - vw), ease: "none", duration: 1 },
        0,
      );
    }, wrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* Hero — fixed behind everything */}
      <section
        ref={sectionRef}
        className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-zinc-50"
      >
        {/* Photo panel — starts at right half, expands to full screen */}
        <div ref={panelRef} className="absolute top-0 right-0 w-1/2 h-full">
          <img src="/smile.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
        </div>

        {/* Title — black and white layers */}
        <div ref={titleWrapRef} className="relative z-10">
          {/* Black title — always visible */}
          <Title className="text-black" />

          {/* White title — clipped to match photo position */}
          <div
            ref={whiteClipRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          >
            <Title className="text-white" />
          </div>
        </div>

        {/* Subtitle — slides in with the photo */}
        <p
          ref={subtitleRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10 text-7xl md:text-8xl lg:text-9xl whitespace-nowrap leading-snug text-white"
        >
          Το χαμόγελο σου είναι υπέροχο. Κράτησέ το έτσι.
        </p>
      </section>

      {/* Spacer — provides scroll distance for the hero animations */}
      <div ref={spacerRef} data-hero-spacer className="h-[300vh]" />
    </div>
  );
}
