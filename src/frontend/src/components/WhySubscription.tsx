import { Clock, Eye, Layers, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const FEATURES = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Full Coverage",
    description:
      "Access every marketing discipline — SEO, PPC, content, social, design, analytics — without hiring multiple agencies.",
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: "Unified Strategy",
    description:
      "All channels working in sync. One cohesive strategy, consistent brand voice, and unified data across every touchpoint.",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Clarity & Control",
    description:
      "Real-time dashboards, weekly reports, and direct Slack access. Always know exactly where your budget is going.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Time Efficiency",
    description:
      "Skip the hiring, onboarding, and management overhead. Get expert output in 24 hours flat, every single time.",
  },
];

export default function WhySubscription() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" className="py-24 bg-surface-1" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
              Why Subscription
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              One Subscription.{" "}
              <span className="text-gradient-blue">Infinite</span> Marketing
              Power.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Traditional agencies charge retainers, hourly rates, and surprise
              fees. We offer a smarter model: predictable pricing, elite talent,
              and results you can actually measure.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-background hover:border-brand-blue/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg gradient-blue-purple flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
