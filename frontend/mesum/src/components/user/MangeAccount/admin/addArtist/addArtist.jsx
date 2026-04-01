import { useState } from "react";
import "./addArtist.css";

export default function AddArtist() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in as admin");
    return;
  }

  try {
    const response = await fetch(
      "https://mesum-api.onrender.com/api/v1/users/artists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Artist created successfully 🎉");

    // reset form
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  } catch (error) {
    console.error(error);
    alert("Error creating artist");
  }
};

  return (
    <section className="addArtistPage">
      <div className="container">

        <h1>➕ Add Artist</h1>
        <p className="subtitle">
          Create a new artist account with gallery access
        </p>

        <form onSubmit={handleSubmit} className="form">

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter artist username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="artist@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <p className="hint">
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          <div className="roleBox">
            <strong>Role: Artist</strong>
            <p>
              This account will have artist privileges to manage their own exhibitions
            </p>
          </div>

          <div className="buttonRow">
            <button type="submit" className="primaryBtn">
              ADD ARTIST
            </button>

            <button type="button" className="secondaryBtn">
              CANCEL
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}