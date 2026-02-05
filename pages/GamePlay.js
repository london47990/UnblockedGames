
import React, { useState } from 'react';
import { gamesData } from '../data/games';

const GamePlay = ({ gameId, onBack, onSelectGame }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const game = gamesData.find(g => g.id === gameId);

  if (!game) return <div className="p-20 text-center text-white font-bold">Game not found</div>;

  const toggleFullscreen = () => {
    const iframeContainer = document.getElementById('iframe-container');
    if (!iframeContainer) return;

    if (!document.fullscreenElement) {
      iframeContainer.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const relatedGames = gamesData
    .filter(g => g.id !== gameId && g.category === game.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Navigation & Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-all active:scale-90"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{game.title}</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-indigo-400 font-bold">{game.category}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-500 font-bold flex items-center gap-1">
                <i className="fa-solid fa-star"></i> {game.rating}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">12k plays today</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-all" title="Add to Favorites">
            <i className="fa-regular fa-heart text-xl"></i>
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-all" title="Share">
            <i className="fa-solid fa-share-nodes text-xl"></i>
          </button>
          <button 
            onClick={toggleFullscreen}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          >
            <i className="fa-solid fa-expand"></i> Fullscreen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Iframe Container */}
        <div className="lg:col-span-3 space-y-6">
          <div 
            id="iframe-container"
            className={`relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700 ${isFullscreen ? 'h-screen w-screen rounded-none' : ''}`}
          >
            <iframe
              src={game.iframeUrl}
              title={game.title}
              className="w-full h-full border-none"
              allowFullScreen
              allow="autoplay; fullscreen; pointer-lock"
            ></iframe>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-4">About the Game</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {game.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                <span className="block text-slate-500 text-xs uppercase mb-1">Last Update</span>
                <span className="block text-slate-200 font-bold">2 days ago</span>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                <span className="block text-slate-500 text-xs uppercase mb-1">Difficulty</span>
                <span className="block text-slate-200 font-bold">Medium</span>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                <span className="block text-slate-500 text-xs uppercase mb-1">Developer</span>
                <span className="block text-slate-200 font-bold">ArcadeHQ</span>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                <span className="block text-slate-500 text-xs uppercase mb-1">Players</span>
                <span className="block text-slate-200 font-bold">1M+ Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Related */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Similar Games</h3>
            <a href="#" className="text-indigo-400 text-xs hover:underline font-bold">View All</a>
          </div>
          <div className="space-y-4">
            {relatedGames.map(related => (
              <div 
                key={related.id} 
                className="group flex gap-4 bg-slate-800/30 hover:bg-slate-800 p-3 rounded-xl border border-slate-700/30 hover:border-indigo-500/50 transition-all cursor-pointer"
                onClick={() => onSelectGame(related.id)}
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img src={related.thumbnail} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <h4 className="text-slate-200 font-bold text-sm truncate group-hover:text-indigo-400 transition-colors">{related.title}</h4>
                  <span className="text-slate-500 text-xs mb-1">{related.category}</span>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                    <i className="fa-solid fa-star"></i> {related.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl shadow-indigo-900/20 text-white relative overflow-hidden mt-8">
            <i className="fa-solid fa-crown absolute -right-4 -bottom-4 text-8xl text-white/10 -rotate-12"></i>
            <h4 className="font-bold text-lg mb-2 relative z-10">Pro Portal</h4>
            <p className="text-indigo-100 text-sm mb-4 relative z-10">Get early access to new releases and ad-free experience.</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm w-full relative z-10 shadow-lg hover:bg-slate-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
