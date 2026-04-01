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
           <Link to="/upadatPayment" className="primaryBtn1" >Update Payment</Link>
          <Link to="/changePassword" className="primaryBtn2">Change Password</Link>
        </div>
      )}

      
      {role === "artist" && (
        <div className="actions">
          <Link to="/ArtsitArtwork" className="primaryBtn1" >Edit Artwork</Link >
         <Link to="/upadatPayment" className="primaryBtn2" >Update Payment</Link>
          <Link to="/changePassword" className="primaryBtn2" >Change Password</Link>
        </div>
      )}

       {role === "admin" && (
        <div className="actions">
           <Link to="/changePassword" className="primaryBtn1" >Change Password</Link>
          <Link to="/createExhibitions" className="primaryBtn2" > Create Exhibition</Link>
          <Link to="/addArtist" className="primaryBtn2" > Add Artist</Link>
           <Link to="createPerformance" className="primaryBtn2" > Create Performance</Link>
           
        </div>
      )}
    </section>
  );
}