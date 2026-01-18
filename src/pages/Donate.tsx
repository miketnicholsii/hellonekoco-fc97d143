// src/pages/Donate.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { EccentricNavbar } from "@/components/EccentricNavbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nekoConfig } from "@/lib/neko-config";
import { supabase } from "@/integrations/supabase/client";
import { Heart, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const presetAmounts = [10, 25, 50, 100, 250];

export default function Donate() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    setCustomAmount(numValue);
    setSelectedAmount(null);
  };

  const getFinalAmount = (): number => {
    if (customAmount) {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount || 0;
  };

  const handleDonate = async () => {
    const amount = getFinalAmount();
    
    if (amount < 1) {
      toast.error("Minimum donation is $1");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-donation", {
        body: { amount },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Donation error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <EccentricNavbar />

      {/* Hero */}
      <section 
        className="pt-36 sm:pt-44 pb-20 sm:pb-28 relative overflow-hidden noise-texture" 
        style={{ background: "linear-gradient(180deg, #334336 0%, #2a3a2d 100%)" }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229, 83, 10, 0.1) 0%, transparent 60%)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center" 
            variants={prefersReducedMotion ? undefined : containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)" }}
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>

            <motion.span 
              variants={itemVariants}
              className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#E5530A] mb-4"
            >
              Support Mental Health
            </motion.span>

            <motion.h1 
              variants={itemVariants} 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            >
              Make a difference.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/60 leading-relaxed"
            >
              {nekoConfig.brand.missionLine}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 sm:py-28" style={{ background: "#EDE7E3" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-lg mx-auto"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={cardVariants}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#C8BFB5]/30 shadow-lg"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight mb-2" style={{ color: "#334336" }}>
                Choose an amount
              </h2>
              <p className="text-sm text-[#334336]/60 mb-8">
                All donations support mental health nonprofits.
              </p>

              {/* Preset amounts */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                {presetAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`
                      relative py-4 px-2 rounded-xl font-display font-bold text-lg transition-all duration-200
                      ${selectedAmount === amount 
                        ? "bg-[#334336] text-white shadow-lg" 
                        : "bg-[#F5F2EF] text-[#334336] hover:bg-[#E5E0DB]"
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ${amount}
                    {selectedAmount === amount && (
                      <motion.div
                        layoutId="selectedAmount"
                        className="absolute inset-0 rounded-xl border-2 border-[#E5530A]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#334336]/70 mb-2">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#334336]/50 font-display font-bold">
                    $
                  </span>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8 py-6 text-lg font-display border-[#C8BFB5]/50 focus:border-[#E5530A] rounded-xl"
                  />
                </div>
              </div>

              {/* Submit button */}
              <Button
                onClick={handleDonate}
                disabled={isLoading || getFinalAmount() < 1}
                className="w-full group relative rounded-xl py-6 text-base font-semibold overflow-hidden disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #E5530A 0%, #C74A09 100%)" }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Donate ${getFinalAmount() || "—"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              <p className="text-xs text-center text-[#334336]/40 mt-6">
                Secure payment powered by Stripe. You'll be redirected to complete your donation.
              </p>
            </motion.div>

            {/* Info note */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className="text-sm text-[#334336]/50">
                Questions? <Link to="/contact" className="text-[#E5530A] hover:underline">Get in touch</Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
