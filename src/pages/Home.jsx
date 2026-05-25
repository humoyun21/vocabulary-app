import { useState } from "react";
import { getWordData } from "../services/dictionaryApi";
import FlipCard from "../components/FlipCard";
import "../styles/home.css";
import "../styles/search-bar.css";
import { translateToUzbek } from "../services/translateApi";

export default function Home() {

  const [search, setSearch] = useState("");
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uzbek, setUzbek] = useState("");
  const [learnedWords, setLearnedWords]  = useState([]);
  async function handleSearch() {

    if (!search) return;

    setLoading(true);

    const data = await getWordData(search);

setWordData(data);

const translated =
  await translateToUzbek(search);

setUzbek(translated);

setLoading(false);
  }

  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-content">

          <h1>
            Master English Vocabulary
            <span> From A1 to C1</span>
          </h1>

          <p>
            Search any English word and learn its meaning
            with interactive flashcards.
          </p>

        </div>

        <div className="search-bar">

          <input
            type="text"
            placeholder="Search a word..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>
            
            Search
          </button>

        </div>


        {loading && (
          <p className="loading-text">
            Loading...
          </p>
        )}

        {wordData && (

  <FlipCard

    english={wordData.word}

   uzbek={uzbek}

    definition={
      wordData.meanings[0]
        .definitions[0]
        .definition
    }

  />

)}

      </div>

    </section>
  );
}