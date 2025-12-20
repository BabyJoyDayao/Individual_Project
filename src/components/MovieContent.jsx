import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import HeroSection from "./HeroSection";
import { 
  Play, X, ExternalLink, Film, Calendar, 
  Globe, Info, Plus, Trash2, Search, 
  Tv, Monitor, CheckCircle, Edit3
} from "lucide-react";

function MovieContent({ user, movies, addMovie, deleteMovie, updateMovie }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [links, setLinks] = useState([{ name: "Server 1", url: "" }]);
  const initialForm = {
    title: "", poster: "", trailer: "", 
    description: "", year: "2024", country: "", 
    genre: "Action", status: "Released", type: "Movie"
  };
  const [form, setForm] = useState(initialForm);

  const handleAddLinkField = () =>
  setLinks([...links, { name: `Server ${links.length + 1}`, url: "" }]);

  const handleRemoveLinkField = (index) => setLinks(links.filter((_, i) => i !== index));
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const handleEditClick = (movie) => {
    setIsEditing(true);
    setEditId(movie.id);
    setForm({
      title: movie.title,
      poster: movie.poster,
      trailer: movie.trailer,
      description: movie.description,
      year: movie.year,
      country: movie.country,
      genre: movie.genre,
      status: movie.status,
      type: movie.type
    });
    setLinks(movie.streamingLinks || [{ name: "Server 1", url: "" }]);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const resetForm = () => {
    setForm(initialForm);
    setLinks([{ name: "Server 1", url: "" }]);
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.poster) return alert("Required: Title and Poster URL");

    const movieData = { ...form, streamingLinks: links };

    if (isEditing) {
      updateMovie({ ...movieData, id: editId });
      alert("Content Updated Successfully!");
    } else {
      addMovie({ ...movieData, id: Date.now() });
      alert("Database Updated Successfully!");
    }
    resetForm();
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {user.role === "admin" && (
          <div className={`bg-neutral-800/30 border ${isEditing ? 'border-yellow-500/40' : 'border-purple-500/20'} p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] mb-12 md:mb-16 backdrop-blur-sm transition-colors`}>
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                <div className={`w-1.5 md:w-2 h-6 md:h-8 ${isEditing ? 'bg-yellow-500' : 'bg-purple-600'} rounded-full`}></div>
                {isEditing ? "Edit Content" : "Add New Content"}
              </h2>
              {isEditing && (
                <button onClick={resetForm} className="text-xs bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-full font-bold transition-all">
                  Cancel Editing
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Content Title</label>
                  <input placeholder="e.g. The Batman" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-neutral-900 p-3 md:p-4 rounded-xl md:rounded-2xl outline-none border border-neutral-700 focus:border-purple-500 transition-all text-white text-sm md:text-base" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Primary Genre</label>
                  <select value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} className="w-full bg-neutral-900 p-3 md:p-4 rounded-xl md:rounded-2xl border border-neutral-700 text-white outline-none text-sm md:text-base">
                    {["Action", "Drama", "Comedy", "Thriller", "Romance", "Horror", "Sci-Fi", "Anime"].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Origin Country</label>
                  <input placeholder="USA, South Korea, etc." value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full bg-neutral-900 p-3 md:p-4 rounded-xl md:rounded-2xl border border-neutral-700 outline-none text-sm md:text-base" />
                </div>
              </div>

              <div className="bg-neutral-950/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-neutral-800 space-y-4 md:space-y-5">
                <p className="text-[10px] md:text-xs font-black text-purple-500 uppercase tracking-widest">Media Assets</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <input placeholder="Poster Image URL" value={form.poster} onChange={e => setForm({...form, poster: e.target.value})} className="bg-neutral-900 p-3 md:p-4 rounded-lg md:rounded-xl border border-neutral-800 text-xs md:text-sm outline-none focus:border-purple-600" required />
                  <input placeholder="YouTube Trailer ID" value={form.trailer} onChange={e => setForm({...form, trailer: e.target.value})} className="bg-neutral-900 p-3 md:p-4 rounded-lg md:rounded-xl border border-neutral-800 text-xs md:text-sm outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-2">Synopsis / Description</label>
                  <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-neutral-900 p-3 md:p-4 rounded-xl border border-neutral-800 text-xs md:text-sm outline-none resize-none" placeholder="Enter movie description..." />
                </div>
              </div>

              <div className="bg-purple-900/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-purple-500/10 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <p className="text-[10px] md:text-xs font-black text-purple-400 uppercase tracking-widest">Streaming Links</p>
                  <button type="button" onClick={handleAddLinkField} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-bold hover:bg-purple-700 transition-all">
                    <Plus className="w-3 h-3 md:w-4 md:h-4"/> Add Another Server
                  </button>
                </div>
                {links.map((link, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 animate-in slide-in-from-left-2 duration-300">
                    <input placeholder="Server Name" value={link.name} onChange={e => handleLinkChange(index, "name", e.target.value)} className="sm:w-1/4 bg-neutral-900 p-3 rounded-lg md:rounded-xl border border-neutral-800 text-xs md:text-sm" />
                    <input placeholder="URL" value={link.url} onChange={e => handleLinkChange(index, "url", e.target.value)} className="flex-1 bg-neutral-900 p-3 rounded-lg md:rounded-xl border border-neutral-800 text-xs md:text-sm" />
                    {links.length > 1 && (
                      <button type="button" onClick={() => handleRemoveLinkField(index)} className="bg-red-500/10 text-red-500 p-3 rounded-lg md:rounded-xl hover:bg-red-500 hover:text-white transition-all self-end sm:self-auto"><Trash2 className="w-4 h-4 md:w-5 md:h-5"/></button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="bg-neutral-900 p-3 md:p-4 rounded-xl md:rounded-2xl border border-neutral-700 text-sm">
                  <option>Movie</option><option>TV Series</option><option>Web Drama</option>
                </select>
                <input placeholder="Year" type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="bg-neutral-900 p-3 md:p-4 rounded-xl md:rounded-2xl border border-neutral-700 text-sm" />
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="bg-neutral-900 p-3 md:p-4 rounded-xl md:rounded-2xl border border-neutral-700 text-sm">
                  <option>Released</option><option>Ongoing</option><option>Upcoming</option>
                </select>
                <button type="submit" className={`p-3 md:p-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl active:scale-95 transition-all ${isEditing ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-900/20'}`}>
                  {isEditing ? "Update Content" : "Publish Content"}
                </button>
              </div>
            </form>
          </div>
        )}

      
        <div className="flex items-center gap-4 bg-neutral-800/50 p-2 pl-4 md:pl-6 rounded-full border border-neutral-700 max-w-2xl mx-auto mb-10 md:mb-16 focus-within:border-purple-500 transition-all">
          <Search className="text-neutral-500 w-4 h-4 md:w-5 md:h-5 flex-shrink-0"/>
          <input placeholder="Search movies..." className="bg-transparent flex-1 py-2 md:py-3 outline-none text-xs md:text-base text-white" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} onClick={setSelectedMovie} />
                {user.role === "admin" && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditClick(movie); }}
                      className="bg-yellow-500 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-xl hover:scale-110 transition-transform"
                    >
                      <Edit3 className="w-3 h-3 md:w-4 md:h-4 text-black"/>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteMovie(movie.id); }}
                      className="bg-red-600 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-xl hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-white"/>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-30 italic text-sm md:text-base">No content found...</div>
        )}
      </div>

  
      {selectedMovie && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedMovie(null)} />
          <div className="bg-neutral-900 w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2rem] relative z-10 border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-300 scrollbar-hide">
            <button onClick={() => setSelectedMovie(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-neutral-800/80 rounded-full hover:bg-neutral-700 text-white z-20 transition-all">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 p-5 md:p-12">
              <div className="lg:col-span-4 space-y-4 md:space-y-6">
                <img src={selectedMovie.poster} className="w-full max-w-[300px] lg:max-w-none mx-auto rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/5" alt={selectedMovie.title} />
                {selectedMovie.trailer && (
                   <a href={selectedMovie.trailer} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold border border-neutral-700 transition-all text-sm md:text-base">
                     <Play className="w-3 h-3 md:w-4 md:h-4"/> Watch Trailer
                   </a>
                )}
              </div>
              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <span className="bg-purple-600/20 text-purple-400 text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">{selectedMovie.type}</span>
                    <span className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-400"><CheckCircle className="w-3 h-3 text-green-500"/> {selectedMovie.status}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6">{selectedMovie.title}</h2>
                  <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-neutral-400 border-y border-neutral-800 py-4 md:py-6">
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500"/> {selectedMovie.year}</div>
                    <div className="flex items-center gap-2"><Film className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500"/> {selectedMovie.genre}</div>
                    <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500"/> {selectedMovie.country || "International"}</div>
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h4 className="flex items-center gap-2 font-black text-base md:text-lg text-white"><Info className="w-4 h-4 md:w-5 md:h-5 text-purple-500" /> Description</h4>
                  <p className="text-neutral-400 text-sm md:text-lg leading-relaxed">{selectedMovie.description || "The explorers find themselves in a race against time."}</p>
                </div>
                <div className="space-y-4 pt-4 md:pt-6">
                  <h4 className="font-black text-lg md:text-xl flex items-center gap-2"><Monitor className="w-5 h-5 md:w-6 md:h-6 text-purple-500"/> Where to Watch</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {selectedMovie.streamingLinks?.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-neutral-800/50 hover:bg-purple-600 p-4 md:p-5 rounded-xl md:rounded-2xl border border-neutral-800 hover:border-purple-400 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="bg-neutral-900 group-hover:bg-purple-700 p-1.5 md:p-2 rounded-lg"><Tv className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400 group-hover:text-white"/></div>
                          <span className="font-bold text-xs md:text-sm text-neutral-200 group-hover:text-white">{link.name || `Server ${idx+1}`}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-600 group-hover:text-white"/>
                      </a>
                    ))}
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

export default MovieContent