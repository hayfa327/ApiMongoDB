import { useState } from "react";
import changeImg from "../../../assets/changeImg.png";
import { Link, useNavigate } from "react-router-dom";
import "./changePassword.css";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const isDisabled = !oldPassword || !newPassword;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (changePass) => {
    changePass.preventDefault();

    setError("");

    if (!oldPassword || !newPassword) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      // REVIEW: Hardcoded API URL — use an environment variable
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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to change password");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <section className="authSplit">
      <div className="authLeft">
        <div className="authCard">
          <Link to="/" className="backHome">
            ← Back to Home
          </Link>

          {error && <p className="errorMsg">{error}</p>}
          <h1>Change Password</h1>
          <p className="subtitle">Update your password securely</p>

          <form onSubmit={handleChangePassword}>
            <div className="inputGroup">
              <label>Old Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(changeValue) =>
                  setOldPassword(changeValue.target.value)
                }
              />
            </div>

            <div className="inputGroup">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(changeValue) =>
                  setNewPassword(changeValue.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="primaryBtn"
              disabled={isDisabled || loading}
            >
              {loading ? "Updating..." : "Update Password"}
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
  );
}
