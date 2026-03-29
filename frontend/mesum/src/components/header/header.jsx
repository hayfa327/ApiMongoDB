import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
    const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

const navigate = useNavigate();

     const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setOpen(false);
     navigate("/"); 
    window.location.reload(); // simple update
  };

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
          <button onClick={() => setOpen(!open)} className="signInBtn">
            {username ? `👤 ${username}` : " 👤 Sign in"} 
          </button>
{open && (
  <div className="dropdown">

    {!username && (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Create Account</Link>
      </>
    )}

    {username && (
      <>
        <Link to="/manageAccount">Manage Account</Link>

      
        {role === "admin" && (
         
          <Link to="/admin">Admin Dashboard</Link>
      
         
        )}

       
        {role === "artist" && (
       
          <Link to="/myArt">My Art</Link>
        
        )}

        <button onClick={handleLogout}>Logout</button>
      </>
    )}

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