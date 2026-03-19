import { useState, useEffect } from 'react';
import './App.css';
import GameCard from './components/GameCard';
import Header from './components/Header/Header';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5181/api/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Помилка завантаження:", error);
    }
  };

  const addGame = async (gameToAdd) => {
    const response = await fetch('http://localhost:5181/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameToAdd)
    });
    if (response.ok){fetchGames(); setIsModalOpen(false);} 
  };

  const deleteGame = async (id) => {
    const response = await fetch(`http://localhost:5181/api/games/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) setGames(games.filter(g => g.id !== id));
  };

  useEffect(() => { fetchGames(); }, []);

  return (
    <div className="container">
      <Header onOpenModal={() => setIsModalOpen(true)} addGame={addGame} />

      <div className="game-grid">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            onDelete={deleteGame} 
          />
        ))}
      </div>

      <button className="refresh-btn" onClick={fetchGames}>Оновити дані</button>
    </div>
  );
}

export default App;