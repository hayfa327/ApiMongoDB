import { useState } from "react";
import {useNavigate} from "react-router-dom"
import registerimg from "../../assets/registerImg.jpeg"
import {Link}  from "react-router-dom";
import "./register.css"


export default function Register() {
  const navigateRegister = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (register) => {
    register.preventDefault();

    try {
      const response = await fetch(
        "https://mesum-api.onrender.com/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      alert("User registered successfully");
      navigateRegister("/");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };


  return (
  <section
  className="registerPage"
  style={{ backgroundImage: `url(${registerimg})` }}
>
  <div className="overlay">
    <div className="registerBox">

      <h1>Create Account</h1>
      <p className="subtitle">Sign up to get started</p>

      <form onSubmit={handleRegister}>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(registerValue) => setUsername(registerValue.target.value)}
          />
        </div>

        <div className="inputGroup">
          <input
            type="email"
            placeholder="Email@example.com"
            value={email}
            onChange={(registerValue) => setEmail(registerValue.target.value)}
          />
        </div>

        <div className="inputGroup">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(registerValue) => setPassword(registerValue.target.value)}
          />
        </div>

        <Link to="/" className="primaryBtn">
          Sign Up
        </Link>

        <div className="divider">
          <span>or</span>
        </div>

        <Link to="/" className="secondaryBtn">
  Continue as guest
</Link>
      </form>
    </div>
  </div>
</section>
  )

}


