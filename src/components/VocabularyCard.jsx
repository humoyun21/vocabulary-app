import "../styles/vocabulary-card.css";

export default function VocabularyCard({
  word,
  meaning,
  level,
  category,
}) {
  return (
    <div className="vocabulary-card">
      <div className="card-top">
        <h2>{word}</h2>

        <span className="level">{level}</span>
      </div>

      <p className="meaning">{meaning}</p>

      <div className="category">
        <span>{category}</span>
      </div>
    </div>
  );
}