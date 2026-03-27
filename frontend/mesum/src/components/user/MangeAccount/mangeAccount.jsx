import { Link } from "react-router-dom";
import "./mangeAccount.css";

export default function AuthMenu() {
  return (
    <section className="menuPage">

      <div className="menuContent">
        <h1>Living Art Platform</h1>
        <p>Museum Account Management</p>

        <div className="menuButtons">
          <Link to="" className="primaryBtn">
            Update Payment
          </Link>

          <Link to="/changePassword" className="secondaryBtn">
            Change Password
          </Link>
        </div>
      </div>

    </section>
  );
}