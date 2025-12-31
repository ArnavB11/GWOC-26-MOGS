import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { CoffeeItem } from '../types';

// Fix for framer-motion type mismatch in the current environment
const motion = motionBase as any;

interface MenuPreviewProps {
  onAddToCart: (item: CoffeeItem) => void;
  onGoToMenu: () => void;
}

const items: CoffeeItem[] = [
  {
    id: 'robusta-cold-milk-vietnamese',
    name: "The Vietnamese",
    notes: "Condensed Milk & Robusta",
    caffeine: "High",
    intensity: 8,
    price: 240,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1974",
    description: "Our signature condensed milk brew."
  },
  {
    id: 'manual-brew-classic-cold-brew',
    name: "Classic Cold Brew",
    notes: "18 Hour Extraction",
    caffeine: "Very High",
    intensity: 7,
    price: 220,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1974",
    description: "Smooth, chocolatey, and potent."
  },
  {
    id: 'robusta-cold-milk-iced-latte',
    name: "Iced Latte",
    notes: "Creamy & Bold",
    caffeine: "Medium",
    intensity: 6,
    price: 220,
    image: "https://images.unsplash.com/photo-1497933321188-941f9ad36b12?auto=format&fit=crop&q=80&w=2069",
    description: "The classic daily driver."
  },
];

const MenuPreview: React.FC<MenuPreviewProps> = ({ onAddToCart, onGoToMenu }) => {
  return (
    <section className="bg-[#111] text-[#F3F3F3] py-40 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex justify-between items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.span
              variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8 } } }}
              className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-6 block font-sans"
            >
              Current Offerings
            </motion.span>
            <motion.h2
              variants={{ hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="text-6xl md:text-8xl font-serif tracking-tighter leading-none font-bold italic"
            >
              Curated <br /> Rituals.
            </motion.h2>
          </motion.div>
          <button
            onClick={onGoToMenu}
            className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-zinc-700 pb-2 hover:border-white transition-all hidden md:block"
          >
            Shop Full Catalog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-transparent">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="bg-[#F9F8F4] p-6 md:p-8 border border-black/5 hover:border-black/20 transition-colors shadow-sm cursor-pointer perspective-1000 flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden mb-8 relative">
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={item.name}
                />
              </div>

              <h3 className="text-3xl font-serif mb-2 italic text-[#1A1A1A]">{item.name}</h3>
              <p className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-8">{item.notes}</p>

              <div className="mt-auto">
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full py-5 border border-black/10 hover:bg-[#1A1A1A] hover:text-white transition-all text-[11px] uppercase tracking-[0.4em] font-bold text-[#1A1A1A]"
                >
                  Add to Cart — ₹{item.price}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <button
            onClick={onGoToMenu}
            className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-zinc-700 pb-2"
          >
            Shop Full Catalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
