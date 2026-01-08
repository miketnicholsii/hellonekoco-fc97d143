import { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Linkedin, Instagram, Mail } from "lucide-react";

const profile = {
  name: "Alex Rivera",
  headline: "Founder & Creative Director",
  bio: "Building brands that resonate. Helping startups tell their story with clarity and purpose.",
  skills: ["Brand Strategy", "Visual Design", "Content Creation", "Web Development"],
};

const links = [
  { icon: Globe, label: "Website", url: "alexrivera.co" },
  { icon: Linkedin, label: "LinkedIn", url: "linkedin.com/in/alexrivera" },
  { icon: Instagram, label: "Instagram", url: "@alexrivera.studio" },
];

const projects = [
  { title: "Noma Collective", type: "Brand Identity", color: "bg-primary/20" },
  { title: "Vertex Labs", type: "Web Design", color: "bg-secondary/20" },
];

export const PersonalBrandPreview = memo(function PersonalBrandPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/30 shadow-lg">
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <div className="p-5 sm:p-6">
        {/* Header with live badge */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">Personal Brand Builder</h3>
            <p className="text-xs text-muted-foreground">Your Digital CV</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-medium text-primary">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Profile Card Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            {/* Avatar placeholder */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                AR
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-foreground text-sm">{profile.name}</h4>
                <p className="text-xs text-primary">{profile.headline}</p>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {profile.bio}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="px-2 py-1 rounded-md bg-muted text-[10px] text-muted-foreground"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Links & Projects */}
          <div className="space-y-3">
            {/* Links */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <h5 className="text-xs font-semibold text-foreground mb-3">Links</h5>
              <div className="space-y-2">
                {links.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs text-foreground">{link.label}</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <h5 className="text-xs font-semibold text-foreground mb-3">Projects</h5>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-lg ${project.color}`} />
                    <div>
                      <p className="text-xs font-medium text-foreground">{project.title}</p>
                      <p className="text-[10px] text-muted-foreground">{project.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});
