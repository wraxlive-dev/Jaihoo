import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import type { PricingPlan } from "../backend.d";
import { usePricingPlans } from "../hooks/useQueries";

const FALLBACK_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: BigInt(1997),
    isFeatured: false,
    features: [
      "2 Active Marketing Channels",
      "Up to 10 Requests/Month",
      "48-Hour Delivery",
      "Dedicated Account Manager",
      "Monthly Performance Report",
      "Slack Communication",
    ],
  },
  {
    name: "Growth",
    price: BigInt(3997),
    isFeatured: true,
    features: [
      "5 Active Marketing Channels",
      "Unlimited Requests",
      "24-Hour Delivery",
      "Senior Strategist + Full Team",
      "Weekly Performance Reports",
      "Priority Slack + Video Calls",
      "A/B Testing & CRO",
      "Custom Analytics Dashboard",
    ],
  },
  {
    name: "Elite",
    price: BigInt(7997),
    isFeatured: false,
    features: [
      "All Channels Included",
      "Unlimited Requests",
      "Same-Day Delivery",
      "VP-Level Marketing Lead",
      "Daily Reports & Insights",
      "Dedicated Creative Team",
      "Advanced Attribution Modeling",
      "Fractional CMO Services",
      "Quarterly Strategy Sprints",
    ],
  },
];

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      data-ocid={`pricing.item.${index + 1}`}
      className={`relative flex flex-col rounded-2xl p-6 border transition-all ${
        plan.isFeatured
          ? "border-brand-blue/60 bg-surface-2 glow-blue scale-105"
          : "border-border bg-surface-1"
      }`}
    >
      {plan.isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="gradient-blue text-white font-bold px-4 py-1 text-xs border-0">
            <Zap className="w-3 h-3 mr-1" /> MOST POPULAR
          </Badge>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white">
            ${Number(plan.price).toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        data-ocid={`pricing.get_started.button.${index + 1}`}
        className={`w-full font-bold border-0 ${
          plan.isFeatured
            ? "gradient-blue text-white hover:opacity-90"
            : "bg-surface-3 text-white hover:bg-surface-2"
        }`}
      >
        <a href="#contact">Get Started</a>
      </Button>
    </motion.div>
  );
}

export default function Pricing() {
  const { data: plans, isLoading } = usePricingPlans();
  const displayPlans = plans && plans.length > 0 ? plans : FALLBACK_PLANS;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="pricing" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            Subscription Plans
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Simple, Transparent{" "}
            <span className="text-gradient-blue">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No surprise fees. No long-term contracts. Pause or cancel anytime.
            Pick the plan that matches your growth stage.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="pricing.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {displayPlans.slice(0, 3).map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          All plans include a 14-day money-back guarantee. No contracts, cancel
          anytime.
        </motion.p>
      </div>
    </section>
  );
}
