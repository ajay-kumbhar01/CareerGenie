"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

// ── Animated Counter Hook ──
function useCounter(target, duration = 2000, shouldStart = false) {
  // Check if value is purely numeric with a suffix (e.g. "50+", "1000+", "95%")
  const match = target.match(/^(\d+)(\D*)$/);
  const isAnimatable = match !== null;
  const targetNum = isAnimatable ? parseInt(match[1]) : 0;
  const suffix = isAnimatable ? match[2] : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart || !isAnimatable) return;
    let startTime;
    let rafId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * targetNum));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [shouldStart, targetNum, duration, isAnimatable]);

  // For non-animatable values like "24/7", just return the raw value once started
  if (!isAnimatable) {
    return shouldStart ? target : "0";
  }

  return count + suffix;
}

// ── Scroll Reveal Hook ──
function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");
          observer.unobserve(element);
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

// ── Stats Counter Component ──
function StatItem({ value, label, icon }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const animatedValue = useCounter(value, 2000, started);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center space-y-3 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-4xl md:text-5xl font-black stat-number">
        {animatedValue}
      </h3>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
    </div>
  );
}

// ── Feature Card Colors ──
const FEATURE_COLORS = ["violet", "cyan", "pink", "amber"];
const FEATURE_ICON_COLORS = [
  "text-violet-500",
  "text-cyan-500",
  "text-pink-500",
  "text-amber-500",
];

export default function LandingPage() {
  const featuresRef = useReveal();
  const statsRef = useReveal();
  const howItWorksRef = useReveal();
  const testimonialRef = useReveal();
  const faqRef = useReveal();
  const ctaRef = useReveal();

  // 3D tilt effect for feature cards
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <>
      <div className="grid-background" />

      {/* Hero Section */}
      <HeroSection />

      {/* ═══════════════ Features Section ═══════════════ */}
      <section id="features" className="w-full py-20 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={featuresRef} className="reveal">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Features
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                Powerful Features for{" "}
                <span className="animated-gradient-text">Career Growth</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to accelerate your career journey, powered by cutting-edge AI
              </p>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto stagger-children visible">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-6 cursor-default"
                  onMouseMove={handleCardMouseMove}
                >
                  <div className="relative z-10 flex flex-col items-start space-y-4">
                    <div
                      className={`feature-icon-wrapper ${FEATURE_COLORS[index]}`}
                    >
                      <div className={FEATURE_ICON_COLORS[index]}>
                        {React.cloneElement(feature.icon, {
                          className: "w-7 h-7",
                        })}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Stats Section ═══════════════ */}
      <section className="w-full py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={statsRef} className="reveal">
            <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <StatItem
                  value="50+"
                  label="Industries Covered"
                  icon={<TrendingUp className="w-6 h-6 text-violet-400" />}
                />
                <StatItem
                  value="1000+"
                  label="Interview Questions"
                  icon={<Zap className="w-6 h-6 text-cyan-400" />}
                />
                <StatItem
                  value="95%"
                  label="Success Rate"
                  icon={<Award className="w-6 h-6 text-pink-400" />}
                />
                <StatItem
                  value="24/7"
                  label="AI Support"
                  icon={<Shield className="w-6 h-6 text-amber-400" />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ How It Works ═══════════════ */}
      <section className="w-full py-20 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={howItWorksRef} className="reveal">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Process
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                How It{" "}
                <span className="animated-gradient-text">Works</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Four simple steps to accelerate your career growth
              </p>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto stagger-children visible">
              {howItWorks.map((item, index) => (
                <div
                  key={index}
                  className="step-connector flex flex-col items-center text-center space-y-5 group"
                >
                  <div className="step-number group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="glass-card p-6 w-full text-center">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                        {React.cloneElement(item.icon, {
                          className: `w-6 h-6 ${FEATURE_ICON_COLORS[index]}`,
                        })}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Testimonials ═══════════════ */}
      <section className="w-full py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={testimonialRef} className="reveal">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Testimonials
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                Loved by{" "}
                <span className="animated-gradient-text">Professionals</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                See what our users have to say about their experience
              </p>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-children visible">
              {testimonial.map((item, index) => (
                <div
                  key={index}
                  className="testimonial-card"
                  onMouseMove={handleCardMouseMove}
                >
                  {/* Quote mark */}
                  <div className="quote-mark mb-2">&ldquo;</div>

                  {/* Star rating */}
                  <div className="star-rating mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="star w-4 h-4 fill-current"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 leading-relaxed mb-6 text-sm">
                    {item.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                    <div className="relative">
                      <Image
                        width={44}
                        height={44}
                        src={item.image}
                        alt={item.author}
                        className="rounded-full object-cover ring-2 ring-violet-500/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.role} at{" "}
                        <span className="text-violet-400">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ Section ═══════════════ */}
      <section className="w-full py-20 md:py-32 relative faq-section">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={faqRef} className="reveal">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                FAQ
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                Frequently{" "}
                <span className="animated-gradient-text">Asked</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Find answers to common questions about our platform
              </p>
              <div className="section-divider mt-6" />
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="glass-card p-2 md:p-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-white/5 px-4"
                    >
                      <AccordionTrigger className="text-left hover:text-violet-400 transition-colors py-5 text-sm md:text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA Section ═══════════════ */}
      <section className="w-full px-4 md:px-6 pb-12">
        <div ref={ctaRef} className="reveal-scale">
          <div className="cta-gradient rounded-3xl py-20 md:py-28 px-8 relative max-w-6xl mx-auto">
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              {/* Floating sparkles */}
              <div className="absolute -top-8 left-1/4 w-3 h-3 rounded-full bg-violet-400/50 animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="absolute -top-4 right-1/3 w-2 h-2 rounded-full bg-cyan-400/50 animate-bounce" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-0 right-1/4 w-2.5 h-2.5 rounded-full bg-pink-400/50 animate-bounce" style={{ animationDelay: "1s" }} />

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                Ready to Accelerate
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  Your Career?
                </span>
              </h2>
              <p className="mx-auto max-w-[550px] text-white/70 text-lg md:text-xl leading-relaxed">
                Join thousands of professionals who are advancing their careers
                with AI-powered guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard" passHref>
                  <Button
                    size="lg"
                    className="magnetic-btn px-8 py-6 text-lg font-semibold rounded-xl bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-black/20"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="text-white/40 text-sm">
                No credit card required • Free to start
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
