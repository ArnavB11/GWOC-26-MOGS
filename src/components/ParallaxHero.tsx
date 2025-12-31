import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';

const motion = motionBase as any;

interface ParallaxHeroProps {
    title: string;
    subtitle: string;
    image?: string;
    height?: string;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ title, subtitle, image, height = "60vh" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // If no image, use default page background (transparent/light) and dark text
    const containerClasses = image
        ? "bg-black text-[#F9F8F4]"
        : "bg-transparent text-[#1A1A1A]";

    const subtitleClasses = image
        ? "text-zinc-300"
        : "text-zinc-400";

    return (
        <div
            ref={ref}
            className={`relative w-full overflow-hidden flex items-center justify-center ${containerClasses}`}
            style={{ height }}
        >
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y }}
            >
                {image && (
                    <>
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </>
                )}
            </motion.div>

            <motion.div
                className="relative z-10 text-center px-6 max-w-4xl mx-auto"
                style={{ y: textY }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-6 font-sans ${subtitleClasses}`}
                >
                    {subtitle}
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif italic tracking-tighter leading-none"
                >
                    {title}
                </motion.h1>
            </motion.div>
        </div>
    );
};

export default ParallaxHero;
