import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Page } from '../types';

// Decorative Icons
const CoffeeBeanIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 4c2.76 0 5 2.24 5 5 0 2.8-2.5 7.15-5 10.74C9.5 16.15 7 11.8 7 9c0-2.76 2.24-5 5-5z" />
        <path d="M10.5 7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S10.5 11 10.5 14s2 3 2 3-3-1.5-3-5 .67-1.5 1.5-1.5z" />
    </svg>
);

const CoffeeCupIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.5 4H5.5C4.67 4 4 4.67 4 5.5V13c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6V5.5c0-.83-.67-1.5-1.5-1.5zM18 13c0 2.21-1.79 4-4 4h-4c-2.21 0-4-1.79-4-4V6h12v7z" />
        <path d="M21 7h-1v7c0 1.1-.9 2-2 2v2c2.21 0 4-1.79 4-4V7z" />
        <path d="M8 2h2v3H8zm4 0h2v3h-2zm4 0h2v3h-2z" />
    </svg>
);

const StarIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
);

interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative py-20 ${className}`}
        >
            {children}
        </motion.section>
    );
};

interface AwarenessPageProps {
    onNavigate: (page: Page) => void;
}

const AwarenessPage: React.FC<AwarenessPageProps> = ({ onNavigate }) => {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div className="bg-[#F9F8F4] text-[#1A1A1A] overflow-hidden font-sans selection:bg-black selection:text-[#F9F8F4] relative">

            {/* Decorative Background Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 flex flex-wrap gap-16 p-8 justify-center items-center overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="transform rotate-45">
                        {i % 3 === 0 ? <CoffeeBeanIcon className="w-12 h-12" /> :
                            i % 3 === 1 ? <CoffeeCupIcon className="w-12 h-12" /> :
                                <StarIcon className="w-8 h-8" />}
                    </div>
                ))}
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#1A1A1A] origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 pt-32 pb-12">

                {/* Hero Section - Editorial Sandwich */}
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="flex flex-col items-center justify-center mb-32 relative"
                >
                    {/* Top Text */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-[0.9] text-black relative z-10 text-center"
                    >
                        More Than
                    </motion.h1>



                    {/* Bottom Text */}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-[0.9] text-black relative z-10 text-center"
                    >
                        A Buzz.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-12 flex flex-col items-center gap-4"
                    >
                        <div className="flex gap-4">
                            <StarIcon className="w-4 h-4 text-zinc-400" />
                            <StarIcon className="w-4 h-4 text-zinc-400" />
                            <StarIcon className="w-4 h-4 text-zinc-400" />
                        </div>
                        <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-[0.3em] font-medium border-b border-zinc-200 pb-2">
                            Discipline meets Decadence
                        </p>
                    </motion.div>
                </motion.div>


                {/* SECTION 1: The Name */}
                <Section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center border border-[#1A1A1A]/5 p-10 md:p-16 hover:border-[#1A1A1A]/20 transition-colors duration-500 bg-white/50 backdrop-blur-sm">
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-6 text-black">
                            The Name: <span className="underline decoration-1 underline-offset-8 decoration-zinc-300">Rabuste</span>
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12 bg-black" />
                            <CoffeeBeanIcon className="w-5 h-5 text-black" />
                            <div className="h-px w-12 bg-black" />
                        </div>
                        <p className="text-base md:text-xl text-zinc-800 leading-relaxed font-light">
                            A deliberate distortion of <span className="font-semibold text-black">Robusta</span>.
                            While others softened coffee into comfort, we leaned into the power.
                            <span className="block mt-6 text-zinc-400 text-sm uppercase tracking-widest font-medium">
                                Intensity is not to be diluted.
                            </span>
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border border-black p-3 animate-[spin_10s_linear_infinite]">
                            <div className="w-full h-full border border-dashed border-zinc-400 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-serif italic text-4xl md:text-5xl">R</span>
                            </div>
                        </div>
                    </div>
                </Section>


                {/* Decorative Divider */}
                <div className="flex justify-center py-16">
                    <div className="w-px h-24 bg-zinc-300" />
                </div>


                {/* SECTION 2: The Sourcing */}
                <Section className="relative pt-12">

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5">
                            <div className="aspect-[4/5] relative p-1 border border-zinc-200 mt-6 md:mt-0">
                                <img
                                    src="/media/rabuste1.jpeg"
                                    alt="Source"
                                    className="w-full h-full object-cover contrast-125"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-7 md:pl-10 space-y-8">
                            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold">
                                <CoffeeBeanIcon className="w-4 h-4" />
                                <span>The Sourcing</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif italic leading-none text-black">
                                Why Only <br />Robusta?
                            </h2>
                            <p className="text-zinc-800 text-lg md:text-xl font-light leading-relaxed max-w-lg text-balance">
                                For decades, the coffee industry has sidelined Robusta, dismissing it as the inferior sibling to Arabica. We exist to reclaim the bean the world ignored. Robusta is not just stronger; it is resilient, bold, and unapologetic. It provides <span className="font-medium bg-zinc-100 px-2">twice the caffeine</span> and a richer antioxidant load, delivering a cup that doesn't just wake you up—it commands your attention.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-6">
                                <div className="bg-white p-6 border border-zinc-100 text-center shadow-sm">
                                    <span className="block text-2xl md:text-3xl font-serif italic text-black">2x</span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Caffeine</span>
                                </div>
                                <div className="bg-white p-6 border border-zinc-100 text-center shadow-sm">
                                    <span className="block text-2xl md:text-3xl font-serif italic text-black">High</span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Altitude</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onNavigate(Page.ROBUSTA_STORY)}
                                className="mt-6 text-xs uppercase tracking-[0.25em] border-b border-black pb-2 hover:text-zinc-600 transition-colors font-bold"
                            >
                                Read The Deep Dive
                            </button>
                        </div>
                    </div>
                </Section>


                {/* Decorative Divider */}
                <div className="flex justify-center py-20 gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                </div>


                {/* SECTION 3: The Visionary */}
                <Section className="bg-white p-10 md:p-16 border border-[#1A1A1A]/5 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-8 order-2 md:order-1">
                            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold mb-6">
                                <CoffeeCupIcon className="w-4 h-4" />
                                <span>The Visionary</span>
                            </div>
                            <blockquote className="text-3xl md:text-5xl font-serif italic leading-tight text-black mb-8">
                                "We didn't build Rabuste to compete with the coffee shop next door. We built it to compete with your comfort zone."
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-px bg-zinc-300" />
                                <cite className="not-italic text-sm uppercase tracking-widest text-zinc-500 font-semibold">
                                    Vaibhav Sutaria
                                </cite>
                            </div>
                        </div>
                        <div className="md:col-span-4 order-1 md:order-2">
                            <div className="aspect-square relative max-w-[240px] mx-auto">
                                <div className="absolute inset-0 border border-black translate-x-3 translate-y-3" />
                                <img
                                    src="/media/founder.jpeg"
                                    alt="Founder"
                                    className="w-full h-full object-cover relative z-10 border border-white"
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SECTION 3.5: The Story (New) */}
                <Section className="py-12 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-zinc-100 rounded-full opacity-50 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start relative z-10 font-serif border-y border-zinc-100 py-12">
                        <div className="text-right space-y-6 md:pr-12 md:border-r border-zinc-100 py-4">
                            <div className="flex items-center justify-end gap-3 mb-2">
                                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold">Est. 2024</span>
                                <StarIcon className="w-4 h-4 text-zinc-300" />
                            </div>
                            <h3 className="text-4xl md:text-5xl italic leading-none text-black">
                                The Genesis.
                            </h3>
                            <p className="text-zinc-800 text-sm md:text-base leading-relaxed font-sans text-balance font-medium">
                                The Rabuste journey began in 2024 with a clear and simple vision. Our founder, Vaibhav, saw something special in the Robusta coffee bean that many others ignored. While most shops focus only on Arabica, Vaibhav loved the strong, bold taste of Robusta and wanted to share its true quality with the world. He believed that if you treat this bean with care and respect, it creates a coffee experience that is full of flavor and character, perfect for those who want something real.
                            </p>
                        </div>

                        <div className="text-left space-y-6 md:pl-12 py-4">
                            <div className="flex items-center justify-start gap-3 mb-2">
                                <CoffeeCupIcon className="w-4 h-4 text-zinc-300" />
                                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold">Curated Space</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl italic leading-none text-black">
                                The Gallery.
                            </h3>
                            <p className="text-zinc-800 text-sm md:text-base leading-relaxed font-sans text-balance font-medium">
                                For us, a cafe is not just a place to drink coffee, but a place to feel inspired. Vaibhav has always had a deep love for art and creativity, and he wanted Rabuste to reflect that passion. This is why our space doubles as a living art gallery. We don't just hang pictures on the wall for decoration; we carefully choose meaningful pieces to share with you. When you visit us, you are stepping into a space where great coffee and beautiful art come together to spark your imagination.
                            </p>
                        </div>
                    </div>
                </Section>


                {/* SECTION 4: The Trifecta */}
                <Section className="mt-8 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-serif italic text-black mb-4">
                            The Trifecta.
                        </h2>
                        <div className="h-px w-24 bg-black mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Menu",
                                desc: "Explore our curated selection of high-grade Robusta brews, from classic espressos to experimental pours designed to awaken the senses.",
                                icon: <CoffeeBeanIcon className="w-10 h-10" />,
                                action: "View Menu",
                                target: Page.MENU
                            },
                            {
                                title: "Fine Art",
                                desc: "Immerse yourself in our living gallery spaces. We feature rotating collections from avant-garde artists that challenge perspective.",
                                icon: <StarIcon className="w-10 h-10" />,
                                action: "View Gallery",
                                target: Page.ART
                            },
                            {
                                title: "Workshops",
                                desc: "Join our sensory labs and masterclasses. Learn the science of extraction, latte art, and the history of the bean from our experts.",
                                icon: <CoffeeCupIcon className="w-10 h-10" />,
                                action: "Join Workshop",
                                target: Page.WORKSHOPS
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                className="bg-white p-10 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group h-full justify-between"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="mb-6 text-zinc-300 group-hover:text-black transition-colors transform group-hover:scale-110 duration-300">
                                        {i === 1 ? <StarIcon className="w-12 h-12" /> : item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-widest mb-4 text-black">{item.title}</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed mb-8 max-w-xs">
                                        {item.desc}
                                    </p>
                                </div>

                                <button
                                    onClick={() => onNavigate(item.target)}
                                    className="px-6 py-3 bg-zinc-50 text-black text-[10px] uppercase tracking-[0.25em] font-bold border border-zinc-200 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                >
                                    {item.action}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* Footer - Spacing Reduced */}
                <div className="mt-12 text-center border-t border-zinc-200 pt-6 flex flex-col items-center gap-4">
                    <CoffeeBeanIcon className="w-5 h-5 text-zinc-300" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-300">Rabuste © 2026</p>
                </div>

            </div>
        </div>
    );
};

export default AwarenessPage;