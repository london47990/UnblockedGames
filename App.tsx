
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';

const App: React.FC = () => {
  // Using simple hash-based routing state
  const [currentView, setCurrentView] = useState<{ type: 'home' | 'game'; id?: string }>({ type: 'home' });

  // Handle browser back/forward buttons using the hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#game/')) {
        const id = hash.split('/')[1];
        setCurrentView({ type: 'game', id });
      } else {
        setCurrentView({ type: 'home' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToGame = (id: string) => {
    window.location.hash = `game/${id}`;
    setCurrentView({ type: 'game', id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout onHomeClick={navigateToHome}>
      {currentView.type === 'home' ? (
        <Home onSelectGame={navigateToGame} />
      ) : (
        <GamePlay 
          gameId={currentView.id || ''} 
          onBack={navigateToHome} 
          onSelectGame={navigateToGame}
        />
      )}
    </Layout>
  );
};

export default App;
