import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import { Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 text-primary/50">
            <Coffee size={48} />
          </div>
          <h1 className="font-serif text-6xl font-bold mb-4 text-foreground">404</h1>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Looks like this cup is empty. We couldn't find the page you're looking for.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
