
/**
 * PortalGames Vanilla JS Engine
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
    const content = document.getElementById('app-content');
    
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
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
            <!-- Hero Section -->
            <div class="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-indigo-900 to-indigo-800 h-64 md:h-80 flex items-center px-8 md:px-16 shadow-2xl">
                <div class="relative z-10 max-w-xl">
                    <h2 class="text-4xl md:text-6xl font-black text-white leading-none mb-4 tracking-tighter">
                        PLAY WITHOUT <br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">LIMITS.</span>
                    </h2>
                    <p class="text-indigo-100 text-lg mb-6">Discover the best unblocked web games. Instant play, no lag, no limits.</p>
                    <button onclick="window.location.hash='#game/2048'" class="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-play"></i> Play 2048
                    </button>
                </div>
            </div>

            <!-- Toolbar -->
            <div class="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
                <div class="relative w-full md:w-96">
                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                    <input 
                        id="search-input" 
                        type="text" 
                        placeholder="Search for a game..." 
                        class="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value="${searchQuery}"
                    />
                </div>
                <div id="category-filters" class="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    ${['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Retro'].map(cat => `
                        <button 
                            data-cat="${cat}"
                            class="cat-btn px-5 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}"
                        >
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Grid -->
            <div id="games-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            renderHomeView(); // Re-render for active state update
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
        grid.innerHTML = `<div class="col-span-full py-20 text-center text-slate-500">No games found for "${searchQuery}"</div>`;
        return;
    }

    grid.innerHTML = filtered.map(game => `
        <div onclick="window.location.hash='#game/${game.id}'" class="game-card group bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all hover:scale-[1.03] hover:border-indigo-500 cursor-pointer">
            <div class="relative aspect-video overflow-hidden">
                <img src="${game.thumbnail}" alt="${game.title}" class="card-image w-full h-full object-cover transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                <div class="absolute bottom-2 left-2 flex gap-2">
                    <span class="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">${game.category}</span>
                    <span class="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <i class="fa-solid fa-star text-[8px]"></i> ${game.rating}
                    </span>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors truncate">${game.title}</h3>
                <p class="text-slate-400 text-sm mt-1 line-clamp-2 h-10">${game.description}</p>
            </div>
        </div>
    `).join('');
}

function renderGameView(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (!game) {
        document.getElementById('app-content').innerHTML = `<div class="p-20 text-center text-white">Game not found</div>`;
        return;
    }

    const similar = allGames.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4);

    document.getElementById('app-content').innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
            <!-- Back & Controls -->
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div class="flex items-center gap-4">
                    <button onclick="window.location.hash=''" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-all active:scale-90">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <div>
                        <h2 class="text-3xl font-bold text-white tracking-tight">${game.title}</h2>
                        <div class="flex items-center gap-3 text-sm">
                            <span class="text-indigo-400 font-bold">${game.category}</span>
                            <span class="text-slate-500">•</span>
                            <span class="text-amber-500 font-bold flex items-center gap-1"><i class="fa-solid fa-star"></i> ${game.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button id="fullscreen-btn" class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
                        <i class="fa-solid fa-expand"></i> Fullscreen
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Iframe -->
                <div class="lg:col-span-3 space-y-6">
                    <div id="game-container" class="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700">
                        <iframe src="${game.iframeUrl}" class="w-full h-full border-none" allowfullscreen></iframe>
                    </div>
                    <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                        <h3 class="text-xl font-bold text-white mb-4">Description</h3>
                        <p class="text-slate-400 leading-relaxed">${game.description}</p>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1 space-y-6">
                    <h3 class="font-bold text-slate-200 uppercase tracking-wider text-xs">Similar Games</h3>
                    <div class="space-y-4">
                        ${similar.map(s => `
                            <div onclick="window.location.hash='#game/${s.id}'" class="group flex gap-3 bg-slate-800/30 hover:bg-slate-800 p-2 rounded-xl border border-slate-700/30 transition-all cursor-pointer">
                                <img src="${s.thumbnail}" class="w-16 h-16 rounded-lg object-cover" />
                                <div class="flex flex-col justify-center overflow-hidden">
                                    <h4 class="text-slate-200 font-bold text-sm truncate group-hover:text-indigo-400">${s.title}</h4>
                                    <span class="text-slate-500 text-[10px]">${s.category}</span>
                                </div>
                            </div>
                        `).join('')}
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
