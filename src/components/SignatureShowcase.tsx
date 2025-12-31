import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';

const motion = motionBase as any;

const SignatureShowcase: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    const cards = [
        {
            id: 1,
            title: "The Vietnamese",
            subtitle: "Original Phin Brew",
            img: "/media/pic1.jpeg", // Using existing image for now
            desc: "Condensed milk meets pure Robusta power."
        },
        {
            id: 2,
            title: "Espresso Tonic",
            subtitle: "Citrus & Spark",
            img: "/media/pic2.jpeg", // Using existing image for now
            desc: "A bright collision of bitter and sweet."
        },
        {
            id: 3,
            title: "Dark Matter",
            subtitle: "Obsidian Roast",
            img: "/media/menu-placeholder.jpg",
            desc: "The deepest, darkest expression of the bean."
        },
        {
            id: 4,
            title: "Cold Brew",
            subtitle: "18 Hour Steep",
            img: "/media/robusta-story2.jpg",
            desc: "Smooth, chocolatey, and dangerously caffeinated."
        }
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black text-[#F9F8F4]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20">
                    <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-6">Signature Series</p>
                        <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none mb-8">
                            Icons of <br /> Power.
                        </h2>
                        <p className="text-sm text-zinc-400 max-w-xs leading-relaxed uppercase tracking-widest">
                            Scroll to explore the drinks that define the Rabuste standard.
                        </p>
                    </div>

                    {cards.map((card) => (
                        <div key={card.id} className="group relative h-[70vh] w-[50vw] md:w-[35vw] flex-shrink-0 overflow-hidden bg-zinc-900 border border-white/10">
                            <motion.img
                                src={card.img}
                                alt={card.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                <span className="text-[10px] font-sans uppercase tracking-[0.3em] bg-white text-black px-3 py-1 mb-6 inline-block">
                                    {card.subtitle}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-serif italic mb-4">{card.title}</h3>
                                <p className="text-xs font-sans text-zinc-300 uppercase tracking-widest max-w-xs">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SignatureShowcase;
