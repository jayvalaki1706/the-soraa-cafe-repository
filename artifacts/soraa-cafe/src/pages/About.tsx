import { AppLayout } from "@/components/layout/AppLayout";
import { useGetAbout } from "@workspace/api-client-react";
import { MapPin, Phone, Mail, Clock, Coffee, Heart } from "lucide-react";
import aboutImg from "@assets/generated_images/about-cafe.jpg";

export default function About() {
  const { data: about, isLoading } = useGetAbout();

  return (
    <AppLayout>
      <section className="bg-card py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Our Story</h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto">
            More than just a cafe—we are a gathering place for the community, built on the love of good tea and great company.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <Coffee />
                  <span className="font-bold tracking-widest uppercase text-sm">The Beginning</span>
                </div>
                <h2 className="font-serif text-4xl font-bold text-foreground mb-6 leading-tight">
                  Crafting comfort in <br/>Nikol, Ahmedabad.
                </h2>
                
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-11/12"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-4/5"></div>
                  </div>
                ) : (
                  <div className="space-y-6 text-foreground/80 leading-relaxed font-light text-lg">
                    {about?.description.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    )) || (
                      <>
                        <p>The Soraa Cafe was born out of a simple desire: to create a space where time slows down. In a fast-paced world, we wanted to build a sanctuary that honors the timeless tradition of sharing a hot beverage with loved ones.</p>
                        <p>Our terracotta walls, rustic wooden furniture, and warm amber lighting were carefully chosen to evoke the feeling of a comforting hug. We believe that the environment is just as important as the menu.</p>
                        <p>Every kulhad of chai is brewed with spices ground fresh daily. Every dish is prepared with ingredients sourced from local markets. We aren't just serving food; we're serving moments of joy, relaxation, and connection.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <h4 className="font-bold text-2xl text-primary mb-1">5+</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Years Serving</p>
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-primary mb-1">10k+</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Kulhads Poured</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-lg -rotate-3 transform-gpu"></div>
              <div className="relative rounded-lg overflow-hidden border border-border shadow-xl">
                <img 
                  src={aboutImg} 
                  alt="Cafe Interior" 
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-lg shadow-lg hidden md:block max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg leading-tight mb-1">Handcrafted with care</h4>
                    <p className="text-xs text-muted-foreground">Every detail matters.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Visit Us</h2>
            <p className="text-background/70 font-light">We can't wait to welcome you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center mb-6 text-primary">
                <MapPin size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Location</h3>
              <p className="text-background/80 font-light leading-relaxed max-w-xs">
                {about?.address || "Nikol, Ahmedabad\nGujarat, India"}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center mb-6 text-primary">
                <Clock size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Hours</h3>
              <div className="space-y-2 text-background/80 font-light w-full max-w-xs">
                {about?.openingHours?.map((oh, i) => (
                  <div key={i} className="flex justify-between border-b border-background/10 pb-2">
                    <span>{oh.day}</span>
                    <span>{oh.hours}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex justify-between border-b border-background/10 pb-2">
                      <span>Mon - Fri</span>
                      <span>8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-background/10 pb-2">
                      <span>Sat - Sun</span>
                      <span>9:00 AM - 11:00 PM</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border border-background/20 rounded-full flex items-center justify-center mb-6 text-primary">
                <Phone size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Contact</h3>
              <p className="text-background/80 font-light leading-relaxed mb-2">
                {about?.phone || "+91 98765 43210"}
              </p>
              <p className="text-background/80 font-light leading-relaxed">
                {about?.email || "hello@soraacafe.com"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
