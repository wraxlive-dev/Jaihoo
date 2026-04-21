import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

const TRUSTED_BRANDS = [
  "TechFlow",
  "NexaCorp",
  "QuantumPay",
  "StrataSoft",
  "OrbitMedia",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "oklch(9% 0.015 240)" }}
    >
      {/* Hero Background Image with geometric overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-geometric.dim_1200x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay for left readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, oklch(9% 0.015 240) 40%, oklch(9% 0.015 240 / 0.7) 65%, transparent 100%)",
        }}
      />

      {/* Animated glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(55% 0.22 260), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full opacity-10 animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(43% 0.22 280), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-brand-blue/30 text-brand-blue bg-brand-blue/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              Subscription-Based Marketing Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight uppercase mb-6"
          >
            All Your <span className="text-gradient-blue">Marketing</span> Needs
            In One Monthly{" "}
            <span className="text-gradient-blue">Subscription</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
          >
            Replace costly agencies and fragmented freelancers with one elite
            marketing team. Unlimited requests, lightning-fast delivery, and
            measurable results — all for a flat monthly fee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <Button
              asChild
              data-ocid="hero.explore.button"
              className="gradient-blue text-white font-bold px-8 py-4 text-base rounded-xl border-0 hover:opacity-90 transition-all hover:scale-105 glow-blue"
            >
              <a href="#services">
                EXPLORE OUR SERVICES
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <a
              href="#contact"
              data-ocid="hero.consultation.link"
              className="flex items-center gap-2 text-white font-medium underline underline-offset-4 hover:text-brand-blue transition-colors"
            >
              <Play className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Trusted by leading brands
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {TRUSTED_BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="text-muted-foreground/50 font-bold text-sm tracking-wider hover:text-muted-foreground transition-colors"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
