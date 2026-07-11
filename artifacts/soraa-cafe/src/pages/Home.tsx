import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { useGetFeaturedMenuItems, useGetAbout } from "@workspace/api-client-react";
import { MenuItemCard } from "@/components/MenuItemCard";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Leaf, Users } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";
import aboutImg from "@assets/generated_images/about-cafe.jpg";

export default function Home() {
  const { data: featuredItems, isLoading: itemsLoading } = useGetFeaturedMenuItems();
  const { data: about, isLoading: aboutLoading } = useGetAbout();

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-foreground/60 z-10" />
          <img 
            src={heroBg} 
            alt="The Soraa Cafe ambience" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-background mb-6 drop-shadow-lg">
              {about?.name || "The Soraa Cafe"}
            </h1>
            <p className="text-xl md:text-2xl text-background/90 font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
              {about?.tagline || "Warmth in every cup. Earthy, unpretentious, deeply satisfying."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/menu" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                View Menu
              </Link>
              <Link 
                href="/gallery" 
                className="bg-background/10 backdrop-blur-sm border border-background/30 text-background px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-all"
              >
                Our Atmosphere
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-background/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-card px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex justify-center mb-6">
            <Coffee size={40} className="text-primary opacity-50" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-foreground">Welcome to your neighbourhood spot.</h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
            {about?.description?.split('\n')[0] || "We believe that the best conversations happen over a steaming cup of chai. Our clay kulhads carry not just tea, but the earthy warmth of our roots. Come in, slow down, and stay awhile."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            <div className="p-6 border border-border rounded-lg bg-background">
              <Coffee className="text-secondary w-10 h-10 mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Authentic Brews</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Handcrafted beverages made with freshly ground spices and premium beans.</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-background">
              <Leaf className="text-secondary w-10 h-10 mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Fresh Ingredients</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We source local, fresh ingredients to ensure every bite is as vibrant as it is satisfying.</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-background">
              <Users className="text-secondary w-10 h-10 mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Community First</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">A space designed for connections, study sessions, and family gatherings alike.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-secondary font-bold tracking-widest uppercase text-sm mb-2">Our Signatures</h4>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Featured Delights</h2>
            </div>
            <Link href="/menu" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:text-secondary transition-colors pb-1 border-b-2 border-primary/20 hover:border-secondary">
              View Full Menu <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {itemsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : featuredItems && featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.slice(0, 4).map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">Our featured items will be available shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image & Story Split */}
      <section className="bg-foreground text-background">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[500px] lg:h-auto w-full relative">
            <img 
              src={aboutImg} 
              alt="Inside Soraa Cafe" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <h4 className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">Our Story</h4>
            <h2 className="font-serif text-4xl font-bold mb-6 leading-tight">Rooted in Nikol,<br/>Brewed with Love.</h2>
            <p className="text-background/80 text-lg leading-relaxed mb-8 font-light">
              We started The Soraa Cafe to create a space that feels like an extension of your own living room. The aroma of spices, the warmth of terracotta, and the hum of quiet conversations—it's an experience meant to be savored slowly.
            </p>
            <div>
              <Link href="/about" className="inline-block border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest transition-all">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
