import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Pricing", href: "#pricing" },
  { label: "Membership", href: "#membership" },
  { label: "Agency", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              SYNERGY
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            data-ocid="nav.panel"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                className={`transition-colors text-sm font-medium ${
                  link.label === "Membership"
                    ? "font-bold"
                    : "text-muted-foreground hover:text-white"
                }`}
                style={
                  link.label === "Membership"
                    ? {
                        background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : undefined
                }
              >
                {link.label === "Membership" ? `✦ ${link.label}` : link.label}
              </a>
            ))}
          </nav>

          {/* Right side: Cart + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart icon button */}
            <button
              type="button"
              onClick={() => {
                const cartBtn = document.querySelector(
                  "[data-ocid='cart.open_modal_button']",
                ) as HTMLButtonElement | null;
                cartBtn?.click();
              }}
              data-ocid="nav.cart.button"
              className="relative w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue/50 transition-all"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-blue text-white text-xs font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Button
              asChild
              data-ocid="nav.proposal.button"
              className="gradient-blue text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity border-0"
            >
              <a href="#contact">Get Free Proposal</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile_menu.toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-surface-1 border-t border-border px-4 py-4"
          data-ocid="nav.mobile_menu.panel"
        >
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="gradient-blue text-white font-semibold w-full border-0"
            >
              <a href="#contact">Get Free Proposal</a>
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
