import { Link } from "react-router-dom";
import "./mangeAccount.css";

export default function AuthMenu() {
     const role = localStorage.getItem("role");

  return (
    <section className="managePage">
      <h1>Manage Account</h1>

     
      {role === "visitor" && (
        <div className="actions">
           <Link to="/upadatPayment">Update Payment</Link>
          <Link to="/changePassword">Change Password</Link>
        </div>
      )}

      
      {role === "artist" && (
        <div className="actions">
          <button>Edit Artwork</button>
         <Link to="/upadatPayment">Update Payment</Link>
          <Link to="/changePassword">Change Password</Link>
        </div>
      )}

       {role === "admin" && (
        <div className="actions">
           <Link to="/changePassword">Change Password</Link>
          <button>Create Exhibition</button>
          <button>Create Theater</button>
          <button>Create Concert</button>
          <button>Add Artist</button>
        </div>
      )}
    </section>
  );
}