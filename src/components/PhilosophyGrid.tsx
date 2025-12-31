import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const items = [
    {
        id: 1,
        title: "BOLD",
        description: "Not for the faint of heart. High caffeine, low acidity.",
        bg: "bg-[#111]"
    },
    {
        id: 2,
        title: "PURE",
        description: "Single origin Coorg Robusta. No blends, no filler.",
        bg: "bg-[#161616]"
    },
    {
        id: 3,
        title: "DARK",
        description: "Roasted to the edge of darkness for maximum body.",
        bg: "bg-[#1a1a1a]"
    },
    {
        id: 4,
        title: "AWAKE",
        description: "Fuel for the creators, the night owls, and the driven.",
        bg: "bg-[#0a0a0a]"
    }
];

const PhilosophyGrid: React.FC = () => {
    return (
        <section className="bg-black text-[#F9F8F4] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[50vh]">
                {items.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={`${item.bg} group relative border border-white/5 p-8 md:p-12 flex flex-col justify-between hover:bg-white hover:text-black transition-colors duration-500 cursor-default`}
                    >
                        <div className="mb-12">
                            <span className="text-[10px] font-mono opacity-50 block mb-4">0{item.id}</span>
                            <h3 className="text-4xl md:text-5xl font-serif italic tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative overflow-hidden">
                            <p className="text-xs md:text-sm font-sans uppercase tracking-widest leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300 max-w-[200px]">
                                {item.description}
                            </p>

                            {/* Animated line on hover */}
                            <motion.div
                                className="h-[1px] bg-black mt-6 w-0 group-hover:w-full transition-all duration-700 ease-out"
                            />
                        </div>

                        {/* Background texture on hover could go here */}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PhilosophyGrid;
