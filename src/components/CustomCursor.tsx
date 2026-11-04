import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export type CursorMode = 'default' | 'hover' | 'drag' | 'view';

interface CustomCursorProps {
  mode: CursorMode;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high-end trailing effect
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touchscreen
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const getSize = () => {
    switch (mode) {
      case 'drag':
        return 48;
      case 'view':
        return 44;
      case 'hover':
        return 22; // Scaled down from 44px
      default:
        return 9; // Sleek resting dot
    }
  };

  const size = getSize();

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center font-display select-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: 1,
      }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          backgroundColor:
            mode === 'default'
              ? '#111111'
              : mode === 'hover'
              ? 'rgba(17, 17, 17, 0.35)'
              : mode === 'drag'
              ? '#E54838'
              : '#111111',
          borderWidth: mode === 'hover' ? '1.5px' : '0px',
          borderColor: mode === 'hover' ? '#111111' : 'transparent',
          color: '#ffffff',
          borderRadius: 9999,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 340 }}
        className="flex items-center justify-center shadow-sm backdrop-blur-xs"
      >
        {mode === 'drag' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-bold tracking-widest uppercase text-white"
          >
            DRAG
          </motion.span>
        )}
        {mode === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-bold tracking-widest uppercase text-white"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
