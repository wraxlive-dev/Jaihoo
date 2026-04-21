import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import type { TeamMember } from "../backend.d";
import { useTeamMembers } from "../hooks/useQueries";

const FALLBACK_TEAM: TeamMember[] = [
  {
    name: "Jordan Blake",
    role: "CEO & Co-Founder",
    bio: "Former VP of Growth at two unicorn startups. 12+ years scaling B2B marketing engines.",
  },
  {
    name: "Aisha Okonkwo",
    role: "Chief Strategy Officer",
    bio: "Ex-Google, ex-McKinsey. Specialist in integrated marketing strategy and category creation.",
  },
  {
    name: "Dev Mehta",
    role: "Head of Paid Media",
    bio: "Managed $50M+ in annual ad spend. Certified expert on Google, Meta, and LinkedIn platforms.",
  },
  {
    name: "Sofia Larsen",
    role: "Creative Director",
    bio: "Award-winning brand designer with a portfolio spanning 80+ global brands.",
  },
  {
    name: "Kenji Yamamoto",
    role: "SEO Director",
    bio: "Built organic channels from scratch for 30+ companies. Featured in Search Engine Journal.",
  },
  {
    name: "Mia Russo",
    role: "Head of Content",
    bio: "Journalist-turned-marketer. Grew multiple media properties to 1M+ monthly readers.",
  },
];

const BG_COLORS = ["gradient-blue", "gradient-blue-purple"];

export default function Team() {
  const { data: team, isLoading } = useTeamMembers();
  const displayTeam = team && team.length > 0 ? team : FALLBACK_TEAM;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="team" className="py-24 bg-surface-1" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-bold uppercase tracking-widest mb-3 block">
            Our People
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Meet the <span className="text-gradient-blue">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Former Fortune 500 executives, agency veterans, and startup growth
            hackers — united by one goal: your growth.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="team.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTeam.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-ocid={`team.item.${i + 1}`}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:border-brand-blue/30 transition-all group"
              >
                <Avatar className="w-14 h-14 flex-shrink-0">
                  <AvatarFallback
                    className={`text-white font-black text-lg ${BG_COLORS[i % 2]}`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold">{member.name}</h3>
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-brand-blue transition-colors" />
                  </div>
                  <p className="text-brand-blue text-xs font-semibold mb-1.5">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
