import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Mail, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { mutateAsync, isPending } = useSubmitContactForm();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success(
        "Your proposal request has been submitted! We'll be in touch within 24 hours.",
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
              Let's Connect
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              LET'S WORK <span className="text-gradient-blue">TOGETHER</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Ready to transform your marketing? Tell us about your goals and
              we'll put together a custom proposal within 24 hours — no
              obligation, no pushy sales tactics.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg gradient-blue flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span>hello@synergymarketing.io</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg gradient-blue flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span>Available Mon–Fri, 9am–6pm EST</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-brand-blue/40 bg-surface-1 text-center glow-blue"
              >
                <CheckCircle className="w-16 h-16 text-brand-blue" />
                <h3 className="text-white font-black text-2xl">
                  Proposal Request Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thank you, {form.name}! Our team will review your request and
                  send a custom proposal within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-ocid="contact.panel"
                className="p-8 rounded-2xl border border-border bg-surface-1 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-muted-foreground text-sm mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jordan Blake"
                      data-ocid="contact.name.input"
                      required
                      className="bg-background border-border text-white placeholder:text-muted-foreground/50 focus:border-brand-blue/60"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-muted-foreground text-sm mb-1.5 block"
                    >
                      Work Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jordan@company.io"
                      data-ocid="contact.email.input"
                      required
                      className="bg-background border-border text-white placeholder:text-muted-foreground/50 focus:border-brand-blue/60"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="company"
                    className="text-muted-foreground text-sm mb-1.5 block"
                  >
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    data-ocid="contact.company.input"
                    className="bg-background border-border text-white placeholder:text-muted-foreground/50 focus:border-brand-blue/60"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="message"
                    className="text-muted-foreground text-sm mb-1.5 block"
                  >
                    Tell us about your goals *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What marketing challenges are you facing? What growth goals do you have for the next 6-12 months?"
                    data-ocid="contact.message.textarea"
                    required
                    rows={5}
                    className="bg-background border-border text-white placeholder:text-muted-foreground/50 focus:border-brand-blue/60 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  data-ocid="contact.submit_button"
                  className="w-full gradient-blue text-white font-bold py-3 text-base border-0 hover:opacity-90 transition-opacity"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Get Your Free Proposal"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
