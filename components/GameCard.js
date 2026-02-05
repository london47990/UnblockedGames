
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500 hover:shadow-indigo-500/20 cursor-pointer"
      onClick={() => onClick(game.id)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-2 left-2 flex gap-2">
          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {game.category}
          </span>
          <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <i className="fa-solid fa-star text-[8px]"></i> {game.rating}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2 h-10">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
