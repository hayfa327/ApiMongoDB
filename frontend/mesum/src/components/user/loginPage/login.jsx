import { useState } from "react";
// REVIEW: The imported image is named "login" which shadows/conflicts with the event parameter also named "login" in handleLogin (line 15). Rename the import to e.g. "loginImg".
import login from "../../../assets/login.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // REVIEW: Parameter "login" shadows the imported image variable. Rename to "e" or "event".
  // REVIEW: Hardcoded API URL — use an environment variable
  const handleLogin = async (login) => {
    login.preventDefault();

    setError(""); // reset error

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://mesum-api.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);

      navigate("/");

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  // REVIEW: SECURITY — Demo credentials are hardcoded in the frontend source code. Anyone can see these in the browser's dev tools. Consider removing for production or using a dedicated demo endpoint.
  // REVIEW: If an invalid role is passed, credentials will be undefined and the fetch will send undefined as the body.
  const loginDemo = async (role) => {
    setError("");
    setLoading(true);

    let credentials;

    if (role === "admin") {
      credentials = {
        email: "admin@test.com",
        password: "Admin123",
      };
    }

    if (role === "artist") {
      credentials = {
        email: "artist@test.com",
        password: "Artist123",
      };
    }

    if (role === "visitor") {
      credentials = {
        email: "visitor@test.com",
        password: "Visitor123",
      };
    }

    try {
      const response = await fetch(
        "https://mesum-api.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Demo login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginPage">
      <div className="loginImage">
        <img src={login} alt="gallery corridor" />

        <div className="imageText">
          <h1>Enter the living stage</h1>
          <p>
            Access exclusive live performances, artist talks, and contemporary
            art experiences from around the world.
          </p>
        </div>
      </div>

      <div className="loginContent">
        <div className="loginBox">
          <Link to="/" className="backHome">
            ← Back to Home
          </Link>

          {error && <p className="errorMsg">{error}</p>}
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to access your account</p>

          <form className="loginForm" onSubmit={handleLogin}>
            <div className="inputGroup">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Email@example.com"
                value={email}
                onChange={(loginValue) => setEmail(loginValue.target.value)}
              />
            </div>

            <div className="inputGroup">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="primaryBtn"
              disabled={!email || !password || loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="demoLogin">
            <span>Quick Demo Access</span>

            <button onClick={() => loginDemo("admin")}>Login as Admin</button>

            <button onClick={() => loginDemo("artist")}>Login as Artist</button>

            <button onClick={() => loginDemo("visitor")}>
              Login as Visitor
            </button>
          </div>

          <div className="links">
            <div className="divider">
              <span>OR</span>
            </div>
            <div className="accountLink">
              <p>Don't have an account?</p>
              <Link to="/register" className="secondaryBtn">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
