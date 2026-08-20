"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const TYPING_PHRASES = [
  "AI that guides your job path",
  "Smart career recommendations",
  "Your personal career advisor",
  "Land your dream job faster",
];

const HeroSection = () => {
  const imageRef = useRef(null);
  const particlesRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typing effect
  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
          if (typedText === currentPhrase) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setTypedText(currentPhrase.substring(0, typedText.length - 1));
          if (typedText === "") {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  // Scroll parallax for image
  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 4 + 2;
      const colors = [
        "rgba(139, 92, 246, 0.4)",
        "rgba(6, 182, 212, 0.4)",
        "rgba(236, 72, 153, 0.3)",
        "rgba(245, 158, 11, 0.3)",
      ];
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 ${size * 2}px ${colors[Math.floor(Math.random() * colors.length)]};
      `;
      container.appendChild(particle);

      setTimeout(
        () => {
          particle.remove();
        },
        (Math.random() * 15 + 10) * 1000
      );
    };

    const interval = setInterval(createParticle, 600);
    // Create initial batch
    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  // Mouse glow following
  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      {/* Floating particles */}
      <div ref={particlesRef} className="particles-container" />
      
      {/* Noise overlay for premium feel */}
      <div className="noise-overlay" />

      <section className="relative w-full pt-32 md:pt-44 pb-16 overflow-hidden">
        {/* Mouse-following glow */}
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.04), transparent 40%)`,
          }}
        />

        <div className="relative z-10 space-y-8 text-center px-4">
          {/* Badge */}
          <div className="flex justify-center reveal visible">
            <div className="hero-badge">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Career Intelligence</span>
              <Zap className="w-4 h-4" />
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-6 mx-auto max-w-5xl">
            <h1 className="text-5xl font-black md:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
              <span className="animated-gradient-text">CareerGenie</span>
              <br />
              <span className="text-foreground/90 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                {typedText}
                <span className="typing-cursor" />
              </span>
            </h1>

            <p className="mx-auto max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Discover your ideal career path with{" "}
              <span className="text-foreground font-medium">AI-powered recommendations</span>,
              personalized guidance, and intelligent job matching for{" "}
              <span className="text-foreground font-medium">professional success</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="glow-button px-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <div className="flex -space-x-3">
              {[75, 76, 77, 78, 79].map((id) => (
                <img
                  key={id}
                  src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                +5K
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">5,000+</span> professionals worldwide
            </p>
          </div>

          {/* Hero Image with 3D tilt */}
          <div className="hero-image-wrapper mt-8 md:mt-12 max-w-5xl mx-auto">
            <div ref={imageRef} className="hero-image">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/10">
                <Image
                  src="/banner.jpeg"
                  width={1280}
                  height={720}
                  alt="CareerGenie Dashboard Preview"
                  className="w-full h-auto"
                  priority
                />
                {/* Overlay gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
