import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-black text-neutral-400 border-t border-neutral-800 safe-area-bottom">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">K</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  Zom-ovies
                </span>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Your Ultimate Movie Database
                </p>
              </div>
            </div>
            <p className="mb-4 md:mb-6 text-neutral-400 text-sm sm:text-base leading-relaxed">
              Discover and explore movies & TV shows worldwide. Get detailed info, 
              ratings, trailers, and direct streaming links.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-0">
              {[
                { icon: "𝕏", label: "Twitter", color: "hover:bg-neutral-700" },
                { icon: "📱", label: "Instagram", color: "hover:bg-gradient-to-r from-purple-500 to-pink-500" },
                { icon: "👥", label: "Facebook", color: "hover:bg-blue-600" },
                { icon: "🎥", label: "YouTube", color: "hover:bg-red-600" },
                { icon: "📺", label: "Telegram", color: "hover:bg-blue-500" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-8 h-8 sm:w-10 sm:h-10 bg-neutral-800 ${social.color} rounded-full flex items-center justify-center text-base sm:text-lg transition-all duration-300 hover:scale-110 hover:text-white`}
                  title={social.label}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0">
            <button
              onClick={() => toggleSection('quickLinks')}
              className="md:hidden w-full flex items-center justify-between text-white font-semibold text-lg mb-2"
            >
              Quick Links
              <span className={`transform transition-transform ${activeSection === 'quickLinks' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <h3 className="hidden md:block text-white font-semibold text-lg mb-3 md:mb-4">Quick Links</h3>
            <ul className={`${activeSection === 'quickLinks' ? 'block' : 'hidden'} md:block space-y-2 md:space-y-3`}>
              {[
                { name: "Home", icon: "🏠", badge: "" },
                { name: "Movies", icon: "🎬", badge: "5k+" },
                { name: "TV Shows", icon: "📺", badge: "2k+" },
                { name: "Top Rated", icon: "⭐", badge: "🔥" },
                { name: "Upcoming", icon: "📅", badge: "New" },
                { name: "Now Playing", icon: "🎥", badge: "" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-all flex items-center justify-between group py-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{link.icon}</span>
                      <span className="text-sm sm:text-base">{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full group-hover:bg-purple-900/30">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0">
            <button
              onClick={() => toggleSection('genres')}
              className="md:hidden w-full flex items-center justify-between text-white font-semibold text-lg mb-2"
            >
              Popular Genres
              <span className={`transform transition-transform ${activeSection === 'genres' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <h3 className="hidden md:block text-white font-semibold text-lg mb-3 md:mb-4">Popular Genres</h3>
            <div className={`${activeSection === 'genres' ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {[
                  "Action", "Drama", "Comedy", "Thriller", 
                  "Romance", "Horror", "Sci-Fi", "Fantasy"
                ].map((genre, index) => (
                  <a
                    key={index}
                    href="#"
                    className="inline-block bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm transition-all duration-300 hover:scale-105"
                  >
                    {genre}
                  </a>
                ))}
              </div>

              <div className="mt-6 md:mt-8">
                <h4 className="text-white font-semibold text-base mb-2">Stay Updated</h4>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base"
                  >
                    {subscribed ? "Subscribed! 🎉" : "Subscribe"}
                  </button>
                </form>

                <div className="mt-4 hidden sm:block">
                  <p className="text-xs text-neutral-400 mb-2">Get Our App</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg flex items-center justify-center gap-2 transition-all text-xs">
                      <span>📱</span>
                      <span>Play Store</span>
                    </button>
                    <button className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg flex items-center justify-center gap-2 transition-all text-xs">
                      <span>🍎</span>
                      <span>App Store</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-6 md:mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-xs text-neutral-500">
                &copy; {new Date().getFullYear()} ZOM-OVIES. All rights reserved.
              </p>
              <p className="text-xs text-neutral-600 mt-1 hidden sm:block">
                This is a demonstration project. All content is fictional.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs sm:text-sm order-1 md:order-2">
              <a href="#" className="hover:text-purple-400 transition-colors whitespace-nowrap">
                Privacy
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors whitespace-nowrap">
                Terms
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors whitespace-nowrap">
                Cookies
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors whitespace-nowrap">
                DMCA
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors whitespace-nowrap">
                Contact
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Movies & Shows", value: "5,000+", color: "text-purple-400" },
              { label: "Active Users", value: "100K+", color: "text-pink-400" },
              { label: "Countries", value: "150+", color: "text-blue-400" },
              { label: "Languages", value: "50+", color: "text-green-400" }
            ].map((stat, index) => (
              <div key={index} className="bg-neutral-800/30 p-3 rounded-lg text-center">
                <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-neutral-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 sm:p-4 bg-neutral-900/50 rounded-lg border border-neutral-800">
            <p className="text-xs text-neutral-500 text-center leading-relaxed">
              ⚠️ Disclaimer: ZOM-OVIES does not host or stream any video content. 
              We only provide information and links to external platforms.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;