import { Link } from "react-router-dom";
import "./mangeAccount.css";

// REVIEW: No authentication check — this page reads role from localStorage which can be freely tampered with by the user via browser dev tools
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
          <Link to="/upadatPayment" className="primaryBtn1">
            Update Payment
          </Link>
          <Link to="/changePassword" className="primaryBtn2">
            Change Password
          </Link>
        </div>
      )}

      {/* REVIEW: /ArtsitArtwork route does not exist in App.jsx (also has a typo — "Artsit" should be "Artist") */}
      {role === "artist" && (
        <div className="actions">
          <Link to="/ArtsitArtwork" className="primaryBtn1">
            Edit Artwork
          </Link>
          <Link to="/upadatPayment" className="primaryBtn2">
            Update Payment
          </Link>
          <Link to="/changePassword" className="primaryBtn2">
            Change Password
          </Link>
        </div>
      )}

      {/* REVIEW: /addAdmin and /getAllUser routes do not exist in App.jsx — these links lead to blank pages */}
      {role === "admin" && (
        <div className="actions">
          <Link to="/changePassword" className="primaryBtn1">
            Change Password
          </Link>
          <Link to="/upadatPayment" className="primaryBtn2">
            Update Payment
          </Link>
          <Link to="/addAdmin" className="primaryBtn2">
            {" "}
            Add and Delete Admin
          </Link>
          <Link to="/getAllUser" className="primaryBtn2">
            {" "}
            get all User
          </Link>
        </div>
      )}
    </section>
  );
}
