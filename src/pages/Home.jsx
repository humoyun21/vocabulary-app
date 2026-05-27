import { useState } from "react";
import { getWordData } from "../services/dictionaryApi";
import FlipCard from "../components/FlipCard";
import "../styles/Home.css";
import { translateToUzbek } from "../services/translateApi";

export default function Home() {
  const [search, setSearch]   = useState("");
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading]  = useState(false);
  const [uzbek, setUzbek]      = useState("");

  async function handleSearch() {
    if (!search.trim()) return;
    setLoading(true);
    setWordData(null);
    const data = await getWordData(search);
    setWordData(data);
    const translated = await translateToUzbek(search);
    setUzbek(translated);
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <section className="hero">

      {/* Aurora orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-container">

        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          A1 → C1 Vocabulary Builder
        </div>

        {/* Headline */}
        <div className="hero-content">
          <h1>
            Master English
            <span className="grad">Vocabulary</span>
          </h1>
          <p>
            Search any English word and learn its meaning,
            translation, and definition with interactive flashcards.
          </p>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Type a word to explore..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKey}
            />
            <button onClick={handleSearch}>
              Search →
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-text">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            Looking up "{search}"
          </div>
        )}

        {/* Flip card */}
        {wordData && !loading && (
          <div className="flip-card-wrap">
            <FlipCard
              english={wordData.word}
              uzbek={uzbek}
              definition={
                wordData.meanings[0].definitions[0].definition
              }
            />
          </div>
        )}

        {/* Stats */}
        {!wordData && !loading && (
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-icon">📚</span>
              <span className="hero-stat-text">
                <strong>1,200+</strong> words
              </span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon">🇬🇧</span>
              <span className="hero-stat-text">
                English → <strong>O'zbek</strong>
              </span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-icon">⚡</span>
              <span className="hero-stat-text">
                <strong>A1</strong> to <strong>C1</strong> levels
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}