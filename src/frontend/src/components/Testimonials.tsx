import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import type { Testimonial } from "../backend.d";
import { useTestimonials } from "../hooks/useQueries";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    author: "Sarah Chen",
    role: "CMO",
    company: "QuantumPay",
    quote:
      "Synergy completely transformed our marketing engine. Within 3 months, we went from 0 to 50,000 monthly organic visitors. The subscription model is a game-changer — we get more output than a full in-house team at a fraction of the cost.",
    rating: BigInt(5),
  },
  {
    author: "Marcus Rivera",
    role: "CEO",
    company: "NexaCommerce",
    quote:
      "I was skeptical about subscription marketing at first. But Synergy delivered a 5x ROAS improvement in our first month. The team is brilliant, fast, and incredibly proactive. I wish we'd switched sooner.",
    rating: BigInt(5),
  },
  {
    author: "Priya Patel",
    role: "VP Growth",
    company: "OrbitSaaS",
    quote:
      "The quality of thinking and execution at Synergy is genuinely world-class. Our content strategy went from generic blog posts to category-defining thought leadership. MQLs tripled in 90 days.",
    rating: BigInt(5),
  },
  {
    author: "Alex Thompson",
    role: "Founder",
    company: "TechFlow",
    quote:
      "We've tried 4 agencies before Synergy. None of them came close. The 24-hour turnaround is real, the strategy is sharp, and the results speak for themselves. Best marketing investment we've made.",
    rating: BigInt(5),
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3"];
const STAR_POSITIONS = ["s1", "s2", "s3", "s4", "s5"] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {STAR_POSITIONS.slice(0, count).map((pos) => (
        <Star key={pos} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const prev = () =>
    setCurrent(
      (c) => (c - 1 + displayTestimonials.length) % displayTestimonials.length,
    );
  const next = () => setCurrent((c) => (c + 1) % displayTestimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-surface-1" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            Client Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            What Our Clients <span className="text-gradient-blue">Say</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="testimonials.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {[-1, 0, 1].map((offset) => {
                const idx =
                  (current + offset + displayTestimonials.length) %
                  displayTestimonials.length;
                const t = displayTestimonials[idx];
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={`offset-${offset}`}
                    data-ocid={`testimonials.item.${Math.abs(offset) + 1}`}
                    animate={{
                      scale: isCenter ? 1 : 0.95,
                      opacity: isCenter ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 rounded-xl border flex flex-col gap-4 ${
                      isCenter
                        ? "border-brand-purple/60 bg-surface-2 glow-purple"
                        : "border-border bg-surface-1"
                    }`}
                  >
                    <StarRating count={Number(t.rating)} />
                    <p className="text-muted-foreground text-sm leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-surface-3 text-white font-bold text-sm">
                          {t.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white font-semibold text-sm">
                          {t.author}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={prev}
                data-ocid="testimonials.pagination_prev"
                className="w-10 h-10 rounded-full border border-border bg-surface-1 flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue/40 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                data-ocid="testimonials.pagination_next"
                className="w-10 h-10 rounded-full border border-border bg-surface-1 flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue/40 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
