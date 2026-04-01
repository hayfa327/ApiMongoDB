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
  <Link to="/AllExhibitions">Exhibitions</Link>
  <Link to="/collection">Collections</Link>
  
</nav>

     
         <div className="rightSide">

        <div className="userMenu">
          <button className="signInBtn"
           onClick={() => setOpen(!open)}
          >
            {username ? `👤 ${username}` : " 👤 Sign in"} 
          </button>
 {open && (
  <div className="dropdown">

    {!username && (
      <>
        <Link to="/login" onClick={() => setOpen(false)} >Login</Link>
        <Link to="/register"  onClick={() => setOpen(false)} >Create Account</Link>
      </>
    )}

    {username && (
      <>
        <Link to="/manageAccount" onClick={() => setOpen(false)} >Manage Account</Link>

      
        {role === "admin" && (
         
          <Link to="/admin" onClick={() => setOpen(false)}  >Admin Dashboard</Link>
      
         
        )}

       
        {role === "artist" && (
       
          <Link to="/myArt" onClick={() => setOpen(false)}  >My Art</Link>
        
        )}

        <button onClick={handleLogout}>Logout</button>
      </>
    )}

  </div>
 )}  
  </div>      
  
      </div>

    </header>
  );
}   