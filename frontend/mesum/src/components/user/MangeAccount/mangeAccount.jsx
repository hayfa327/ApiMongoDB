import { Link } from "react-router-dom";
import "./mangeAccount.css";

export default function AuthMenu() {
     const role = localStorage.getItem("role");

  return (
    <section className="managePage">
      <div className="manageContent"> 
      <h1>Living Art Platform</h1>
      <p>Museum Account Management</p>
  </div>
     
      {role === "visitor" && (
        <div className="actions">
           <Link to="/upadatPayment" className="primaryBtn" >Update Payment</Link>
          <Link to="/changePassword" className="primaryBtn">Change Password</Link>
        </div>
      )}

      
      {role === "artist" && (
        <div className="actions">
          <Link to="/ArtsitArtwork" className="primaryBtn" >Edit Artwork</Link >
         <Link to="/upadatPayment" className="primaryBtn" >Update Payment</Link>
          <Link to="/changePassword" className="primaryBtn" >Change Password</Link>
        </div>
      )}

       {role === "admin" && (
        <div className="actions">
           <Link to="/changePassword" className="primaryBtn" >Change Password</Link>
          <Link to="/createExibitions" className="primaryBtn" > Create Exhibition</Link>
          <Link to="/createTheater" className="primaryBtn" > Create Theater</Link>
           <Link to="/createConcert" className="primaryBtn" > Create Concert</Link>
           
        </div>
      )}
    </section>
  );
}