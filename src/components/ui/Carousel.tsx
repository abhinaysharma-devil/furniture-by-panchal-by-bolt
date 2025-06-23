import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  imgPath: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  interval = 3000,
  showControls = true,
  showIndicators = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, [slides.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let timer: number;
    
    if (autoPlay && !isHovering) {
      timer = window.setTimeout(goToNext, interval);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [currentIndex, autoPlay, interval, isHovering, goToNext]);

  if (!slides.length) return null;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.imgPath}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {(slide.title || slide.description) && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-8 max-w-3xl">
                  {slide.title && (
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">
                      {slide.title}
                    </h2>
                  )}
                  {slide.description && (
                    <p className="text-base sm:text-lg opacity-90">
                      {slide.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Controls */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;