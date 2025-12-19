import React, { useState } from "react";
import MovieCard from "./MovieCard";
import HeroSection from "./HeroSection";
import { 
  Play, X, ExternalLink, Film, Calendar, 
  Globe, Info, Plus, Trash2, Search, 
  Tv, Monitor, CheckCircle 
} from "lucide-react";

function MovieContent({ user, movies, addMovie, deleteMovie }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [links, setLinks] = useState([{ name: "Server 1", url: "" }]);
  const initialForm = {
    title: "", poster: "", trailer: "", 
    description: "", year: "2024", country: "", 
    genre: "Action", status: "Released", type: "Movie"
  };
  const [form, setForm] = useState(initialForm);

  const handleAddLinkField = () => setLinks([...links, { name: `Server ${links.length + 1}`, url: "" }]);
  const handleRemoveLinkField = (index) => setLinks(links.filter((_, i) => i !== index));
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.poster) return alert("Required: Title and Poster URL");
    addMovie({ ...form, id: Date.now(), streamingLinks: links });
    setForm(initialForm);
    setLinks([{ name: "Server 1", url: "" }]);
    alert("Database Updated Successfully!");
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 mt-10">

        {user.role === "admin" && (
          <div className="bg-neutral-800/30 border border-purple-500/20 p-6 md:p-8 rounded-[2.5rem] mb-16 backdrop-blur-sm">
            <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
              <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
              Add New Content
            </h2>
            
            <form onSubmit={handleAdd} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Content Title</label>
                  <input placeholder="e.g. The Batman" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-neutral-900 p-4 rounded-2xl outline-none border border-neutral-700 focus:border-purple-500 transition-all text-white" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Primary Genre</label>
                  <select value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} className="w-full bg-neutral-900 p-4 rounded-2xl border border-neutral-700 text-white outline-none">
                    {["Action", "Drama", "Comedy", "Thriller", "Romance", "Horror", "Sci-Fi", "Anime"].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Origin Country</label>
                  <input placeholder="USA, South Korea, etc." value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full bg-neutral-900 p-4 rounded-2xl border border-neutral-700 outline-none" />
                </div>
              </div>

              <div className="bg-neutral-950/50 p-6 rounded-3xl border border-neutral-800 space-y-5">
                <p className="text-xs font-black text-purple-500 uppercase tracking-widest">Media Assets</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input placeholder="Poster Image URL (https://...)" value={form.poster} onChange={e => setForm({...form, poster: e.target.value})} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-sm outline-none focus:border-purple-600" required />
                  <input placeholder="YouTube Trailer ID or URL" value={form.trailer} onChange={e => setForm({...form, trailer: e.target.value})} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-sm outline-none" />
                </div>
              </div>

              <div className="bg-purple-900/5 p-6 rounded-3xl border border-purple-500/10 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-black text-purple-400 uppercase tracking-widest">Streaming Links Manager</p>
                  <button type="button" onClick={handleAddLinkField} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-purple-700 transition-all">
                    <Plus className="w-4 h-4"/> Add Another Server
                  </button>
                </div>
                {links.map((link, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-3 animate-in slide-in-from-left-2 duration-300">
                    <input placeholder="Server Name (e.g. HD Player)" value={link.name} onChange={e => handleLinkChange(index, "name", e.target.value)} className="md:w-1/4 bg-neutral-900 p-3 rounded-xl border border-neutral-800 text-sm" />
                    <input placeholder="Direct Stream/Embed URL" value={link.url} onChange={e => handleLinkChange(index, "url", e.target.value)} className="flex-1 bg-neutral-900 p-3 rounded-xl border border-neutral-800 text-sm" />
                    {links.length > 1 && (
                      <button type="button" onClick={() => handleRemoveLinkField(index)} className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5"/></button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-700">
                  <option>Movie</option><option>TV Series</option><option>Web Drama</option>
                </select>
                <input placeholder="Release Year" type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-700" />
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-700">
                  <option>Released</option><option>Ongoing</option><option>Upcoming</option>
                </select>
                <button type="submit" className="bg-purple-600 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-purple-700 shadow-xl shadow-purple-900/20 active:scale-95 transition-all">Publish Content</button>
              </div>
            </form>
          </div>
        )}

        <div className="flex items-center gap-4 bg-neutral-800/50 p-2 pl-6 rounded-full border border-neutral-700 max-w-2xl mx-auto mb-16 focus-within:border-purple-500 transition-all">
          <Search className="text-neutral-500 w-5 h-5"/>
          <input 
            placeholder="Search movies, series, or actors..." 
            className="bg-transparent flex-1 py-3 outline-none text-sm md:text-base"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} onClick={setSelectedMovie} />
                {user.role === "admin" && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteMovie(movie.id); }}
                    className="absolute top-2 right-2 bg-red-600 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 shadow-xl"
                  >
                    <Trash2 className="w-4 h-4 text-white"/>
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-30 italic">No content found matching your search...</div>
        )}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedMovie(null)} />
          
          <div className="bg-neutral-900 w-full max-w-5xl max-h-full overflow-y-auto rounded-[2rem] relative z-10 border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedMovie(null)} className="absolute top-6 right-6 p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 text-white z-20"><X /></button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 md:p-12">

              <div className="lg:col-span-4 space-y-6">
                <img src={selectedMovie.poster} className="w-full rounded-[2rem] shadow-2xl border border-white/5" alt={selectedMovie.title} />
                <div className="flex flex-col gap-3">
                   {selectedMovie.trailer && (
                     <a href={selectedMovie.trailer} target="_blank" className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 py-4 rounded-2xl font-bold border border-neutral-700 transition-all">
                       <Play className="w-4 h-4"/> Watch Trailer
                     </a>
                   )}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-purple-600/20 text-purple-400 text-[10px] font-black px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">
                      {selectedMovie.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                      <CheckCircle className="w-3 h-3 text-green-500"/> {selectedMovie.status}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">{selectedMovie.title}</h2>
                  
                  <div className="flex flex-wrap gap-6 text-sm text-neutral-400 border-y border-neutral-800 py-6">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-500"/> {selectedMovie.year}</div>
                    <div className="flex items-center gap-2"><Film className="w-4 h-4 text-purple-500"/> {selectedMovie.genre}</div>
                    <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-purple-500"/> {selectedMovie.country || "International"}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-black text-lg text-white">
                    <Info className="w-5 h-5 text-purple-500" /> Synopsis
                  </h4>
                  <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                    {selectedMovie.description || "The explorers find themselves in a race against time. An epic saga spanning generations where the only limit is your imagination."}
                  </p>
                </div>

                <div className="space-y-4 pt-6">
                  <h4 className="font-black text-xl flex items-center gap-2">
                    <Monitor className="w-6 h-6 text-purple-500"/> Where to Watch
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedMovie.streamingLinks?.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between bg-neutral-800/50 hover:bg-purple-600 p-5 rounded-2xl border border-neutral-800 hover:border-purple-400 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-neutral-900 group-hover:bg-purple-700 p-2 rounded-lg">
                            <Tv className="w-4 h-4 text-purple-400 group-hover:text-white"/>
                          </div>
                          <span className="font-bold text-neutral-200 group-hover:text-white">{link.name || `Server ${idx+1}`}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-white"/>
                      </a>
                    ))}
                    {(!selectedMovie.streamingLinks || selectedMovie.streamingLinks.length === 0) && (
                      <div className="col-span-2 p-10 border-2 border-dashed border-neutral-800 rounded-3xl text-center text-neutral-600 italic">
                        No streaming sources found for this title.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieContent;