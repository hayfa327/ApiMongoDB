import { useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <section>
      <h1>Change Password</h1>

      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(changePasswordValue) => setOldPassword(changePasswordValue.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(changePasswordValue) => setNewPassword(changePasswordValue.target.value)}
        />

        <button type="submit">Change Password</button>
      </form>
    </section>
  );
}