import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const ProcessCard = ({ title, image, number, description }: { title: string; image: string; number: string; description: string }) => (
    <motion.div
        className="relative group h-[500px] overflow-hidden bg-black"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
    >
        <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute top-8 left-8 text-white/40 text-[10px] font-sans font-bold tracking-widest border border-white/20 px-3 py-1 rounded-full">
            PHASE {number}
        </div>

        <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-3xl font-serif italic mb-4">{title}</h3>
            <p className="text-xs font-sans tracking-wide text-zinc-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed">
                {description}
            </p>
        </div>
    </motion.div>
);

const ProcessGrid: React.FC = () => {
    return (
        <section className="bg-[#0a0a0a] border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Using existing assets or placeholders which will gracefully fallback or can be updated */}
                <ProcessCard
                    title="The Sourcing"
                    image="/media/pic1.jpeg"
                    number="01"
                    description="We bypass middlemen to source directly from high-altitude Robusta estates in Coorg, ensuring maximum caffeine retention and bold flavor profiles."
                />
                <ProcessCard
                    title="The Roast"
                    image="/media/pic3.jpeg"
                    number="02"
                    description="Roasted in small batches to an Italian Dark profile, unlocking the signature chocolate and earthy notes that define true Robusta."
                />
                <ProcessCard
                    title="The Extraction"
                    image="/media/pic2.jpeg"
                    number="03"
                    description="High pressure extraction pulls a thick, golden crema that stands the test of time. Every shot is a statement of intent."
                />
            </div>
            {/* Fix for middle card image path override just in case - let's actually just use pic3 for middle to vary it */}
        </section>
    );
};

export default ProcessGrid;
