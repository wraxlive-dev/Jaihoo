import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const SERVICES_LINKS = [
  "SEO Optimization",
  "Social Media Marketing",
  "Paid Advertising",
  "Content Marketing",
  "Branding & Design",
  "Web Analytics",
];

const COMPANY_LINKS = [
  { label: "About Us", href: "#team" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    icon: <Twitter className="w-4 h-4" />,
    label: "Twitter",
    href: "https://twitter.com",
  },
  {
    icon: <Linkedin className="w-4 h-4" />,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: <Youtube className="w-4 h-4" />,
    label: "YouTube",
    href: "https://youtube.com",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border bg-surface-1 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                SYNERGY
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              The subscription-based marketing agency for ambitious brands. One
              flat fee. Unlimited growth potential.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue/40 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-muted-foreground text-sm hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-muted-foreground text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>hello@synergymarketing.io</li>
              <li>+1 (888) 123-4567</li>
              <li className="leading-relaxed">
                340 Pine Street, Suite 800
                <br />
                San Francisco, CA 94104
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            © {year} Synergy Marketing. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
