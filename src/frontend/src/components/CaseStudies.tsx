import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import type { CaseStudy } from "../backend.d";
import { useCaseStudies } from "../hooks/useQueries";

const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  {
    clientName: "QuantumPay",
    industry: "Fintech",
    description:
      "Scaled organic traffic by 340% in 6 months through a comprehensive SEO and content strategy, establishing QuantumPay as the #1 thought leader in the B2B fintech space.",
    metrics: [
      ["Organic Traffic", "+340%"],
      ["Lead Volume", "+210%"],
      ["CAC Reduction", "-45%"],
    ],
  },
  {
    clientName: "NexaCommerce",
    industry: "eCommerce",
    description:
      "Rebuilt the paid advertising architecture and creative strategy, driving a 5x ROAS improvement and adding $2.4M in attributable revenue within Q1.",
    metrics: [
      ["ROAS", "5x Growth"],
      ["Revenue Added", "$2.4M"],
      ["Conversion Rate", "+180%"],
    ],
  },
  {
    clientName: "OrbitSaaS",
    industry: "SaaS",
    description:
      "Deployed a full-funnel content marketing engine — from awareness to activation — cutting the average sales cycle by 30% and tripling MQL volume.",
    metrics: [
      ["MQL Volume", "+3x"],
      ["Sales Cycle", "-30%"],
      ["Churn Rate", "-22%"],
    ],
  },
];

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      data-ocid={`case_studies.item.${index + 1}`}
      className="flex flex-col p-6 rounded-xl border border-border bg-surface-1 hover:border-brand-blue/30 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <Badge
          variant="outline"
          className="border-brand-blue/40 text-brand-blue bg-brand-blue/10 text-xs"
        >
          {study.industry}
        </Badge>
        <TrendingUp className="w-5 h-5 text-brand-blue opacity-60" />
      </div>
      <h3 className="text-white font-bold text-xl mb-2">{study.clientName}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
        {study.description}
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {study.metrics.slice(0, 3).map(([label, val]) => (
          <div
            key={label}
            className="text-center p-3 rounded-lg bg-background border border-border"
          >
            <div className="text-brand-blue font-black text-lg">{val}</div>
            <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        data-ocid={`case_studies.view.button.${index + 1}`}
        className="w-full border-border text-muted-foreground hover:text-white hover:border-brand-blue/50 transition-all group-hover:border-brand-blue/40"
      >
        View Case Study <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );
}

export default function CaseStudies() {
  const { data: studies, isLoading } = useCaseStudies();
  const displayStudies =
    studies && studies.length > 0 ? studies : FALLBACK_CASE_STUDIES;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="case-studies" className="py-24 bg-surface-1" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            Proven Results
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Case <span className="text-gradient-blue">Studies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real clients. Real results. See how we've transformed marketing
            performance for brands just like yours.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-ocid="case_studies.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayStudies.slice(0, 3).map((study, i) => (
              <CaseStudyCard key={study.clientName} study={study} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
