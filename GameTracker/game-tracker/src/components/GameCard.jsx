import './GameCard.css';
function GameCard({ game, onDelete }) {

  const getRatingClass = (rating) => {
    if (rating < 5) return "rating bad";
    if (rating >= 5 && rating < 8) return "rating medium";
    return "rating good";
  };

  return (
    <div className="game-card">
      <div className="game-info">
        <h2>{game.title}</h2>
        <span className="badge">{game.genre}</span>
        <span className={getRatingClass(game.rating)}>{game.rating}</span>
        <p className="release-date">Вихід: {game.releaseDate}</p>
        <p className="description">Опис: {game.description}</p>
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

      <button onClick={() => onDelete(game.id)}>Видалити 🗑️</button>
    </div>
  );
}

export default GameCard;