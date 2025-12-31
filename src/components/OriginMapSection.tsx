import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const OriginMapSection: React.FC = () => {
    return (
        <section className="bg-[#0a0a0a] text-[#F9F8F4] py-40 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6"
                >
                    The Source
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-7xl font-serif italic tracking-tighter"
                >
                    Two Worlds. <br /> One Strength.
                </motion.h2>
            </div>

            {/* Stylized Abstract Map Container */}
            <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] border border-white/5 bg-zinc-900/30 rounded-full md:rounded-3xl flex items-center justify-center overflow-hidden">

                {/* Visible Abstract Map Shape (SVG) */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Abstract Land Masses */}
                    <path d="M100 150 C 150 100, 250 100, 300 200 C 350 300, 200 400, 100 350 Z" fill="#333" />
                    <path d="M500 100 C 550 50, 650 50, 700 150 C 750 250, 600 350, 500 300 Z" fill="#333" />
                </svg>

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #666 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                {/* Coorg Node - Adjusted Position */}
                <div className="absolute top-[45%] left-[30%] group cursor-pointer">
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] blur-[2px]"
                    />
                    <div className="w-6 h-6 bg-white rounded-full absolute top-0 left-0" />
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center opacity-100 transition-opacity duration-300 w-32">
                        <div className="text-[12px] uppercase tracking-widest font-bold">Coorg, India</div>
                        <div className="text-[9px] text-zinc-400">Canopy Grown • 3500ft</div>
                    </div>
                </div>

                {/* Vietnam Node - Adjusted Position */}
                <div className="absolute top-[40%] left-[70%] group cursor-pointer">
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                        className="w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,1)] blur-[2px]"
                    />
                    <div className="w-6 h-6 bg-red-600 rounded-full absolute top-0 left-0" />
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center opacity-100 transition-opacity duration-300 w-32">
                        <div className="text-[12px] uppercase tracking-widest font-bold">Dak Lak, Vietnam</div>
                        <div className="text-[9px] text-zinc-400">Volcanic Soil • Intense</div>
                    </div>
                </div>

                {/* Connection Line */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full">
                    <motion.path
                        d="M 31% 47% Q 50% 30% 71% 42%"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="8 8"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </svg>
            </div>
        </section>
    );
};

export default OriginMapSection;
