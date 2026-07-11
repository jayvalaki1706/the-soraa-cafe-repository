import { AppLayout } from "@/components/layout/AppLayout";
import { MenuItemCard } from "@/components/MenuItemCard";
import { useGetMenuCategories, useGetMenuItems } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Menu() {
  const { data: categories, isLoading: categoriesLoading } = useGetMenuCategories();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Using the API's category filter parameter if available, but for search and instant client filtering we'll fetch all and filter client-side
  const { data: allItems, isLoading: itemsLoading } = useGetMenuItems();

  const filteredItems = useMemo(() => {
    if (!allItems) return [];
    let items = allItems;
    
    if (activeCategory !== "all") {
      items = items.filter(item => item.categoryId.toString() === activeCategory || item.categoryName.toLowerCase() === activeCategory.toLowerCase());
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    return items;
  }, [allItems, activeCategory, searchQuery]);

  return (
    <AppLayout>
      {/* Menu Header */}
      <section className="bg-card py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Our Menu</h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto">
            From classic kulhad chai to hearty bites, discover the comforting flavors of our kitchen.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-background min-h-[60vh]">
        <div className="container mx-auto">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  activeCategory === "all" 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                All Items
              </button>
              
              {categoriesLoading ? (
                <div className="flex gap-2">
                  <div className="w-24 h-10 bg-muted animate-pulse rounded-full" />
                  <div className="w-24 h-10 bg-muted animate-pulse rounded-full" />
                </div>
              ) : categories?.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id.toString())}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                    activeCategory === category.id.toString()
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {category.name} <span className="opacity-60 ml-1 font-normal">({category.itemCount})</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Search menu..." 
                className="pl-10 rounded-full border-border bg-card focus-visible:ring-primary h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Menu Grid */}
          {itemsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-24 bg-card rounded-lg border border-dashed border-border flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                <Search size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">No items found</h3>
              <p className="text-muted-foreground">We couldn't find any menu items matching your criteria.</p>
              <button 
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="mt-6 text-primary font-bold uppercase tracking-wider text-sm hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
