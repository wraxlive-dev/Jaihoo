import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const WHATSAPP_NUMBER = "918764002776";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
    >
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="tooltip"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="select-none whitespace-nowrap rounded-full bg-[#25D366] px-3 py-1.5 text-sm font-semibold text-white shadow-lg"
          >
            Chat on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.button"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "#25D366",
            animation: "whatsapp-pulse 2s ease-out infinite",
            opacity: 0.5,
          }}
        />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative z-10 h-7 w-7"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.666 4.8 1.822 6.8L2 30l7.4-1.8A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.88-1.6l-.42-.25-4.39 1.07 1.1-4.28-.28-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.34-8.66c-.35-.174-2.066-1.018-2.387-1.134-.32-.116-.553-.174-.786.174-.233.348-.9 1.134-1.104 1.368-.203.234-.406.262-.756.087-.35-.174-1.477-.544-2.813-1.736-1.04-.927-1.742-2.073-1.946-2.421-.203-.348-.022-.536.153-.71.157-.156.35-.406.524-.61.173-.202.23-.347.347-.58.116-.232.058-.435-.029-.61-.087-.174-.785-1.893-1.076-2.591-.284-.68-.572-.588-.786-.599l-.669-.012c-.232 0-.61.087-.93.435-.32.348-1.221 1.192-1.221 2.907s1.25 3.373 1.424 3.607c.174.232 2.46 3.754 5.96 5.265.833.36 1.483.574 1.989.735.836.266 1.597.228 2.198.138.67-.1 2.066-.844 2.358-1.66.291-.813.291-1.51.203-1.66-.087-.15-.32-.232-.67-.406z" />
        </svg>
      </motion.a>

      <style>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
