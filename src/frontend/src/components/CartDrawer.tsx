import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActor } from "@/hooks/useActor";
import { CheckCircle2, Loader2, ShoppingCart, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { selectedServices, toggleService, clearCart, cartCount } = useCart();
  const { actor } = useActor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    try {
      await actor.submitContactForm({
        name: form.name,
        email: form.email,
        company: "Service Cart Order",
        message: `Selected: ${selectedServices.join(", ")} | Phone: ${form.phone}`,
        timestamp: BigInt(Date.now()),
      });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSuccess(false), 400);
  };

  return (
    <>
      {/* Floating cart button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        data-ocid="cart.open_modal_button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-blue text-white shadow-2xl flex items-center justify-center"
        style={{
          boxShadow:
            "0 0 30px rgba(59,130,246,0.5), 0 8px 24px rgba(0,0,0,0.4)",
        }}
        aria-label="Open cart"
      >
        <ShoppingCart className="w-6 h-6" />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-yellow-400 text-black text-xs font-black flex items-center justify-center"
              data-ocid="cart.badge"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            data-ocid="cart.sheet"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{
              background: "oklch(0.12 0.02 280)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl gradient-blue flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-black text-lg">Your Cart</h2>
                  <p className="text-muted-foreground text-xs">
                    {cartCount} service{cartCount !== 1 ? "s" : ""} selected
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                data-ocid="cart.close_button"
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center gap-5 px-6"
                  data-ocid="cart.success_state"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(59,130,246,0.15)",
                      border: "1px solid rgba(59,130,246,0.4)",
                    }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-brand-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-black text-2xl mb-2">
                      Quote Requested!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Our team will reach out within 24 hours with a custom
                      proposal for your selected services.
                    </p>
                  </div>
                  <Button
                    onClick={handleClose}
                    className="gradient-blue text-white font-bold border-0 w-full"
                    data-ocid="cart.close_button"
                  >
                    Close
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Selected services list */}
                  <ScrollArea className="flex-1 px-6 py-4">
                    {selectedServices.length === 0 ? (
                      <div
                        className="flex flex-col items-center justify-center py-16 gap-3 text-center"
                        data-ocid="cart.empty_state"
                      >
                        <div className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">
                          Your cart is empty
                        </p>
                        <p className="text-muted-foreground text-xs max-w-48">
                          Go to Services and tick the ones you're interested in.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleClose();
                            window.location.hash = "services";
                          }}
                          className="mt-2 border-border text-white"
                          data-ocid="cart.secondary_button"
                        >
                          Browse Services
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex flex-col gap-2"
                        data-ocid="cart.list"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                            Selected Services
                          </span>
                          <button
                            type="button"
                            onClick={clearCart}
                            data-ocid="cart.delete_button"
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Clear all
                          </button>
                        </div>
                        {selectedServices.map((name, i) => (
                          <motion.div
                            key={name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.04 }}
                            data-ocid={`cart.item.${i + 1}`}
                            className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-white/5 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-brand-blue" />
                              <span className="text-white text-sm font-medium">
                                {name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleService(name)}
                              data-ocid={`cart.delete_button.${i + 1}`}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                              aria-label={`Remove ${name}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Quote form */}
                  {selectedServices.length > 0 && (
                    <div className="px-6 pb-6 border-t border-border pt-5">
                      <p className="text-white font-bold text-sm mb-4">
                        Request a Quote
                      </p>
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                        data-ocid="cart.modal"
                      >
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="cart-name"
                            className="text-muted-foreground text-xs"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="cart-name"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, name: e.target.value }))
                            }
                            data-ocid="cart.input"
                            className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground h-9 text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="cart-email"
                            className="text-muted-foreground text-xs"
                          >
                            Email
                          </Label>
                          <Input
                            id="cart-email"
                            required
                            type="email"
                            placeholder="you@company.com"
                            value={form.email}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, email: e.target.value }))
                            }
                            data-ocid="cart.input"
                            className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground h-9 text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="cart-phone"
                            className="text-muted-foreground text-xs"
                          >
                            Phone
                          </Label>
                          <Input
                            id="cart-phone"
                            required
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, phone: e.target.value }))
                            }
                            data-ocid="cart.input"
                            className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground h-9 text-sm"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={submitting}
                          data-ocid="cart.submit_button"
                          className="gradient-blue text-white font-bold border-0 w-full mt-1"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Get Free Quote"
                          )}
                        </Button>
                      </form>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
