import { useState } from "react";
import changeImg from "../../../assets/changeImg.png"
import {Link , useNavigate}  from "react-router-dom";
import "./changePassword.css"

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (changePass) => {
    changePass.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://mesum-api.onrender.com/api/v1/users/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Password changed successfully");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="authSplit">
 
  <div className="authLeft">
    <div className="authCard">
     <Link to="/" className="backHome">
  ←  Back to Home
</Link>
      <h1>Change Password</h1>
      <p className="subtitle">Update your password securely</p>

      <form onSubmit={handleChangePassword}>

        <div className="inputGroup">
          <label>Old Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={oldPassword}
            onChange={(changeValue) => setOldPassword(changeValue.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(changeValue) => setNewPassword(changeValue.target.value)}
          />
        </div>

        <button type="submit" className="primaryBtn">
          Update Password
        </button>

      </form>

    </div>
  </div>
 
  <div
    className="authRight"
    style={{ backgroundImage: `url(${changeImg})` }}
  >
    <div className="imageOverlay">
      <div className="imageText">
        <h1>Secure your account</h1>
        <p>Keep your access protected and safe.</p>
      </div>
    </div>
  </div>

</section>
  )
      
}