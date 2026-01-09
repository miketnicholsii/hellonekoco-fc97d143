import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Download, Instagram, Linkedin, Image, FileImage, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface BrandAsset {
  id: string;
  name: string;
  description: string;
  filename: string;
  category: "social" | "template" | "background";
  dimensions: string;
}

const brandAssets: BrandAsset[] = [
  {
    id: "instagram-logo",
    name: "Instagram Logo Post",
    description: "Square NÈKO branded logo for Instagram feed",
    filename: "neko-instagram-logo.png",
    category: "social",
    dimensions: "1080×1080",
  },
  {
    id: "profile-thumbnail",
    name: "Profile Thumbnail",
    description: "Profile picture for Instagram and social platforms",
    filename: "neko-profile-thumbnail.png",
    category: "social",
    dimensions: "512×512",
  },
  {
    id: "linkedin-banner",
    name: "LinkedIn Banner",
    description: "Professional cover banner for LinkedIn profiles",
    filename: "neko-linkedin-banner.png",
    category: "social",
    dimensions: "1920×512",
  },
  {
    id: "instagram-story",
    name: "Instagram Story Template",
    description: "Vertical story template with NÈKO branding",
    filename: "neko-instagram-story.png",
    category: "template",
    dimensions: "1080×1920",
  },
  {
    id: "quote-card",
    name: "Quote Card",
    description: "Build Your Business Foundation motivational post",
    filename: "neko-quote-card-1.png",
    category: "template",
    dimensions: "1080×1080",
  },
  {
    id: "tagline-post",
    name: "Tagline Post",
    description: "Structure. Education. Clarity. branded graphic",
    filename: "neko-tagline-post.png",
    category: "template",
    dimensions: "1080×1080",
  },
  {
    id: "carousel-cover",
    name: "Carousel Cover",
    description: "Your Business Journey starts here cover slide",
    filename: "neko-carousel-cover.png",
    category: "template",
    dimensions: "1080×1080",
  },
  {
    id: "pattern-bg",
    name: "Pattern Background",
    description: "Abstract teal mesh pattern for social posts",
    filename: "neko-pattern-bg.png",
    category: "background",
    dimensions: "1080×1080",
  },
  {
    id: "announcement",
    name: "Announcement Template",
    description: "Coming Soon neon glow announcement graphic",
    filename: "neko-announcement.png",
    category: "template",
    dimensions: "1080×1080",
  },
  {
    id: "testimonial-card",
    name: "Testimonial Card",
    description: "Customer review quote card template",
    filename: "neko-testimonial-card.png",
    category: "template",
    dimensions: "1080×1080",
  },
  {
    id: "tip-card",
    name: "Business Tip Card",
    description: "Educational tip card with lightbulb graphic",
    filename: "neko-tip-card.png",
    category: "template",
    dimensions: "1080×1080",
  },
  {
    id: "welcome-post",
    name: "Welcome Post",
    description: "Hello, NÈKO. welcome graphic",
    filename: "neko-welcome-post.png",
    category: "social",
    dimensions: "1080×1080",
  },
];

const categoryLabels = {
  social: "Social Media",
  template: "Templates",
  background: "Backgrounds",
};

const categoryIcons = {
  social: Instagram,
  template: FileImage,
  background: Image,
};

export default function Brand() {
  const [filter, setFilter] = useState<"all" | "social" | "template" | "background">("all");

  const filteredAssets = filter === "all" 
    ? brandAssets 
    : brandAssets.filter(asset => asset.category === filter);

  const handleDownload = (asset: BrandAsset) => {
    const link = document.createElement("a");
    link.href = `/brand-assets/${asset.filename}`;
    link.download = asset.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    brandAssets.forEach((asset, index) => {
      setTimeout(() => {
        handleDownload(asset);
      }, index * 300);
    });
  };

  return (
    <>
      <Helmet>
        <title>Brand Assets | NÈKO</title>
        <meta name="description" content="Download official NÈKO brand assets for social media, including Instagram posts, LinkedIn banners, and branded templates." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              Brand Kit
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
              NÈKO Brand Assets
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Download official branded graphics for your social media presence. 
              All assets match the helloneko.co color scheme.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <a
                href="https://www.instagram.com/thehelloneko"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                @thehelloneko
              </a>
              <a
                href="https://www.linkedin.com/company/helloneko"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077B5] text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Linkedin className="w-5 h-5" />
                NÈKO on LinkedIn
              </a>
            </div>

            <Button onClick={handleDownloadAll} size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download All Assets
            </Button>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Assets
            </Button>
            {(["social", "template", "background"] as const).map((cat) => {
              const Icon = categoryIcons[cat];
              return (
                <Button
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(cat)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {categoryLabels[cat]}
                </Button>
              );
            })}
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAssets.map((asset, index) => {
              const CategoryIcon = categoryIcons[asset.category];
              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
                    <div className="aspect-square relative overflow-hidden bg-tertiary">
                      <img
                        src={`/brand-assets/${asset.filename}`}
                        alt={asset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Button
                        size="sm"
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1"
                        onClick={() => handleDownload(asset)}
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{asset.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {categoryLabels[asset.category]}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {asset.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        {asset.dimensions}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Usage Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>These assets are provided for official NÈKO brand representation.</p>
                <p>Please maintain brand consistency when using these materials.</p>
                <p>For custom requests, contact us at <a href="mailto:neko@helloneko.co" className="text-primary hover:underline">neko@helloneko.co</a></p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
