import React from "react";
import { Play, Layers } from "lucide-react";

function MovieCard({ movie, onClick }) {
  const linkCount = movie.streamingLinks?.filter(l => l.url).length || 0;

  return (
    <div 
      className="relative overflow-hidden rounded-2xl bg-neutral-800 group transition-all duration-500 hover:scale-105 border border-neutral-800 hover:border-purple-500/50 cursor-pointer shadow-lg"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] relative">
        <img 
          src={movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={movie.title} 
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-purple-600 p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-white text-white" />
          </div>
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-2 py-1 bg-purple-600 text-[10px] font-black rounded shadow-md uppercase tracking-tighter">
            {movie.type}
          </span>
          {linkCount > 0 && (
            <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-purple-400 text-[10px] font-bold rounded flex items-center gap-1 border border-white/10">
              <Layers className="w-3 h-3"/> {linkCount} LINKS
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 px-2 py-1 bg-neutral-900/80 backdrop-blur-md text-[9px] font-bold rounded text-neutral-300 border border-white/5">
          {movie.status}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-sm truncate group-hover:text-purple-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[11px] text-neutral-500 font-medium">{movie.year}</span>
          <span className="text-[11px] text-neutral-400 italic">
            {movie.genre}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;