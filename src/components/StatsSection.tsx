import React, { useEffect, useState } from 'react';
import { motion as motionBase, useInView } from 'framer-motion';

const motion = motionBase as any;

const Counter = ({ from, to, duration, label }: { from: number; to: number; duration: number; label: string }) => {
    const [count, setCount] = useState(from);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let startTime: number;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                setCount(Math.floor(progress * (to - from) + from));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [isInView, from, to, duration]);

    return (
        <div ref={ref} className="text-center group">
            <div className="text-5xl md:text-7xl font-sans font-bold text-[#0a0a0a] mb-4">
                {count}{label.includes('Percentage') ? '%' : (label.includes('Caffeine') ? 'x' : '+')}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-black transition-colors">
                {label}
            </div>
        </div>
    );
};

const StatsSection: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-[#F9F8F4] px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
                <Counter from={0} to={100} duration={2} label="Robusta Purity Percentage" />
                <Counter from={0} to={2} duration={2.5} label="Caffeine Load" />
                <Counter from={0} to={18} duration={2} label="Hours Cold Brewed" />
            </div>
        </section>
    );
};

export default StatsSection;
