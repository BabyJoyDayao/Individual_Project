import React from "react";

function GenreSection() {
  return (
    <section className="py-12 bg-neutral-900/50">
      <div className="container mx-auto px-4">

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Browse by Genre
        </h2>

     
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            <button className="px-4 py-2 rounded-md bg-neutral-700 text-sm text-white">
              Genre Name
            </button>
          </div>
        </div>

        <div className="h-64 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden bg-neutral-800 aspect-[2/3]">
              <img
                src=""
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-all"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 text-sm">
                    ⭐ Movie Rating
                  </span>
                  <span className="text-neutral-400 text-xs">
                    Release Date
                  </span>
                </div>

                <button className="mt-2 bg-purple-600 text-white text-sm px-3 py-1 rounded">
                  View Details
                </button>
              </div>
            </div>

            <h3 className="text-white text-sm mt-2 truncate">
              Movie Title
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}

export default GenreSection;