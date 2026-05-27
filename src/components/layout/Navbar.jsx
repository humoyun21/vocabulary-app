import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import "../../styles/navbar.css";

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IconLearn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconLogin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

function getInitials(user) {
  if (!user) return "?";
  if (user.displayName) {
    const parts = user.displayName.trim().split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  if (user.email) return user.email.slice(0, 2).toUpperCase();
  return "U";
}

export default function Navbar() {
  const [user, setUser]         = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location                = useLocation();

  // FIX: separate refs for nav and mobile menu
  const navRef        = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // FIX: outside click checks BOTH nav and mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      const inNav  = navRef.current?.contains(e.target);
      const inMenu = mobileMenuRef.current?.contains(e.target);
      if (!inNav && !inMenu) {
        setMenuOpen(false);
      }
    };
    // FIX: use 'click' not 'mousedown' so Link navigation fires first
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  async function handleLogout() {
    try { await signOut(auth); } catch (err) { console.error(err); }
    setMenuOpen(false);
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} ref={navRef}>

        <Link to="/" className="logo">
          <div className="logo-icon">V</div>
          <span className="logo-text">Vocab<span>App</span></span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""}>
              <IconHome /> Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/learn" className={isActive("/learn") ? "active" : ""}>
                  <IconLearn /> Learn
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
                  <IconDashboard /> Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn-ghost">
                <IconLogin /> Login
              </Link>
              <div className="nav-divider" />
              <Link to="/register" className="btn-primary">
                Get started
              </Link>
            </>
          ) : (
            <>
              <div className="user-avatar" title={user.displayName || user.email}>
                {getInitials(user)}
              </div>
              <div className="nav-divider" />
              <button className="btn-logout" onClick={handleLogout}>
                <IconLogout /> Logout
              </button>
            </>
          )}
        </div>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* FIX: mobile menu has its own ref, separate from nav */}
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        ref={mobileMenuRef}
      >
        <Link to="/" className={isActive("/") ? "active" : ""}>
          <IconHome /> Home
        </Link>

        {user && (
          <>
            <Link to="/learn" className={isActive("/learn") ? "active" : ""}>
              <IconLearn /> Learn
            </Link>
            <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
              <IconDashboard /> Dashboard
            </Link>
          </>
        )}

        <div className="mobile-menu-divider" />

        {!user ? (
          <>
            <Link to="/login" className={isActive("/login") ? "active" : ""}>
              <IconLogin /> Login
            </Link>
            <Link to="/register" className="btn-primary-mobile">
              <IconUser /> Get started
            </Link>
          </>
        ) : (
          <button className="btn-logout-mobile" onClick={handleLogout}>
            <IconLogout /> Logout
          </button>
        )}
      </div>

      <div className="navbar-spacer" />
    </>
  );
}