/**
 * Header Component
 * Displays the app name and a logout button.
 * Ready for Supabase Auth integration — just replace the mock logout.
 */
import '../styles/home.css';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand */}
        <div className="header-brand">
          <div className="header-logo" aria-hidden="true">
            {/* Supabase-style bolt icon */}
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.33 12.603.714 13.4 1.425 13.4h8.518l-.943 9.964c.015.986 1.26 1.41 1.874.637l9.262-11.652c.434-.553.05-1.35-.661-1.35h-8.518l.943-9.963z" />
            </svg>
          </div>
          <span className="header-title">
            Supabase <span>Playground</span>
          </span>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <button
            id="logout-btn"
            className="btn-logout"
            onClick={onLogout}
            title="Logout"
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
