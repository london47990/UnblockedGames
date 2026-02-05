
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onHomeClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onHomeClick }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={onHomeClick}
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:rotate-12 transition-transform">
                <i className="fa-solid fa-gamepad text-xl"></i>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tighter text-white">
                PORTAL<span className="text-indigo-500">GAMES</span>
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-slate-400 font-medium">
              <button onClick={onHomeClick} className="hover:text-indigo-400 transition-colors">Games</button>
              <a href="#" className="hover:text-indigo-400 transition-colors">Top Rated</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Categories</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full text-slate-300 transition-colors">
                <i className="fa-solid fa-bookmark"></i>
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-gamepad text-indigo-500 text-2xl"></i>
              <span className="text-xl font-bold text-white">PORTALGAMES</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              The ultimate destination for unblocked web games. Curated, lightweight, and always free to play.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"><i className="fa-brands fa-discord"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"><i className="fa-brands fa-github"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-indigo-400">All Games</a></li>
              <li><a href="#" className="hover:text-indigo-400">Categories</a></li>
              <li><a href="#" className="hover:text-indigo-400">Submit Game</a></li>
              <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400">DMCA</a></li>
              <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} PortalGames. All games are properties of their respective creators.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
