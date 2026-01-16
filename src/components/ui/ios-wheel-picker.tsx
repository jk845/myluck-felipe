import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface IOSWheelPickerProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  step?: number;
  className?: string;
  'aria-label'?: string;
}

const IOSWheelPicker: React.FC<IOSWheelPickerProps> = ({
  min,
  max,
  value,
  onChange,
  suffix = "",
  step = 1,
  className,
  'aria-label': ariaLabel
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const lastScrollTop = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number>();
  // const [isTouching, setIsTouching] = useState(false);
  
  const itemHeight = 44;
  const visibleItems = 5;

  const items = useMemo(() => {
    const result: number[] = [];
    for (let i = min; i <= max; i += step) {
      result.push(i);
    }
    return result;
  }, [min, max, step]);
  
  // iOS-optimized momentum scrolling
  const momentumScroll = useCallback(() => {
    if (!containerRef.current || Math.abs(velocity.current) < 0.5) {
      // Snap to nearest value when momentum stops
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const index = Math.round(scrollTop / itemHeight);
        const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
        const targetScroll = clampedIndex * itemHeight;
        
        containerRef.current.scrollTop = targetScroll;
        const newValue = items[clampedIndex];
        if (newValue !== value) {
          onChange(newValue);
        }
      }
      return;
    }
    
    // Apply friction
    velocity.current *= 0.95;
    
    if (containerRef.current) {
      containerRef.current.scrollTop += velocity.current;
      rafId.current = requestAnimationFrame(momentumScroll);
    }
  }, [items, value, onChange, itemHeight]);
  
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const currentScrollTop = container.scrollTop;
    
    // Calculate velocity
    velocity.current = currentScrollTop - lastScrollTop.current;
    lastScrollTop.current = currentScrollTop;
    
    setIsScrolling(true);
    
    // Update value immediately during scroll
    const index = Math.round(currentScrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    const newValue = items[clampedIndex];
    if (newValue !== value) {
      onChange(newValue);
    }
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      // Snap to nearest value
      const finalIndex = Math.round(container.scrollTop / itemHeight);
      const finalClampedIndex = Math.max(0, Math.min(finalIndex, items.length - 1));
      const targetScroll = finalClampedIndex * itemHeight;
      container.scrollTop = targetScroll;
    }, 150);
  }, [items, value, onChange, itemHeight]);
  
  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      const currentIndex = items.indexOf(value);
      if (currentIndex !== -1) {
        containerRef.current.scrollTop = currentIndex * itemHeight;
      }
    }
  }, [value, items, isScrolling, itemHeight]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Use passive event listener for better performance
      container.addEventListener('scroll', handleScroll, { passive: true });
      
      // iOS-specific optimizations
      (container.style as React.CSSProperties & { webkitOverflowScrolling?: string }).webkitOverflowScrolling = 'touch';
      container.style.willChange = 'scroll-position';
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }
  }, [handleScroll]);
  
  const handleItemClick = (clickedValue: number) => {
    onChange(clickedValue);
    const index = items.indexOf(clickedValue);
    if (containerRef.current && index !== -1) {
      // Disable smooth scrolling for immediate response
      containerRef.current.scrollTop = index * itemHeight;
    }
  };
  
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden select-none touch-manipulation",
        className
      )}
      role="listbox"
      aria-label={ariaLabel}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      // onTouchStart={() => setIsTouching(true)}
      // onTouchEnd={() => setIsTouching(false)}
    >
      <div 
        className="relative"
        style={{ 
          height: `${itemHeight * visibleItems}px`,
          // Force GPU acceleration
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-scroll ios-wheel-picker"
          style={{
            paddingTop: `${itemHeight * Math.floor(visibleItems / 2)}px`,
            paddingBottom: `${itemHeight * Math.floor(visibleItems / 2)}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // iOS scroll optimization
            WebkitOverflowScrolling: 'touch',
            // Smooth scrolling but not too smooth
            scrollBehavior: 'auto'
          } as React.CSSProperties}
        >
          {items.map((item) => {
            const isSelected = item === value;
            const currentIndex = items.indexOf(value);
            const distance = Math.abs(items.indexOf(item) - currentIndex);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.4 : 0.2;
            
            return (
              <div
                key={item}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleItemClick(item)}
                className="flex items-center justify-center transition-opacity duration-150"
                style={{
                  height: `${itemHeight}px`,
                  opacity,
                  transform: isSelected ? 'scale(1.15)' : 'scale(0.9)',
                  // Force layer creation for better performance
                  willChange: 'transform, opacity',
                  // Disable text selection on iOS
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none'
                }}
              >
                <span className={cn(
                  "font-semibold transition-colors duration-150",
                  isSelected ? "text-xl text-gray-900" : "text-base text-gray-400"
                )}>
                  {item}
                </span>
                {suffix && isSelected && (
                  <span className="ml-1 text-sm font-medium text-gray-600">
                    {suffix}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Selection indicator */}
        <div 
          className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-11 rounded-lg border border-fuchsia-300/50 bg-fuchsia-50/20 pointer-events-none"
          style={{
            // Force layer creation
            transform: 'translateY(-50%) translateZ(0)',
            willChange: 'transform'
          }}
        />
        
        {/* Gradients with better performance */}
        <div 
          className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, white 0%, white 25%, transparent 100%)',
            willChange: 'opacity'
          }}
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, white 0%, white 25%, transparent 100%)',
            willChange: 'opacity'
          }}
        />
      </div>
      
    </div>
  );
};

export default IOSWheelPicker;