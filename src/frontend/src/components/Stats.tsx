import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const STATS = [
  { value: "24 Hrs", label: "Turnaround Time" },
  { value: "50%+", label: "Output Growth" },
  { value: "$100k", label: "Avg. Annual Saving" },
  { value: "10 Hrs", label: "Saved Per Week" },
  { value: "30+", label: "Services Offered" },
  { value: "Top 1%", label: "Marketing Experts" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-12 border-y border-border"
      style={{ background: "oklch(12% 0.015 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center lg:border-r last:border-0 border-border px-4 py-4"
            >
              <div className="text-2xl lg:text-3xl font-black text-gradient-blue mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
