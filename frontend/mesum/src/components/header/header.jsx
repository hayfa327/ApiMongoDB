import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">

      {/* LEFT */}
      <div className="logo">
        <span className="dot"></span>
        WOMEN IN CONTEMPORARY ART
      </div>

      {/* CENTER */}
      <nav className="nav">
  <Link to="/" className="active">Live</Link>
  <Link to="/performances">Performances</Link>
  <Link to="/exhibitions">Exhibitions</Link>
  <Link to="/artists">Artists</Link>
  <Link to="/voices">Voices</Link>
</nav>

      {/* RIGHT */}
      <div className="rightSide">

        <div className="userMenu">
          <button
            onClick={() => setOpen(!open)}
            className="signInBtn"
          >
            👤 Sign in
          </button>

          {open && (
            <div className="dropdown">
              <Link to="/login">Login</Link>
              <Link to="/manageAccount">Manage Account</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </div>

        <div className="location">
          <span className="dot purple"></span>
          STOCKHOLM
        </div>

      </div>

    </header>
  );
}