import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";

type Tier = "Silver" | "Gold" | "Platinum";
type Plan = "monthly" | "yearly";

const TIERS: {
  name: Tier;
  monthly: string;
  yearly: string;
  yearlySavings: string;
  gradient: string;
  chipColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  features: string[];
  isFeatured: boolean;
}[] = [
  {
    name: "Silver",
    monthly: "₹4,999",
    yearly: "₹49,999",
    yearlySavings: "Save ₹9,989",
    gradient:
      "linear-gradient(135deg, #6b7280 0%, #9ca3af 40%, #d1d5db 70%, #9ca3af 100%)",
    chipColor: "#9ca3af",
    textColor: "#f9fafb",
    accentColor: "rgba(255,255,255,0.15)",
    borderColor: "rgba(156,163,175,0.5)",
    glowColor: "rgba(156,163,175,0.3)",
    isFeatured: false,
    features: [
      "SEO Optimization",
      "Social Media Management",
      "Content Marketing",
      "Google & Meta Ads",
      "Email Marketing",
      "Brand Strategy & Design",
      "Video Marketing",
      "WhatsApp Marketing",
      "WhatsApp Automation API",
      "WhatsApp Automation Software",
      "Automation Review",
      "Performance Analytics",
      "Local SEO",
      "Programmatic Advertising",
      "Website Copywriting",
    ],
  },
  {
    name: "Gold",
    monthly: "₹9,999",
    yearly: "₹99,999",
    yearlySavings: "Save ₹19,989",
    gradient:
      "linear-gradient(135deg, #92400e 0%, #d97706 35%, #fbbf24 60%, #f59e0b 80%, #b45309 100%)",
    chipColor: "#fbbf24",
    textColor: "#fff7ed",
    accentColor: "rgba(251,191,36,0.2)",
    borderColor: "rgba(251,191,36,0.6)",
    glowColor: "rgba(251,191,36,0.4)",
    isFeatured: true,
    features: [
      "SEO Optimization",
      "Social Media Management",
      "Content Marketing",
      "Google & Meta Ads",
      "Email Marketing",
      "Brand Strategy & Design",
      "Video Marketing",
      "WhatsApp Marketing",
      "WhatsApp Automation API",
      "WhatsApp Automation Software",
      "Automation Review",
      "Performance Analytics",
      "Dedicated Account Manager",
      "AI & GEO SEO",
      "Account-Based Marketing",
      "Landing Pages & Funnels",
      "ChatGPT & AI Optimization",
    ],
  },
  {
    name: "Platinum",
    monthly: "₹19,999",
    yearly: "₹1,99,999",
    yearlySavings: "Save ₹39,989",
    gradient:
      "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 55%, #6d28d9 75%, #3730a3 100%)",
    chipColor: "#a78bfa",
    textColor: "#f5f3ff",
    accentColor: "rgba(167,139,250,0.2)",
    borderColor: "rgba(167,139,250,0.6)",
    glowColor: "rgba(167,139,250,0.4)",
    isFeatured: false,
    features: [
      "SEO Optimization",
      "Social Media Management",
      "Content Marketing",
      "Google & Meta Ads",
      "Email Marketing",
      "Brand Strategy & Design",
      "Video Marketing",
      "WhatsApp Marketing",
      "WhatsApp Automation API",
      "WhatsApp Automation Software",
      "Automation Review",
      "Performance Analytics",
      "Dedicated Account Manager",
      "Priority Support",
      "Custom Strategy Sessions",
      "AI & GEO SEO",
      "Account-Based Marketing",
      "Landing Pages & Funnels",
      "ChatGPT & AI Optimization",
      "Amazon SEO & Advertising",
      "Shopify Optimization",
      "CRM & Marketing Automation",
      "Connected TV & OTT Advertising",
      "Revenue Operations & Analytics",
    ],
  },
];

const CARD_DOTS = ["••••", "••••", "••••"];

interface SubscribeForm {
  name: string;
  email: string;
  phone: string;
}

