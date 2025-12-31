import React, { useEffect, useState } from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show custom cursor on desktops (simple check)
        // We can also check matchMedia('(pointer: fine)')
        const isDesktop = window.matchMedia('(pointer: fine)').matches;
        if (!isDesktop) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target is clickable/interactive
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black z-[100] pointer-events-none mix-blend-difference"
                style={{
                    x: position.x - 16,
                    y: position.y - 16,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "white" : "transparent"
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
            />
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full z-[100] pointer-events-none mix-blend-difference"
                style={{
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px)`
                }}
            />
        </>
    );
};

export default CustomCursor;
