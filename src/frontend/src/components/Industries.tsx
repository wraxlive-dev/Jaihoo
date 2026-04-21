import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const INDUSTRIES = [
  "SaaS",
  "Fintech",
  "eCommerce",
  "B2B",
  "B2C",
  "Healthcare",
  "Real Estate",
  "Gaming",
  "Crypto & Web3",
  "EdTech",
  "Logistics",
  "Travel & Hospitality",
  "Legal & Compliance",
  "Retail",
  "Media & Entertainment",
  "Manufacturing",
];

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            Industries We Serve
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Marketing Expertise Across{" "}
            <span className="text-gradient-blue">Every Industry</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From fast-moving startups to enterprise brands — we've driven growth
            across every major vertical.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((industry, i) => (
            <motion.span
              key={industry}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="px-4 py-2 rounded-full border border-border bg-surface-1 text-muted-foreground text-sm font-medium hover:border-brand-blue/40 hover:text-white hover:bg-surface-2 transition-all cursor-default"
            >
              {industry}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
