
import React, { useState, useMemo } from 'react';
import GameCard from '../components/GameCard';
import { gamesData } from '../data/games';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Retro'];

const Home = ({ onSelectGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-12 bg-indigo-900 h-64 md:h-80 flex items-center px-8 md:px-16 shadow-2xl shadow-indigo-950">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[150%] h-[150%] bg-gradient-radial from-indigo-500/20 to-transparent blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none mb-4 tracking-tighter">
            READY TO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">LEVEL UP?</span>
          </h2>
          <p className="text-indigo-200 text-lg mb-6">
            Explore 100+ unblocked arcade games for your daily break. No downloads, no lag.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onSelectGame('2048')}
              className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-play"></i> Play Featured
            </button>
            <div className="flex items-center gap-2 text-indigo-100 font-medium">
              <span className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-indigo-900" src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" />
                ))}
              </span>
              <span>12.4k online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search for a game..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard key={game.id} game={game} onClick={onSelectGame} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-ghost text-4xl text-slate-600"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-300">No games found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Promo Section */}
      <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Want to see your game here?</h3>
          <p className="text-slate-400">Join our developer program and reach millions of players worldwide.</p>
        </div>
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
          Become a Developer
        </button>
      </div>
    </div>
  );
};

export default Home;
