import { MenuItem } from "@workspace/api-client-react/src/generated/api.schemas";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="group flex flex-col h-full bg-card border border-card-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {item.imageUrl && (
        <div className="w-full h-48 overflow-hidden relative">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {item.isPopular && (
            <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold uppercase px-2 py-1 rounded-sm shadow-sm">
              Popular
            </div>
          )}
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <span className="font-bold text-primary whitespace-nowrap">₹{item.price}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div 
            className={`w-3 h-3 rounded-full border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}
            title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.categoryName}</span>
        </div>
        
        <p className="text-sm text-foreground/70 leading-relaxed flex-grow">
          {item.description || "A delightful treat prepared with our signature touch."}
        </p>
      </div>
    </div>
  );
}
