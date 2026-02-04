
import React from 'react';

interface CornerMarkerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CornerMarker: React.FC<CornerMarkerProps> = ({ position }) => {
  // For an 8px size (size-2), the ideal offset to center in the corner is -4px
  const positionClasses = {
    'top-left': '-top-[4px] -left-[4px]',
    'top-right': '-top-[4px] -right-[4px]',
    'bottom-left': '-bottom-[4px] -left-[4px]',
    'bottom-right': '-bottom-[4px] -right-[4px]',
  };

  return (
    <div 
      className={`absolute z-10 size-2 rotate-45 rounded-[1px] border border-blue-200 dark:border-blue-300/20 bg-white dark:bg-black ${positionClasses[position]}`} 
    />
  );
};

export default CornerMarker;
