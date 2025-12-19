import { Play, Plus, Star, Calendar, Clock } from "lucide-react";

function HeroSection() {
  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-neutral-900 to-neutral-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600')] bg-cover bg-center opacity-30" />
      </div>


      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl lg:max-w-3xl">

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 md:mb-6">
              <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                FEATURED
              </span>

              <div className="flex items-center gap-1 bg-neutral-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-neutral-200 text-xs sm:text-sm">
                  8.5/10
                </span>
              </div>

              <div className="flex items-center gap-1 bg-neutral-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-neutral-200 text-xs sm:text-sm">
                  2024
                </span>
              </div>

              <div className="flex items-center gap-1 bg-neutral-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span className="text-neutral-200 text-xs sm:text-sm">
                  2h 18m
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              The Last<br className="hidden sm:block" /> Odyssey
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 line-clamp-3 max-w-xl sm:max-w-2xl leading-relaxed">
              In a world where dreams become reality, a group of explorers must journey through dimensions to save humanity from eternal slumber. An epic adventure filled with mystery and wonder.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 md:px-8 py-3 rounded-lg flex items-center gap-2 transition-all text-sm sm:text-base font-medium flex-1 sm:flex-none justify-center min-w-[140px]">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Watch Trailer
              </button>

              <button className="bg-neutral-800/80 hover:bg-neutral-700/80 text-white px-4 sm:px-6 md:px-8 py-3 rounded-lg flex items-center gap-2 transition-all border border-neutral-700 text-sm sm:text-base font-medium flex-1 sm:flex-none justify-center min-w-[140px]">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to List
              </button>
            </div>

            <div className="mt-6 md:mt-8 flex flex-wrap gap-4 text-sm text-neutral-400">
              <div>
                <span className="block text-xs text-neutral-500 mb-1">GENRE</span>
                <span className="text-white">Action • Adventure • Sci-Fi</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-500 mb-1">STARRING</span>
                <span className="text-white">Chris Evans, Ana de Armas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-1.5 z-10">
        <button className="h-1.5 w-6 sm:w-8 bg-purple-500 rounded-full" />
        <button className="h-1.5 w-3 sm:w-4 bg-neutral-600 rounded-full" />
        <button className="h-1.5 w-3 sm:w-4 bg-neutral-600 rounded-full" />
        <button className="h-1.5 w-3 sm:w-4 bg-neutral-600 rounded-full" />
      </div>
    </div>
  );
}

export default HeroSection;