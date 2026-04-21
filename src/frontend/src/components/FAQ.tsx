import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import type { FAQItem } from "../backend.d";
import { useFAQs } from "../hooks/useQueries";

const FALLBACK_FAQS: FAQItem[] = [
  {
    question: "How does the subscription model work?",
    answer:
      "You subscribe to a monthly plan, submit as many marketing requests as you need (depending on your plan), and our team delivers them typically within 24 hours. You can pause or cancel at any time with no long-term commitment.",
  },
  {
    question: "What types of marketing requests can I submit?",
    answer:
      "Virtually anything — SEO content, blog posts, social media graphics and copy, email campaigns, paid ad creatives, landing page copy, branding assets, performance reports, and much more. If it's marketing, we handle it.",
  },
  {
    question: "How fast will I receive my deliverables?",
    answer:
      "Most requests are completed within 24 hours. Complex projects like full campaign builds or comprehensive content strategies may take 48–72 hours. We always set clear timelines upfront so you're never in the dark.",
  },
  {
    question: "Can I pause or cancel my subscription?",
    answer:
      "Absolutely. You can pause your subscription at any time and resume when you're ready — no questions asked. We believe in earning your business every month, not locking you in with contracts.",
  },
  {
    question: "What if I'm not happy with a deliverable?",
    answer:
      "We offer unlimited revisions on every deliverable until you're fully satisfied. Your success is our success. We also offer a 14-day money-back guarantee for new subscribers.",
  },
  {
    question: "Do you work with startups or only enterprise brands?",
    answer:
      "We work with companies at all stages — from pre-seed startups to Fortune 500 enterprises. Our Starter plan is designed specifically for early-stage companies, while Growth and Elite serve scaling and enterprise brands.",
  },
  {
    question: "Who will be working on my account?",
    answer:
      "You get a dedicated team depending on your plan: a strategy lead, content specialist, designer, and paid media expert. On the Elite plan, you also get VP-level marketing leadership and fractional CMO services.",
  },
];

export default function FAQ() {
  const { data: faqs, isLoading } = useFAQs();
  const displayFAQs = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="faq" className="py-24" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            Got Questions?
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Frequently Asked{" "}
            <span className="text-gradient-blue">Questions</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3" data-ocid="faq.loading_state">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {displayFAQs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  data-ocid={`faq.item.${i + 1}`}
                  className="border border-border rounded-xl bg-surface-1 px-6 py-1 data-[state=open]:border-brand-blue/40"
                >
                  <AccordionTrigger className="text-white font-semibold text-left hover:no-underline hover:text-brand-blue transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
      </div>
    </section>
  );
}
