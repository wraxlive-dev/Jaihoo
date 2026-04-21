import {
  BarChart2,
  Bot,
  BrainCircuit,
  Check,
  FileText,
  Funnel,
  Globe,
  Layout,
  Link,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MonitorPlay,
  Palette,
  Radio,
  Search,
  Share2,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  Workflow,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useCart } from "../context/CartContext";

interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    title: "SEO Optimization",
    icon: <Search className="w-6 h-6" />,
    description:
      "Dominate search rankings with data-driven SEO strategies that drive organic traffic and boost visibility.",
    category: "organic",
  },
  {
    title: "Social Media Marketing",
    icon: <Share2 className="w-6 h-6" />,
    description:
      "Build a powerful social presence with compelling content and community management across all platforms.",
    category: "social",
  },
  {
    title: "Google Ads",
    icon: <Target className="w-6 h-6" />,
    description:
      "Reach high-intent audiences with precision-targeted Google Ads campaigns that maximize ROI.",
    category: "paid",
  },
  {
    title: "Meta Ads",
    icon: <Megaphone className="w-6 h-6" />,
    description:
      "Supercharge your brand on Facebook & Instagram with creative Meta Ads that convert at scale.",
    category: "paid",
  },
  {
    title: "Content Marketing",
    icon: <FileText className="w-6 h-6" />,
    description:
      "Engage and convert your audience with high-impact blogs, whitepapers, videos, and thought leadership.",
    category: "content",
  },
  {
    title: "Email Marketing",
    icon: <Mail className="w-6 h-6" />,
    description:
      "Nurture leads and retain customers with personalized email campaigns that drive repeat business.",
    category: "email",
  },
  {
    title: "Video Marketing",
    icon: <Video className="w-6 h-6" />,
    description:
      "Captivate your audience with cinematic brand videos, reels, and explainer content that converts.",
    category: "video",
  },
  {
    title: "Branding & Design",
    icon: <Palette className="w-6 h-6" />,
    description:
      "Build a memorable brand identity with stunning visuals that resonate and differentiate in any market.",
    category: "design",
  },
  {
    title: "Web Analytics",
    icon: <BarChart2 className="w-6 h-6" />,
    description:
      "Turn data into decisions with advanced analytics, attribution modeling, and conversion rate optimization.",
    category: "analytics",
  },
  {
    title: "Influencer Marketing",
    icon: <Users className="w-6 h-6" />,
    description:
      "Amplify your brand through trusted influencer partnerships that reach millions of engaged followers.",
    category: "influencer",
  },
  {
    title: "WhatsApp Marketing",
    icon: <MessageCircle className="w-6 h-6" />,
    description:
      "Connect directly with customers on WhatsApp with broadcast campaigns, catalogs, and personalized messages.",
    category: "whatsapp",
  },
  {
    title: "WhatsApp Automation API",
    icon: <Zap className="w-6 h-6" />,
    description:
      "Integrate powerful WhatsApp Business API to automate customer journeys, order updates, and notifications.",
    category: "whatsapp",
  },
  {
    title: "WhatsApp Automation Software",
    icon: <Bot className="w-6 h-6" />,
    description:
      "Deploy intelligent WhatsApp chatbots and automation software to handle inquiries 24/7 without human effort.",
    category: "whatsapp",
  },
  {
    title: "Automation Review",
    icon: <Star className="w-6 h-6" />,
    description:
      "Audit and optimize your entire marketing automation stack for performance, cost, and conversion gains.",
    category: "automation",
  },
  {
    title: "Reputation Management",
    icon: <Shield className="w-6 h-6" />,
    description:
      "Protect and enhance your online reputation with review monitoring, response strategies, and ORM campaigns.",
    category: "reputation",
  },
  {
    title: "Conversion Rate Optimization",
    icon: <TrendingUp className="w-6 h-6" />,
    description:
      "Turn more visitors into customers with A/B testing, UX audits, and data-driven landing page optimization.",
    category: "cro",
  },
  {
    title: "PR & Media Outreach",
    icon: <Radio className="w-6 h-6" />,
    description:
      "Get featured in top media outlets with strategic PR campaigns and journalist relationship building.",
    category: "pr",
  },
  {
    title: "Affiliate Marketing",
    icon: <Link className="w-6 h-6" />,
    description:
      "Build a revenue-generating affiliate network and expand your reach through performance-based partnerships.",
    category: "affiliate",
  },
  // New WebFX-inspired services
  {
    title: "AI & GEO SEO",
    icon: <BrainCircuit className="w-6 h-6" />,
    description:
      "Future-proof your search presence with Generative Engine Optimization — get featured in AI Overviews, ChatGPT, and Copilot answers.",
    category: "seo",
  },
  {
    title: "Local SEO",
    icon: <MapPin className="w-6 h-6" />,
    description:
      "Dominate local search results and Google Maps with hyper-targeted local SEO strategies for your city or region.",
    category: "seo",
  },
  {
    title: "Programmatic Advertising",
    icon: <MonitorPlay className="w-6 h-6" />,
    description:
      "Scale your ads across millions of placements with data-driven programmatic display, video, and native advertising.",
    category: "paid",
  },
  {
    title: "Google Local Services Ads",
    icon: <Globe className="w-6 h-6" />,
    description:
      "Appear at the very top of Google search with Local Services Ads — pay only for verified leads, not clicks.",
    category: "paid",
  },
  {
    title: "Account-Based Marketing",
    icon: <Users className="w-6 h-6" />,
    description:
      "Target high-value B2B accounts with precision ABM campaigns that align sales and marketing for faster deal closure.",
    category: "b2b",
  },
  {
    title: "Amazon SEO & Advertising",
    icon: <ShoppingCart className="w-6 h-6" />,
    description:
      "Grow your Amazon sales with expert listing optimization, A+ content, and targeted Amazon PPC campaigns.",
    category: "ecommerce",
  },
  {
    title: "Shopify Optimization",
    icon: <ShoppingBag className="w-6 h-6" />,
    description:
      "Maximize your Shopify store's visibility and conversions with SEO, CRO, and performance optimization.",
    category: "ecommerce",
  },
  {
    title: "ChatGPT & AI Optimization",
    icon: <BrainCircuit className="w-6 h-6" />,
    description:
      "Get your brand mentioned and recommended by AI assistants like ChatGPT, Gemini, and Copilot with GEO strategies.",
    category: "ai",
  },
  {
    title: "Website Design & Development",
    icon: <Layout className="w-6 h-6" />,
    description:
      "Launch fast, beautiful websites built for conversion — from landing pages to full ecommerce stores.",
    category: "design",
  },
  {
    title: "CRM & Marketing Automation",
    icon: <Workflow className="w-6 h-6" />,
    description:
      "Connect your CRM (Salesforce, HubSpot) with marketing automation to nurture leads and shorten your sales cycle.",
    category: "automation",
  },
  {
    title: "Landing Pages & Funnels",
    icon: <Funnel className="w-6 h-6" />,
    description:
      "Convert more traffic with high-performance landing pages and sales funnels built around your customer journey.",
    category: "cro",
  },
  {
    title: "Connected TV & OTT Advertising",
    icon: <MonitorPlay className="w-6 h-6" />,
    description:
      "Reach cord-cutters on streaming platforms with targeted CTV/OTT video ads that build brand awareness.",
    category: "video",
  },
  {
    title: "Revenue Operations & Analytics",
    icon: <BarChart2 className="w-6 h-6" />,
    description:
      "Unify your sales and marketing data for full-funnel attribution, ROI forecasting, and smarter revenue decisions.",
    category: "analytics",
  },
  {
    title: "Website Copywriting",
    icon: <FileText className="w-6 h-6" />,
    description:
      "Convert visitors with compelling, SEO-optimized web copy written by expert copywriters who understand your audience.",
    category: "content",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { selectedServices, toggleService } = useCart();
  const isSelected = selectedServices.includes(service.title);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      data-ocid={`services.item.${index + 1}`}
      onClick={() => toggleService(service.title)}
      className={`group relative p-6 rounded-xl border bg-surface-1 transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-brand-blue bg-surface-2 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          : "border-border hover:border-brand-blue/40 hover:bg-surface-2 hover:glow-blue"
      }`}
    >
      {/* Checkbox overlay top-right */}
      <div
        className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? "bg-brand-blue border-brand-blue scale-110"
            : "border-border bg-transparent group-hover:border-brand-blue/60"
        }`}
        data-ocid={`services.checkbox.${index + 1}`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
      </div>

      <div
        className={`w-12 h-12 rounded-xl gradient-blue flex items-center justify-center text-white mb-4 transition-transform ${
          isSelected ? "scale-110" : "group-hover:scale-110"
        }`}
      >
        {service.icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2 pr-6">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 inline-flex items-center gap-1.5 text-brand-blue text-xs font-semibold"
        >
          <Check className="w-3 h-3" /> Added to cart
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { cartCount } = useCart();

  return (
    <section id="services" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            What We Offer
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Full-Stack Marketing{" "}
            <span className="text-gradient-blue">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From search to social, content to conversion — every marketing
            channel covered under one subscription.
          </p>
        </motion.div>

        {/* Cart hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-sm font-medium">
            <Check className="w-4 h-4" />
            Tick any services to add them to your cart
            {cartCount > 0 && (
              <span className="ml-1 bg-brand-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount} selected
              </span>
            )}
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="services.list"
        >
          {FALLBACK_SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
