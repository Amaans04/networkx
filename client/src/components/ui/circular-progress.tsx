import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CircularProgress = ({ 
  percentage, 
  size = 'md', 
  className = 'text-[#2A9D8F]' 
}: CircularProgressProps) => {
  // Size configurations
  const dimensions = {
    sm: { size: 40, strokeWidth: 3, fontSize: 'text-xs' },
    md: { size: 50, strokeWidth: 4, fontSize: 'text-sm' },
    lg: { size: 70, strokeWidth: 5, fontSize: 'text-base' },
  };

  const { size: circleSize, strokeWidth, fontSize } = dimensions[size];
  
  // Calculate circle properties
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        className={className}
      >
        {/* Background circle */}
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        
        {/* Progress circle */}
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
        />
      </svg>
      
      {/* Percentage text */}
      <div className={`absolute ${fontSize} font-bold`}>
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgress;