import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useInView } from 'framer-motion';

const motion = motionBase as any;

const roastLevels = [
    {
        title: "LIGHT",
        desc: "High acidity, tea-like body. Not us.",
        color: "#D4B996"
    },
    {
        title: "MEDIUM",
        desc: "Balanced, smooth, safe. Still not us.",
        color: "#8C6A4B"
    },
    {
        title: "DARK",
        desc: "Bold, chocolatey, intense. Getting closer.",
        color: "#4A3728"
    },
    {
        title: "RABUSTE",
        desc: "Beyond dark. Pure crema, zero compromise.",
        color: "#000000"
    }
];

const RoastSpectrum: React.FC = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-[#F9F8F4] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif italic mb-4 tracking-tight"
                >
                    The Spectrum.
                </motion.h2>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-500">
                    We only exist at one end.
                </p>
            </div>

            <div className="flex flex-col md:flex-row h-[60vh] md:h-[50vh]">
                {roastLevels.map((level, index) => (
                    <motion.div
                        key={level.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1 relative group md:hover:flex-[1.5] transition-all duration-700 ease-out border-b md:border-b-0 md:border-r border-black/5 last:border-0"
                    >
                        <div
                            className="absolute inset-0 transition-colors duration-500"
                            style={{ backgroundColor: level.color }}
                        />

                        {/* Overlay for text readability on dark colors */}
                        <div className={`absolute inset-0 ${index > 1 ? 'bg-black/10' : 'bg-transparent'}`} />

                        <div className="relative h-full flex flex-row md:flex-col justify-between p-6 md:p-10 z-10">
                            <div>
                                <span className={`text-[10px] font-mono mb-2 block ${index === 3 ? 'text-white/50' : 'text-black/50'}`}>
                                    0{index + 1}
                                </span>
                                <h3 className={`text-2xl md:text-4xl font-bold uppercase tracking-tighter ${index === 3 ? 'text-white' : 'text-black'}`}>
                                    {level.title}
                                </h3>
                            </div>

                            <motion.div
                                className="self-end md:self-auto"
                            >
                                <p className={`text-[10px] md:text-xs font-sans uppercase tracking-widest max-w-[150px] md:max-w-none text-right md:text-left ${index === 3 ? 'text-zinc-400' : 'text-black/60'}`}>
                                    {level.desc}
                                </p>
                            </motion.div>
                        </div>

                        {/* Interactive Visual Element */}
                        {index === 3 && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                                {/* Simple smoke-like particle effect could go here */}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RoastSpectrum;
