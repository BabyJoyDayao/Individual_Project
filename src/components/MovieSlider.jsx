import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MovieSlider({ movies }) {
  const sliderRef = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [cardWidth, setCardWidth] = useState(140);

  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 640) setCardWidth(140);
      else if (width < 768) setCardWidth(160);
      else if (width < 1024) setCardWidth(180);
      else setCardWidth(200);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (!current) return;

    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const checkScroll = () => {
      const slider = sliderRef.current;
      if (slider) {
        const hasScroll = slider.scrollWidth > slider.clientWidth;
        setShowControls(hasScroll);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [movies]);

  return (
    <section className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-3 sm:px-4">
  
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Featured Movies
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              With streaming links available
            </p>
          </div>


          {showControls && (
            <div className="flex items-center gap-1 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => scroll("left")}
                className="p-1.5 sm:p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-1.5 sm:p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 sm:pb-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900"
            style={{ 
              scrollbarWidth: 'thin',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {movies.length > 0 ? (
              movies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (

              [...Array(10)].map((_, index) => (
                <div 
                  key={index}
                  className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] snap-start"
                >
                  <div className="rounded-lg overflow-hidden bg-neutral-800 aspect-[2/3] animate-pulse"></div>
                </div>
              ))
            )}
          </div>


          {showControls && movies.length > 0 && (
            <div className="flex justify-center gap-1.5 mt-3 sm:mt-4">
              {[...Array(Math.min(5, Math.ceil(movies.length / 2)))].map((_, i) => (
                <div
                  key={i}
                  className="h-1 w-3 sm:w-4 bg-neutral-700 rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieSlider;