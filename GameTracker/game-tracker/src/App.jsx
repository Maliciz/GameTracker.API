import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [games, setGames] = useState([]);
  const [newGameTitle, setNewGameTitle] = useState("");

  const addGame = async () => {
    if (!newGameTitle) return; 

    const gameToAdd = {
      title: newGameTitle,
      genre: "PC Game",
      progress: 0,
      releaseDate: new Date().toISOString().split('T')[0]
    };

    const response = await fetch('http://localhost:5181/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameToAdd) 
    });

    if (response.ok) {
      setNewGameTitle("");
      fetchGames();
    }
  };
const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:5181/api/games'); 
    
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    setGames(data);
  } catch (error) {
    console.error("Помилка зв'язку з бекендом:", error);
  }
};

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🎮 Game Tracker Professional</h1>
        <p>Відстеження прогресу у ваших іграх</p>
      </header>
<div className="add-game-form">
  <input 
    type="text" 
    placeholder="Назва гри..." 
    value={newGameTitle}
    onChange={(e) => setNewGameTitle(e.target.value)} 
  />
  <button onClick={addGame}>Додати гру</button>
</div>
      <div className="game-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-info">
              <h2>{game.title}</h2>
              <span className="badge">{game.genre}</span>
              <p className="release-date">Вихід: {game.releaseDate}</p>
            </div>
            
            <div className="progress-section">
              <div className="progress-label">
                <span>Прогрес</span>
                <span>{game.progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${game.progress}%` }}
                ></div>
              </div>
              {game.progress === 100 && <span className="completed-text">✅ Пройдено!</span>}
            </div>
          </div>
        ))}
      </div>

      <button className="refresh-btn" onClick={fetchGames}>
        Оновити дані
      </button>
    </div>
  )
}

export default App