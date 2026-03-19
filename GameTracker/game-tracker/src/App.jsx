import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [games, setGames] = useState([]);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameRating, setNewGameRating] = useState(0);
  const [newGameDescription, setNewGameDescription] = useState("");

  const addGame = async () => {
    if (!newGameTitle) return; 

    const gameToAdd = {
      title: newGameTitle,
      genre: "PC Game",
      progress: 0,
      releaseDate: new Date().toISOString().split('T')[0],
      rating: newGameRating,
      description: newGameDescription 
    };

    const response = await fetch('http://localhost:5181/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameToAdd) 
    });

    if (response.ok) {
      setNewGameTitle("");
      fetchGames();
      setNewGameRating(0);
      setNewGameDescription("");
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
        <h1>Game Tracker </h1>
        <p>My Game Tracker</p>
      </header>
<div className="add-game-form">
  <div className="input-group"  id='title-group'>
    <input 
    type="text" 
    placeholder="Назва гри..." 
    value={newGameTitle}
    onChange={(e) => setNewGameTitle(e.target.value)} 
  />
  </div>
  <div className="input-group " id ='rating-group'>
    <input 
    type="number" 
    placeholder="Рейтинг..." 
    value={newGameRating}
    onChange={(e) => setNewGameRating(parseInt(e.target.value) < 11 && parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : 0)} 
  />
  </div>
  <div className="input-group" id='description-group'>
    <input 
    type="text" 
    placeholder="Опис..." 
    value={newGameDescription}
    onChange={(e) => setNewGameDescription(e.target.value)} 
  />
  </div>
  <button onClick={addGame}>Додати гру</button>
</div>
      <div className="game-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-info">
              <h2>{game.title}</h2>
              <span className="badge">{game.genre}</span>
              {game.rating < 5 ? <span className="rating bad">{game.rating}</span> : game.rating > 5 && game.rating < 8 ? <span className="rating medium">{game.rating}</span> : <span className="rating good">{game.rating}</span>}
              <p className="release-date">Вихід: {game.releaseDate}</p>
              <p className="release-date">Опис: {game.description}</p>
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
              {game.progress === 100 && <span className="completed-text">Пройдено!</span>}
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