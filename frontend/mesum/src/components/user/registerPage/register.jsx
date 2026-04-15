import { useState } from "react";
import { useNavigate } from "react-router-dom";
import changgeImg from "../../../assets/changeImg.png";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigateRegister = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // REVIEW: isDisabled doesn't check username — the button is enabled even if username is empty, although handleRegister will catch it. Should be: !username || !email || !password
  const isDisabled = !email || !password;

  // REVIEW: Hardcoded API URL — use an environment variable
  const handleRegister = async (register) => {
    register.preventDefault();

    setError("");

    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

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
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigateRegister("/login");
    } catch (error) {
      console.error(error);
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <section className="registerPage">
      <div
        className="registerImage"
        style={{ backgroundImage: `url(${changgeImg})` }}
      >
        <div className="imageOverlay">
          <div className="imageText">
            <h1>Enter the living stage</h1>
            <p>
              Access exclusive performances and contemporary art experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="registerContent">
        <div className="registerBox">
          <Link to="/" className="backHome">
            ← Back to Home
          </Link>
          {error && <p className="errorMsg">{error}</p>}
          <h1>Create Account</h1>
          <p className="subtitle">Start your journey</p>

          <form onSubmit={handleRegister}>
            <div className="inputGroup">
              <label>Username</label>
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(registerValue) =>
                  setUsername(registerValue.target.value)
                }
              />
            </div>

            <div className="inputGroup">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email@example.com"
                value={email}
                onChange={(registerValue) =>
                  setEmail(registerValue.target.value)
                }
              />
            </div>

            <div className="inputGroup">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(registerValue) =>
                  setPassword(registerValue.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="primaryBtn"
              disabled={isDisabled || loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <Link to="/" className="secondaryBtn">
              Continue as guest
            </Link>

            <p className="loginLink">
              Already have an account?
              <Link to="/login"> Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
