import { useState } from 'react';
import './GameForm.css';

function GameForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title) return;
    
    onAdd({
      title,
      rating: parseInt(rating),
      description,
      genre: "PC Game",
      progress: 0,
      releaseDate: new Date().toISOString().split('T')[0]
    });

    setTitle("");
    setRating(0);
    setDescription("");
  };

  return (
    <div className="add-game-form">
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Назва гри..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>

      <div className="input-group">
        <input 
          type="number" 
          placeholder="Рейтинг (0-10)..." 
          value={rating}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setRating(val >= 0 && val <= 10 ? val : 0);
          }} 
        />
      </div>

      <div className="input-group" id="description-group">
        <input 
          type="text" 
          placeholder="Опис..." 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>

      <button onClick={handleSubmit}>Додати гру</button>
    </div>
  );
}

export default GameForm;