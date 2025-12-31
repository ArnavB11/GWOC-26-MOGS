import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';

const motion = motionBase as any;

const methods = [
    {
        id: 'phin',
        label: 'The Phin',
        title: 'Slow Drip Patience',
        description: 'The traditional Vietnamese method. Gravity pulls water through the grounds slowly, resulting in a brew that is thick, intense, and perfect for condensed milk.',
        image: '/media/brew-phin.jpg'
    },
    {
        id: 'espresso',
        label: 'The Machine',
        title: '9 Bars of Pressure',
        description: 'Where Robusta truly shines. The high pressure extracts the oils to create a crema so thick you can eat it with a spoon.',
        image: '/media/brew-espresso.jpg'
    },
    {
        id: 'coldbrew',
        label: 'The Steep',
        title: '18 Hour Immersion',
        description: 'Time replaces heat. We steep coarse grounds in cold water for 18+ hours to extract the deep chocolate notes without the acidity.',
        image: '/media/brew-coldbrew.jpg'
    }
];

const BrewGuideSection: React.FC = () => {
    const [activeMethod, setActiveMethod] = useState(methods[0]);

    return (
        <section className="bg-[#F9F8F4] py-32 relative overflow-hidden min-h-[80vh] flex items-center">
            {/* Split Background */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-zinc-100">
                {/* Placeholder for dynamic image if we had real paths, using gray for now */}
                <motion.div
                    key={activeMethod.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full bg-cover bg-center opacity-20 grep"
                    style={{ backgroundImage: `url(${activeMethod.image})`, backgroundColor: '#e5e5e5' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left: Controls */}
                <div className="flex flex-col justify-center">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-400 mb-12"
                    >
                        Extraction Methods
                    </motion.p>

                    <div className="flex flex-col items-start space-y-6">
                        {methods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setActiveMethod(method)}
                                className={`text-3xl md:text-5xl font-serif italic transition-all duration-300 ${activeMethod.id === method.id ? 'text-[#1A1A1A] translate-x-4' : 'text-zinc-300 hover:text-zinc-400'}`}
                            >
                                {method.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeMethod.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-6 text-[#1A1A1A]">
                                {activeMethod.title}
                            </h3>
                            <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                                {activeMethod.description}
                            </p>

                            <div className="mt-10 w-16 h-1 bg-[#1A1A1A]" />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default BrewGuideSection;
