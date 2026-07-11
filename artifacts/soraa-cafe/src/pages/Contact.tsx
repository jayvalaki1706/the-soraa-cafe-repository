import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useSubmitContact, useGetAbout } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { data: about } = useGetAbout();
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll get back to you soon.",
        });
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      },
      onError: (error) => {
        toast({
          title: "Failed to send message",
          description: error.error || "An unexpected error occurred. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <AppLayout>
      <section className="bg-card py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto">
            Have a question, feedback, or want to book a table for a large group? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <MapPin />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Our Address</h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {about?.address || "The Soraa Cafe\nNear City Square\nNikol, Ahmedabad 382350"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Phone />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone</h4>
                      <p className="text-muted-foreground">
                        {about?.phone || "+91 98765 43210"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Mail />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <p className="text-muted-foreground">
                        {about?.email || "hello@soraacafe.com"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-card border border-border rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-4">Event Bookings</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Looking to host a gathering, birthday party, or a workshop? Our space is available for private events.
                </p>
                <a href={`mailto:${about?.email || 'events@soraacafe.com'}`} className="text-primary font-bold uppercase tracking-wider text-sm hover:underline flex items-center gap-2">
                  Inquire Now <Send size={14} />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border p-8 md:p-12 rounded-xl shadow-lg">
                <h2 className="font-serif text-3xl font-bold mb-2">Send a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll reply as soon as possible.</p>
                
                {isSuccess ? (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={28} className="-ml-1" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. We will get back to you shortly.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-primary font-bold uppercase tracking-wider text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-background border-border h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" className="bg-background border-border h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+91 98765 43210" className="bg-background border-border h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Your Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="bg-background border-border min-h-[150px] resize-y" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full bg-primary text-primary-foreground h-14 rounded-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </form>
                  </Form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </AppLayout>
  );
}
