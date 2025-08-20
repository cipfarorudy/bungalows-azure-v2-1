import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bungalows, setBungalows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/bungalows')
      .then((res) => res.json())
      .then((data) => {
        setBungalows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Chargement des bungalows...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>🏕️ Bungalows Azure</h1>
        <p>Découvrez nos hébergements uniques.</p>
      </header>

      <main>
        <div className="bungalows-list">
          {bungalows.length === 0 ? (
            <p>Aucun bungalow disponible.</p>
          ) : (
            bungalows.map((bungalow) => (
              <div key={bungalow._id} className="bungalow-card">
                <img
                  src={`http://localhost:5000${bungalow.imageUrl}`}
                  alt={bungalow.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+indisponible';
                  }}
                />
                <div className="info">
                  <h3>{bungalow.name}</h3>
                  <p>{bungalow.description}</p>
                  <p>
                    <strong>{bungalow.pricePerNight} €</strong> / nuit
                  </p>
                  <div className="tags">
                    {bungalow.amenities.map((amenity, index) => (
                      <span key={index} className="tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;