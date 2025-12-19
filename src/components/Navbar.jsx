import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Search, User, Home, TrendingUp, Compass } from "lucide-react";

function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4" /> },
    { name: "Trending", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Explore", icon: <Compass className="w-4 h-4" /> },
    { name: "My List", icon: <User className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between">
         
          <a href="/" className="text-purple-500 font-bold text-xl sm:text-2xl md:text-3xl flex-shrink-0">
            Zomovies
          </a>

         
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 ml-4 flex-1 max-w-2xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="text-white hover:text-purple-400 transition font-medium text-sm lg:text-base px-3 lg:px-4 py-2 rounded-lg hover:bg-neutral-800/50 flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
            
            
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-white text-sm font-medium truncate max-w-[120px]">
                {user.email.split('@')[0]}
              </span>
              <span className="text-purple-400 text-xs">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
            
            <div className="sm:hidden">
              <span className="text-xs text-purple-400 px-2 py-1 bg-purple-400/10 rounded">
                {user.role.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <button
              onClick={onLogout}
              className="bg-purple-600 hover:bg-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white text-sm transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-neutral-800 rounded-lg ml-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
\
        {isSearchOpen && (
          <div className="md:hidden mt-3" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, genres, actors..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}


        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-800 pt-4" ref={menuRef}>
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center gap-3 text-white hover:text-purple-400 transition py-3 px-4 rounded-lg hover:bg-neutral-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
              
              <div className="pt-4 mt-4 border-t border-neutral-800 px-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-neutral-300 block">
                      {user.email}
                    </span>
                    <span className="text-xs text-purple-400">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;