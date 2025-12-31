import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const FlavorWave: React.FC = () => {
    // Generate bars for visualization
    const bars = Array.from({ length: 20 });
    const robustomBars = Array.from({ length: 40 });

    return (
        <section className="bg-[#F9F8F4] py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                {/* Text Content */}
                <div>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-zinc-400 mb-8"
                    >
                        The Frequency
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif italic text-[#1A1A1A] tracking-tighter leading-tight mb-8"
                    >
                        Turn up the volume.
                    </motion.h2>
                    <p className="text-sm text-zinc-600 max-w-md leading-relaxed uppercase tracking-widest mb-12">
                        Arabica plays a gentle melody. Robusta is a full-spectrum wall of sound. We embrace the noise—the heavy body, the crema, the raw intensity.
                    </p>

                    <div className="flex items-center space-x-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2 text-zinc-300">1.2%</div>
                            <div className="text-[9px] uppercase tracking-widest text-zinc-400">Standard Caffeine</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2 text-[#1A1A1A]">2.7%</div>
                            <div className="text-[9px] uppercase tracking-widest text-zinc-500">Robusta Caffeine</div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="relative h-64 md:h-96 bg-black rounded-lg p-8 flex flex-col justify-center items-center shadow-2xl">
                    <span className="absolute top-4 right-4 text-[9px] text-zinc-500 uppercase tracking-widest">Live Flavor Signal</span>

                    {/* Robusta Wave */}
                    <div className="flex items-end justify-center gap-1 h-32 w-full">
                        {robustomBars.map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-white rounded-t-sm"
                                animate={{
                                    height: [20, Math.random() * 100 + 20, 20]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.5 + Math.random() * 0.5,
                                    ease: "easeInOut",
                                    delay: Math.random() * 0.2
                                }}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold">Robusta Signal</div>

                    {/* Arabica Line (Flat) */}
                    <div className="mt-8 relative w-full opacity-30">
                        <div className="h-px bg-white w-full"></div>
                        <div className="text-center mt-2 text-zinc-400 text-[9px] uppercase tracking-widest">Standard Arabica</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlavorWave;
