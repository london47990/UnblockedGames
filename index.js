
/**
 * ArcadeBlast! Fun Theme Engine
 */

let allGames = [];
let activeCategory = 'All';
let searchQuery = '';

// Initialize the app
async function init() {
    try {
        const response = await fetch('./data/games.json');
        allGames = await response.json();
        
        // Setup Routing
        window.addEventListener('hashchange', handleRoute);
        handleRoute();

        // Global Event Listeners
        document.querySelectorAll('.nav-home').forEach(el => el.onclick = () => window.location.hash = '');
        document.getElementById('nav-logo').onclick = () => window.location.hash = '';
        
    } catch (error) {
        console.error("Failed to load games:", error);
    }
}

function handleRoute() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#game/')) {
        const gameId = hash.split('/')[1];
        renderGameView(gameId);
    } else {
        renderHomeView();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHomeView() {
    const content = document.getElementById('app-content');
    content.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Fun Hero Section -->
            <div class="relative rounded-[3rem] overflow-hidden mb-16 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 h-80 md:h-[28rem] flex items-center px-8 md:px-20 border-4 border-white/5 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                <div class="relative z-10 max-w-2xl">
                    <div class="inline-block px-4 py-1 bg-pink-500 text-white font-black text-xs rounded-full bungee tracking-widest mb-6">NEW SEASON IS HERE!</div>
                    <h2 class="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-6 bungee uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                        READY <br /><span class="gradient-text">PLAYER ONE?</span>
                    </h2>
                    <p class="text-blue-100 text-xl md:text-2xl font-medium mb-8 max-w-lg opacity-80">Unlock the ultimate arcade experience. No blocks, no boredom, just pure hype!</p>
                    <div class="flex flex-wrap gap-4">
                        <button onclick="window.location.hash='#game/drift-boss'" class="bg-white text-purple-900 px-10 py-4 rounded-[2rem] font-black text-lg shadow-[0_10px_0_#cbd5e1] hover:shadow-none hover:translate-y-1 transition-all flex items-center gap-3 bungee">
                            <i class="fa-solid fa-fire text-orange-500"></i> PLAY NOW
                        </button>
                    </div>
                </div>

                <!-- Floating Mascot/Illustration -->
                <div class="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 floating">
                    <div class="relative w-80 h-80">
                        <div class="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div class="relative z-10 w-full h-full flex items-center justify-center">
                             <i class="fa-solid fa-ghost text-[12rem] text-white/90 drop-shadow-[0_20px_40px_rgba(255,255,255,0.2)]"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fun Filter Bar -->
            <div class="flex flex-col gap-10 mb-16">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="relative w-full md:w-[32rem] group">
                        <i class="fa-solid fa-search absolute left-6 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors"></i>
                        <input 
                            id="search-input" 
                            type="text" 
                            placeholder="FIND YOUR NEXT OBSESSION..." 
                            class="w-full bg-white/5 border-2 border-purple-500/20 rounded-full py-5 pl-16 pr-8 text-white font-bold placeholder:text-purple-300/30 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all text-lg tracking-wider"
                            value="${searchQuery}"
                        />
                    </div>
                    
                    <div id="category-filters" class="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                        ${['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Retro'].map(cat => `
                            <button 
                                data-cat="${cat}"
                                class="cat-btn px-8 py-3 rounded-full font-black text-xs transition-all tracking-tighter bungee ${activeCategory === cat ? 'bg-pink-500 text-white shadow-[0_5px_0_#be185d]' : 'bg-white/5 text-purple-300 hover:bg-white/10'}"
                            >
                                ${cat}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Games Grid -->
            <div id="games-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Cards injected via updateGrid -->
            </div>
        </div>
    `;

    // Attach listeners
    document.getElementById('search-input').oninput = (e) => {
        searchQuery = e.target.value;
        updateGrid();
    };

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.onclick = () => {
            activeCategory = btn.dataset.cat;
            renderHomeView();
        };
    });

    updateGrid();
}

function updateGrid() {
    const grid = document.getElementById('games-grid');
    const filtered = allGames.filter(g => {
        const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = activeCategory === 'All' || g.category === activeCategory;
        return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-32 text-center">
                <i class="fa-solid fa-robot text-7xl text-purple-500/20 mb-6 block"></i>
                <h3 class="text-3xl font-black text-white/40 bungee">GAME OVER! NO MATCHES FOUND.</h3>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(game => `
        <div onclick="window.location.hash='#game/${game.id}'" class="card-pop group bg-white/5 rounded-[2.5rem] overflow-hidden border-2 border-white/5 hover:border-pink-500/50 transition-all cursor-pointer shadow-xl">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div class="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <span class="text-amber-400 font-black text-xs bungee">${game.rating}</span>
                </div>

                <div class="absolute bottom-4 left-6">
                    <span class="bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full bungee tracking-widest uppercase">${game.category}</span>
                </div>
            </div>
            <div class="p-8">
                <h3 class="font-black text-xl text-white group-hover:text-pink-400 transition-colors truncate uppercase tracking-tight">${game.title}</h3>
                <p class="text-slate-400 text-sm mt-3 line-clamp-2 leading-relaxed font-medium">${game.description}</p>
                <div class="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span class="text-white/30 text-[10px] font-black bungee">FREE TO PLAY</span>
                    <i class="fa-solid fa-circle-play text-2xl text-white/10 group-hover:text-pink-500 transition-colors"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function renderGameView(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (!game) {
        window.location.hash = '';
        return;
    }

    const similar = allGames.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4);

    document.getElementById('app-content').innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header -->
            <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div class="flex items-center gap-6">
                    <button onclick="window.location.hash=''" class="w-16 h-16 rounded-[1.5rem] bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-90 border-2 border-white/5">
                        <i class="fa-solid fa-chevron-left text-xl"></i>
                    </button>
                    <div>
                        <h2 class="text-4xl font-black text-white bungee uppercase tracking-tight">${game.title}</h2>
                        <div class="flex items-center gap-4 mt-2">
                            <span class="text-pink-500 font-black text-sm bungee tracking-widest uppercase">${game.category}</span>
                            <span class="text-white/20">|</span>
                            <div class="flex items-center gap-2 text-amber-400 font-black text-sm bungee">
                                <i class="fa-solid fa-star"></i> ${game.rating}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4">
                    <button id="fullscreen-btn" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 py-4 rounded-full font-black text-sm bungee tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                        <i class="fa-solid fa-expand mr-2"></i> FULLSCREEN
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <!-- Game Container -->
                <div class="lg:col-span-3">
                    <div id="game-container" class="relative w-full aspect-video bg-black rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-8 border-white/5">
                        <iframe 
                            src="${game.iframeUrl}" 
                            class="w-full h-full border-none" 
                            allowfullscreen 
                            allow="autoplay; fullscreen; pointer-lock"
                            scrolling="no"
                        ></iframe>
                    </div>
                    
                    <div class="mt-12 bg-white/5 rounded-[3rem] p-10 border-2 border-white/5">
                        <h3 class="text-2xl font-black text-white bungee mb-6 tracking-widest">ABOUT THE GAME</h3>
                        <p class="text-slate-300 text-lg leading-relaxed font-medium">${game.description}</p>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            <div class="p-6 bg-black/40 rounded-[1.5rem] border border-white/5">
                                <span class="text-purple-400 font-black text-[10px] bungee block mb-2">DIFFICULTY</span>
                                <span class="text-white font-bold text-lg">PRO MODE</span>
                            </div>
                            <div class="p-6 bg-black/40 rounded-[1.5rem] border border-white/5">
                                <span class="text-cyan-400 font-black text-[10px] bungee block mb-2">STATUS</span>
                                <span class="text-white font-bold text-lg">ONLINE</span>
                            </div>
                            <div class="p-6 bg-black/40 rounded-[1.5rem] border border-white/5">
                                <span class="text-pink-400 font-black text-[10px] bungee block mb-2">CONTROLS</span>
                                <span class="text-white font-bold text-lg">KEYBOARD</span>
                            </div>
                            <div class="p-6 bg-black/40 rounded-[1.5rem] border border-white/5">
                                <span class="text-amber-400 font-black text-[10px] bungee block mb-2">REGION</span>
                                <span class="text-white font-bold text-lg">GLOBAL</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1 space-y-10">
                    <div>
                        <h3 class="text-lg font-black text-white/40 bungee mb-8 tracking-widest uppercase">YOU MIGHT LIKE</h3>
                        <div class="space-y-6">
                            ${similar.length > 0 ? similar.map(s => `
                                <div onclick="window.location.hash='#game/${s.id}'" class="group flex gap-5 bg-white/5 hover:bg-white/10 p-4 rounded-[1.5rem] border-2 border-white/5 transition-all cursor-pointer">
                                    <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                        <img src="${s.thumbnail}" class="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div class="flex flex-col justify-center overflow-hidden">
                                        <h4 class="text-white font-black text-sm truncate bungee group-hover:text-pink-400">${s.title}</h4>
                                        <span class="text-purple-400 text-[10px] font-black bungee uppercase mt-1">${s.category}</span>
                                    </div>
                                </div>
                            `).join('') : '<p class="text-slate-500 text-sm italic bungee">LOOKING FOR MORE HITS...</p>'}
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-pink-600 to-purple-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                        <i class="fa-solid fa-trophy absolute -right-6 -bottom-6 text-[10rem] text-white/10 -rotate-12"></i>
                        <h4 class="font-black text-2xl bungee mb-4 relative z-10">JOIN PRO!</h4>
                        <p class="text-white/80 font-bold mb-8 relative z-10">No ads, early access, and exclusive badges!</p>
                        <button class="bg-white text-pink-600 px-8 py-3 rounded-full font-black text-sm bungee w-full relative z-10 shadow-lg hover:scale-105 transition-transform">
                            LFG!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('fullscreen-btn').onclick = () => {
        const container = document.getElementById('game-container');
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
        else if (container.msRequestFullscreen) container.msRequestFullscreen();
    };
}

// Start
init();
