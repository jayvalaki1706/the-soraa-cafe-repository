import { Link } from "wouter";
import { useGetAbout } from "@workspace/api-client-react";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  const { data: about } = useGetAbout();

  return (
    <footer className="bg-foreground text-background pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary">The Soraa Cafe</h3>
            <p className="text-background/80 text-sm leading-relaxed max-w-xs">
              {about?.tagline || "A warm, neighbourhood cafe in Nikol, Ahmedabad."}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors text-background">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-background">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-background/70 hover:text-primary transition-colors text-sm uppercase tracking-wider">Home</Link></li>
              <li><Link href="/menu" className="text-background/70 hover:text-primary transition-colors text-sm uppercase tracking-wider">Our Menu</Link></li>
              <li><Link href="/gallery" className="text-background/70 hover:text-primary transition-colors text-sm uppercase tracking-wider">Gallery</Link></li>
              <li><Link href="/about" className="text-background/70 hover:text-primary transition-colors text-sm uppercase tracking-wider">About Us</Link></li>
              <li><Link href="/contact" className="text-background/70 hover:text-primary transition-colors text-sm uppercase tracking-wider">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-background">Visit Us</h4>
            <ul className="space-y-4 text-sm text-background/80">
              <li className="flex gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>{about?.address || "Nikol, Ahmedabad"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>{about?.phone || "+91 98765 43210"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>{about?.email || "hello@soraacafe.com"}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-background">Opening Hours</h4>
            <ul className="space-y-3 text-sm text-background/80">
              {about?.openingHours?.map((oh, i) => (
                <li key={i} className="flex items-center justify-between border-b border-background/10 pb-2">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {oh.day}</span>
                  <span>{oh.hours}</span>
                </li>
              )) || (
                <>
                  <li className="flex items-center justify-between border-b border-background/10 pb-2">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> Monday - Friday</span>
                    <span>8:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-background/10 pb-2">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> Saturday - Sunday</span>
                    <span>9:00 AM - 11:00 PM</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-background/10 text-xs text-background/50">
          <p>&copy; {new Date().getFullYear()} The Soraa Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
