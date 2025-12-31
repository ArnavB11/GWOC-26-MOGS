import React from 'react';
import { motion as motionBase, useScroll, useSpring } from 'framer-motion';

const motion = motionBase as any;

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#0a0a0a] origin-left z-50 pointer-events-none"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
