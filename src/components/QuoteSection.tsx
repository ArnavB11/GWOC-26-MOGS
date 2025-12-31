import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const QuoteSection: React.FC = () => {
    const quote = "Coffee is not a beverage. It is a moment of pause.";
    const words = quote.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <section className="bg-[#F9F8F4] py-32 md:py-48 px-6 text-center overflow-hidden relative">
            {/* Decorative background element */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03] pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                style={{
                    backgroundImage: 'url("/media/logo.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] md:text-xs font-sans uppercase tracking-[0.4em] md:tracking-[0.6em] text-zinc-400 mb-8 md:mb-12"
                >
                    Daily Philosophy
                </motion.p>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2"
                >
                    {words.map((word, index) => (
                        <motion.span
                            variants={child}
                            key={index}
                            className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default QuoteSection;
