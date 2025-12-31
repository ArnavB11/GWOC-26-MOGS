import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const MarqueeSection: React.FC = () => {
    const marqueeText = "STRONG AS DEATH • SWEET AS LOVE • RABUSTE • INTENTIONAL COFFEE • PURE ROBUSTA • ";

    return (
        <section className="bg-black text-[#F9F8F4] py-4 md:py-6 overflow-hidden border-t border-b border-white/10 relative z-20">
            <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear"
                    }}
                >
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-xl md:text-3xl font-serif uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold italic opacity-80 mr-8 md:mr-16">
                            {marqueeText}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MarqueeSection;
