import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">

    
      <div className="logo">
        <span className="dot"></span>
        WOMEN IN CONTEMPORARY ART
      </div>

     
      <nav className="nav">
  <Link to="/" className="active">Live</Link>
  <Link to="/performances">Performances</Link>
  <Link to="/exhibitions">Exhibitions</Link>
  <Link to="/artists">Artists</Link>
</nav>

     
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
  <Link to="/login" onClick={() => setOpen(false)}>
    Login
  </Link>

  <Link to="/manageAccount" onClick={() => setOpen(false)}>
    Manage Account
  </Link>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      setOpen(false);
    }}
  >
    Logout
  </button>
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