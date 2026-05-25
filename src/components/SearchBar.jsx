export default function SearchBar({
  search,
  setSearch,
  level,
  setLevel,
}) {
  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Search vocabulary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="All">All Levels</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
      </select>

    </div>
  );
}