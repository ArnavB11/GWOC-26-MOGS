import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';

const motion = motionBase as any;

const ManifestoSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.8", "end 0.2"] // Adjusted triggers: starts earlier, ends later
    });

    const words = [
        "WE", "ARE", "NOT", "FOR", "EVERYONE.",
        "WE", "ARE", "FOR", "THE", "AWAKE."
    ];

    return (
        <section ref={targetRef} className="bg-black text-[#F9F8F4] py-32 md:py-64 relative overflow-hidden flex items-center justify-center min-h-screen">
            {/* Background noise texture */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 justify-center">
                    {words.map((word, i) => {
                        const step = 1 / words.length;
                        const start = i * step * 0.8; // Compress range slightly
                        const end = start + step;

                        // Opacity varies based on scroll position
                        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                        // Add color shift for extra visibility logic
                        const color = useTransform(scrollYProgress, [start, end], ["#333333", "#FFFFFF"]);

                        return (
                            <motion.span
                                key={i}
                                style={{ opacity, color }}
                                className="text-5xl md:text-8xl lg:text-9xl font-serif italic font-bold tracking-tighter leading-none transition-colors duration-200"
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 uppercase tracking-[0.4em]">
                Scroll to Read
            </div>
        </section>
    );
};

export default ManifestoSection;
