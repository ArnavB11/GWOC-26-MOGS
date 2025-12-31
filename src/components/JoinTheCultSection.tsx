import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const motion = motionBase as any;

const JoinTheCultSection: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Welcome to the awakening.");
        setEmail('');
    };

    return (
        <section className="bg-white text-black py-32 md:py-48 px-6 border-t border-black/10">
            <div className="max-w-5xl mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-zinc-500 mb-8"
                >
                    No Decaf. No Compromise.
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-none mb-16"
                >
                    JOIN THE <br /> CULT.
                </motion.h2>

                <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER YOUR EMAIL"
                        className="w-full bg-transparent border-b-2 border-black py-4 text-center text-sm md:text-base font-sans uppercase tracking-[0.2em] outline-none placeholder:text-zinc-300 focus:border-red-600 transition-colors"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-red-600 transition-colors"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </form>

                <p className="mt-8 text-[9px] text-zinc-400 uppercase tracking-widest">
                    Get access to limited drops, secret menu items, and brewing workshops.
                </p>
            </div>
        </section>
    );
};

export default JoinTheCultSection;
