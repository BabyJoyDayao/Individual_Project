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