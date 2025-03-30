import React from 'react';

// Define size map for named sizes
const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 64
};

interface CircularProgressProps {
  value?: number;
  percentage?: number; // Backward compatibility
  size?: number | 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  maxValue?: number;
  color?: string;
  label?: React.ReactNode;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  percentage, // For backward compatibility
  size = 48,
  strokeWidth = 4,
  maxValue = 100,
  color = "#3b82f6",
  label,
  className = ""
}) => {
  // Handle string sizes
  const actualSize = typeof size === 'string' ? SIZE_MAP[size] : size;
  
  // Handle both value and percentage props (for backward compatibility)
  const normalizedValue = Math.min(Math.max(percentage !== undefined ? percentage : (value || 0), 0), maxValue);
  const percentageValue = (normalizedValue / maxValue) * 100;
  
  // Calculate circle properties
  const radius = (actualSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentageValue / 100) * circumference;
  
  return (
    <div className={`relative ${className}`} style={{ width: actualSize, height: actualSize }}>
      {/* Background circle */}
      <svg width={actualSize} height={actualSize} viewBox={`0 0 ${actualSize} ${actualSize}`} className="rotate-[-90deg]">
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Label in the center */}
      {(label || percentage !== undefined || value !== undefined) && (
        <div 
          className="absolute inset-0 flex items-center justify-center text-center"
          style={{ fontSize: `${actualSize / 5}px` }}
        >
          {label ? (
            typeof label === 'string' ? (
              <span className="font-medium">{label}</span>
            ) : (
              label
            )
          ) : (
            <span className="font-medium">{Math.round(normalizedValue)}%</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;