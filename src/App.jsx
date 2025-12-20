import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieContent from "./components/MovieContent";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("active_session");
    return saved ? JSON.parse(saved) : null;
  });


  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("app_movies");
    return saved ? JSON.parse(saved) : [];
  });

 
  useEffect(() => {
    localStorage.setItem("app_movies", JSON.stringify(movies));
  }, [movies]);

  
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("active_session", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("active_session");
  };

  const addMovie = (movie) => {
    setMovies(prev => [...prev, movie]);
  };

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const updateMovie = (updatedMovie) => {
    setMovies(prev => 
      prev.map(m => (m.id === updatedMovie.id ? updatedMovie : m))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white selection:bg-purple-500/30">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          
          <main className="flex-grow pt-16 md:pt-20">
             <MovieContent 
                user={user} 
                movies={movies} 
                addMovie={addMovie} 
                deleteMovie={deleteMovie} 
                updateMovie={updateMovie} 
             />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;