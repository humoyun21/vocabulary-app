import { useState, useEffect } from "react";
import "../styles/FlipCard.css";

export default function FlipCard({ english, uzbek, definition, cardStatus }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [english]);

  return (
    <div
      className={`flip-container ${flipped ? "flipped" : ""} ${cardStatus}`}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div className="flip-inner">
        {/* FRONT */}
        <div className="flip-face flip-front">
          <span className="card-hint">Tap to reveal</span>
          <h2 className="card-word">{english}</h2>
          <p className="card-sub">What's the translation?</p>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back">
          <span className="card-hint">Translation</span>
          <h2 className="card-translation">{uzbek}</h2>
          <p className="card-level">{definition}</p>
        </div>
      </div>
    </div>
  );
}