export default function PrivilegeMembershipCard() {
  const [plan, setPlan] = useState<Plan>("monthly");
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [form, setForm] = useState<SubscribeForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { actor } = useActor(createActor);

  const handleOpenDialog = (tier: Tier) => {
    setSelectedTier(tier);
    setSuccess(false);
    setForm({ name: "", email: "", phone: "" });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !selectedTier) return;
    setSubmitting(true);
    try {
      await actor.submitContactForm({
        name: form.name,
        email: form.email,
        company: `Privilege Membership — ${selectedTier} (${plan})`,
        message: `Phone: ${form.phone} | Membership: ${selectedTier} | Plan: ${plan}`,
        timestamp: BigInt(Date.now()),
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTierData = TIERS.find((t) => t.name === selectedTier);

  return (
    <section id="membership" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-1 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.45_0.15_280/0.08)_0%,_transparent_65%)]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(0.78 0.18 80)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
            style={{
              borderColor: "rgba(251,191,36,0.4)",
              background: "rgba(251,191,36,0.08)",
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "#fbbf24" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#fbbf24" }}
            >
              Exclusive Offer
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Privilege{" "}
            <span
              className="relative"
              style={{
                background: "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Membership Card
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get access to ALL our digital marketing services under one premium
            subscription — including WhatsApp Automation API, Software &
            Automation Review.
          </p>
        </motion.div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex justify-center mb-14">
          <div
            className="inline-flex items-center gap-1 p-1 rounded-full border"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
            }}
            data-ocid="membership.tab"
          >
            {(["monthly", "yearly"] as Plan[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlan(p)}
                data-ocid={`membership.${p}.toggle`}
                className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  color: plan === p ? "#0a0a0a" : "#9ca3af",
                  background: plan === p ? "#fbbf24" : "transparent",
                }}
              >
                {p === "yearly" && (
                  <span
                    className="absolute -top-3 -right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                    style={{
                      background: "oklch(0.55 0.18 140)",
                      color: "white",
                    }}
                  >
                    Save 17%
                  </span>
                )}
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: tier.isFeatured ? 1.04 : 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: tier.isFeatured ? 1.07 : 1.03 }}
              className="relative group cursor-pointer"
            >
              {tier.isFeatured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest z-10"
                  style={{ background: "#fbbf24", color: "#0a0a0a" }}
                >
                  ✦ Most Popular
                </div>
              )}

              {/* The physical card */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: tier.gradient,
                  border: `1px solid ${tier.borderColor}`,
                  boxShadow: `0 0 40px ${tier.glowColor}, 0 20px 60px rgba(0,0,0,0.4)`,
                  minHeight: 340,
                }}
              >
                {/* Holographic shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.05) 8px, rgba(255,255,255,0.05) 10px)",
                  }}
                />
                {/* Top right shine */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl opacity-30"
                  style={{ background: tier.textColor }}
                />

                <div className="relative p-6 flex flex-col gap-5">
                  {/* Card top row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="text-[10px] font-black tracking-[0.25em] uppercase mb-1 opacity-70"
                        style={{ color: tier.textColor }}
                      >
                        Privilege Member
                      </p>
                      <h3
                        className="text-3xl font-black tracking-tight"
                        style={{ color: tier.textColor }}
                      >
                        {tier.name}
                      </h3>
                    </div>
                    {/* Chip */}
                    <div
                      className="w-10 h-8 rounded-md mt-1 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${tier.chipColor}, rgba(255,255,255,0.4))`,
                        boxShadow:
                          "inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      <CreditCard
                        className="w-5 h-5"
                        style={{ color: "rgba(0,0,0,0.5)" }}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-4xl font-black"
                        style={{ color: tier.textColor }}
                      >
                        {plan === "monthly" ? tier.monthly : tier.yearly}
                      </span>
                      <span
                        className="text-sm opacity-70"
                        style={{ color: tier.textColor }}
                      >
                        /{plan === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {plan === "yearly" && (
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: tier.chipColor,
                          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                        }}
                      >
                        {tier.yearlySavings}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div
                    className="h-px w-full opacity-30"
                    style={{ background: tier.textColor }}
                  />

                  {/* Services list */}
                  <ul className="flex flex-col gap-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: tier.chipColor }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: tier.textColor, opacity: 0.9 }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Card number decorative */}
                  <div className="flex gap-3 mt-1 opacity-40" aria-hidden>
                    {CARD_DOTS.map((d) => (
                      <span
                        key={d}
                        className="text-xs font-mono tracking-widest"
                        style={{ color: tier.textColor }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Subscribe button */}
                  <button
                    type="button"
                    onClick={() => handleOpenDialog(tier.name)}
                    data-ocid={`membership.${tier.name.toLowerCase()}.button`}
                    className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
                    style={{
                      background: tier.accentColor,
                      border: `1px solid ${tier.borderColor}`,
                      color: tier.textColor,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {tier.isFeatured
                      ? "✦ Get Gold Card"
                      : `Get ${tier.name} Card`}
                  </button>
                </div>
              </div>

              {/* Stars for featured */}
              {tier.isFeatured && (
                <div className="flex justify-center gap-1 mt-3">
                  {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                    <Star
                      key={k}
                      className="w-3 h-3 fill-current"
                      style={{ color: "#fbbf24" }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Features comparison note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            All plans include onboarding support • Cancel anytime • No hidden
            fees
          </p>
        </motion.div>
      </div>

      {/* Subscribe Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-ocid="membership.dialog"
          style={{
            background: "oklch(0.12 0.02 280)",
            border: `1px solid ${
              selectedTierData?.borderColor ?? "rgba(255,255,255,0.15)"
            }`,
            boxShadow: `0 0 60px ${
              selectedTierData?.glowColor ?? "rgba(0,0,0,0.3)"
            }, 0 25px 50px rgba(0,0,0,0.5)`,
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-black">
              {selectedTierData && (
                <span
                  style={{
                    background: selectedTierData.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {selectedTier} Privilege Card
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Complete your details and our team will activate your membership
              within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-8"
                data-ocid="membership.success_state"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "oklch(0.55 0.18 140 / 0.2)",
                    border: "1px solid oklch(0.55 0.18 140 / 0.4)",
                  }}
                >
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: "oklch(0.7 0.18 140)" }}
                  />
                </div>
                <h3 className="text-white font-black text-xl text-center">
                  Request Submitted!
                </h3>
                <p className="text-muted-foreground text-center text-sm">
                  Your Privilege Membership request has been submitted! Our team
                  will contact you within 24 hours.
                </p>
                <Badge
                  className="text-xs font-semibold px-4 py-1.5"
                  style={{
                    background: selectedTierData?.glowColor,
                    color: selectedTierData?.chipColor,
                  }}
                >
                  {selectedTier} ·{" "}
                  {plan === "monthly"
                    ? `${selectedTierData?.monthly}/mo`
                    : `${selectedTierData?.yearly}/yr`}
                </Badge>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-2"
                data-ocid="membership.form"
              >
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="mem-name"
                    className="text-white text-sm font-semibold"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="mem-name"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    data-ocid="membership.name.input"
                    className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="mem-email"
                    className="text-white text-sm font-semibold"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="mem-email"
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    data-ocid="membership.email.input"
                    className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="mem-phone"
                    className="text-white text-sm font-semibold"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="mem-phone"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    data-ocid="membership.phone.input"
                    className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                  />
                </div>

                <div
                  className="flex items-center justify-between p-3 rounded-xl text-sm"
                  style={{
                    background:
                      selectedTierData?.accentColor ?? "rgba(255,255,255,0.05)",
                    border: `1px solid ${
                      selectedTierData?.borderColor ?? "rgba(255,255,255,0.1)"
                    }`,
                  }}
                >
                  <span className="text-muted-foreground">Selected Plan</span>
                  <span
                    className="font-black"
                    style={{ color: selectedTierData?.chipColor ?? "white" }}
                  >
                    {selectedTier} ·{" "}
                    {plan === "monthly"
                      ? `${selectedTierData?.monthly}/mo`
                      : `${selectedTierData?.yearly}/yr`}
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  data-ocid="membership.submit_button"
                  className="w-full py-6 font-black text-sm uppercase tracking-wider rounded-xl border-0"
                  style={{
                    background: selectedTierData?.gradient ?? "#fbbf24",
                    color: selectedTierData?.textColor ?? "white",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Activate My Membership"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
