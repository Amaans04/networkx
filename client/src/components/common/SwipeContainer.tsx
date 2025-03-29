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
  const scale = useTransform(x, [-250, 0, 250], [0.85, 1, 0.85]);
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
      "rgba(220, 53, 69, 0.1)",
      "rgba(220, 53, 69, 0.05)",
      "rgba(255, 255, 255, 1)",
      "rgba(40, 167, 69, 0.05)",
      "rgba(40, 167, 69, 0.1)"
    ]
  );

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
    <motion.div
      className={`${className} w-full`}
      style={{
        x,
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
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 py-3 opacity-0 swipe-overlay">
        <div className="bg-red-500 bg-opacity-80 text-white rounded-full p-2">
          <i className="ri-close-line text-xl"></i>
        </div>
        <div className="bg-green-500 bg-opacity-80 text-white rounded-full p-2">
          <i className="ri-check-line text-xl"></i>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeContainer;
