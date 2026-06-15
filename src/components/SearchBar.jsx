/**
 * SearchBar Component
 * Filters todos in real time by title or description.
 */
import '../styles/home.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-wrapper">
      {/* Search icon */}
      <span className="search-icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>

      <input
        id="search-input"
        type="text"
        className="search-input"
        placeholder="Search tasks by title or description…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />

      {/* Clear button — only shown when there is text */}
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange('')}
          title="Clear search"
          aria-label="Clear search"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
