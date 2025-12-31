import React, { useState, useRef, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { CoffeeItem } from '../types';
import { useDataContext, ArtAdminItem } from '../DataContext';

// Fix for framer-motion type mismatch in the current environment
const motion = motionBase as any;

// Define props for ArtPage
interface ArtPageProps {
  onAddToCart: (item: CoffeeItem) => void;
}

import ParallaxHero from './ParallaxHero';

// ...

const ArtPage: React.FC<ArtPageProps> = ({ onAddToCart }) => {
  const { artItems } = useDataContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = (art: ArtAdminItem) => {
    // Treat Art as a CoffeeItem for the cart (shared structure)
    // Note: In a real app, we might distinguish types more clearly
    onAddToCart({
      id: art.id,
      name: art.title,
      notes: art.artist,
      caffeine: 'N/A',
      intensity: 0,
      image: art.image,
      price: art.price,
      description: `Art piece by ${art.artist}`
    });

    setToastMessage(`${art.title} added to collection`);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] pb-40">
      <ParallaxHero
        title="The Canvas."
        subtitle="The Micro Gallery"
        height="50vh"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-20 md:mt-32">
        <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <p className="max-w-md text-[10px] md:text-xs font-sans text-zinc-400 uppercase tracking-widest leading-relaxed italic">
            "A curated sanctuary for the emerging. Every piece is selected to mirror the intensity of our brew."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {artItems.map((art, idx) => {
            const isAvailable = art.stock > 0;
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.1)"
                }}
                className="group cursor-default perspective-1000"
              >
                {/* ... (keep card content same, maybe refine padding) ... */}
                <div className="aspect-[3/4] overflow-hidden mb-6 relative bg-zinc-100 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl">
                  <img
                    src={art.image}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isAvailable ? 'grayscale-0' : 'grayscale'}`}
                    alt={art.title}
                  />
                  {/* ... tags ... */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className={`px-3 py-1 text-[8px] font-sans uppercase tracking-[0.2em] font-bold backdrop-blur-md ${isAvailable ? 'bg-white/90 text-black border border-black/5' : 'bg-red-500/90 text-white'}`}>
                      {isAvailable ? 'Available' : 'Sold Out'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-2xl md:text-3xl font-serif italic">{art.title}</h3>
                  <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-widest text-zinc-500">
                    <span>{art.artist}</span>
                    <span className="font-bold text-black border-b border-black">₹{art.price.toLocaleString()}</span>
                  </div>
                </div>

                {isAvailable && (
                  <button
                    onClick={() => handleAddToCart(art)}
                    className="w-full py-4 bg-white border border-black/10 hover:bg-black hover:text-white transition-all text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center space-x-3 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Collection</span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ... toast ... */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed top-8 left-1/2 z-50 bg-[#0a0a0a] text-[#F9F8F4] px-6 py-3 rounded-full text-xs uppercase tracking-[0.25em] shadow-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtPage;
