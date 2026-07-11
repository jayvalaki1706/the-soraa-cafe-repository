import { AppLayout } from "@/components/layout/AppLayout";
import { useGetGalleryPhotos } from "@workspace/api-client-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GalleryPhoto } from "@workspace/api-client-react/src/generated/api.schemas";

export default function Gallery() {
  const { data: photos, isLoading } = useGetGalleryPhotos();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!photos) return;
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!photos) return;
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : null));
  };

  return (
    <AppLayout>
      <section className="bg-card py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Gallery</h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto">
            A glimpse into the life, the food, and the warmth of The Soraa Cafe.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background min-h-[50vh]">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`bg-muted animate-pulse rounded-lg break-inside-avoid ${i % 2 === 0 ? 'h-64' : 'h-96'}`} />
              ))}
            </div>
          ) : photos && photos.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg break-inside-avoid cursor-pointer bg-card border border-border"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <Maximize2 className="text-background mb-4" size={32} />
                    <h3 className="text-background font-serif font-bold text-xl mb-2">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-background/80 text-sm">{photo.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground text-lg">Our gallery is currently being curated. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && photos && photos[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-background/70 hover:text-background transition-colors p-2 z-50"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={36} />
            </button>

            {photos.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/30 transition-colors z-50"
                  onClick={prevPhoto}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/30 transition-colors z-50"
                  onClick={nextPhoto}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div 
              className="relative max-w-5xl w-full max-h-[85vh] px-4 md:px-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={photos[selectedPhotoIndex].imageUrl}
                alt={photos[selectedPhotoIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-sm shadow-2xl"
              />
              <div className="mt-6 text-center text-background">
                <h3 className="font-serif text-2xl font-bold mb-2">{photos[selectedPhotoIndex].title}</h3>
                {photos[selectedPhotoIndex].description && (
                  <p className="text-background/70">{photos[selectedPhotoIndex].description}</p>
                )}
                <p className="text-background/40 text-sm mt-4 tracking-widest">
                  {selectedPhotoIndex + 1} / {photos.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
