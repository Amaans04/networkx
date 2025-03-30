import { useState, ReactNode, CSSProperties } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";

interface SwipeContainerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  style?: CSSProperties;
}

const SwipeContainer = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight,
  className = "",
  style = {}
}: SwipeContainerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  const scale = useTransform(x, [-250, 0, 250], [0.95, 1, 0.95]);
  const boxShadow = useTransform(
    x,
    [-250, -150, 0, 150, 250],
    [
      "0 10px 20px rgba(220, 53, 69, 0.3)",
      "0 10px 20px rgba(220, 53, 69, 0.2)",
      "0 4px 20px rgba(0, 0, 0, 0.08)",
      "0 10px 20px rgba(40, 167, 69, 0.2)",
      "0 10px 20px rgba(40, 167, 69, 0.3)"
    ]
  );
  
  const background = useTransform(
    x,
    [-250, -150, 0, 150, 250],
    [
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)"
    ]
  );

  // Swipe indicator elements
  const leftOpacity = useTransform(x, [-100, -50, 0], [1, 0, 0]);
  const rightOpacity = useTransform(x, [0, 50, 100], [0, 0, 1]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = 100;
    
    if (info.offset.x < -threshold) {
      // Swiped left
      onSwipeLeft && onSwipeLeft();
    } else if (info.offset.x > threshold) {
      // Swiped right
      onSwipeRight && onSwipeRight();
    } else {
      // Return to center
      x.set(0);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className={`${className} w-full relative`}
        style={{
          x,
          rotate,
          scale,
          boxShadow,
          background,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "pan-y",
          ...style
        }}
        drag="x"
        dragElastic={0.7}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {children}
        
        {/* Swipe Indicators */}
        <motion.div 
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-red-500 bg-opacity-90 text-white rounded-full p-3" 
          style={{ opacity: leftOpacity }}
        >
          <i className="ri-close-line text-xl"></i>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-green-500 bg-opacity-90 text-white rounded-full p-3" 
          style={{ opacity: rightOpacity }}
        >
          <i className="ri-heart-line text-xl"></i>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SwipeContainer;
