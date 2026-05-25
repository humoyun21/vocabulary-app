import { useState } from "react";

export default function FlipCard({
  english,
  uzbek,
  definition,
  cardStatus,
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
       className={`
    flip-card
    ${flipped ? "flipped" : ""}
    ${cardStatus}
  `}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front">
          <h2>{english}</h2>
          <p>
            Click to see translation
          </p>
        </div>
        {/* BACK */}
        <div className="flip-card-back">
          <h2>{uzbek}</h2>
          <p>{definition}</p>
        </div>
      </div>
    </div>
  );
}