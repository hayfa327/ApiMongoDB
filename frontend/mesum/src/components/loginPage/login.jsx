import {useState} from "react"
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.png"
import {Link}  from "react-router-dom";
import "./login.css"

 

export default function Login() {


  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (loginFunction) => {
    loginFunction.preventDefault();

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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("SUCCESS:", data);
 
      localStorage.setItem("token", data.token);
      navigate("/home")

    } catch (error) {
      console.error(error);
       alert("Something went wrong");
    }
  };

  return (
    <section className="loginPart">
      <img src={login} alt="login visual" />

      <h1>Welcome Back</h1>
      <p>Log in to your account</p>

      <form className="loginForm" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email@example.com"
          value={email}
          onChange={(loginValue) => setEmail(loginValue.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(loginValue) => setPassword(loginValue.target.value)}
        />

        <button type="submit">Log In</button>
      </form>

      <p>
        Don't have an account?
        <Link to="/register"> Sign Up </Link>
      </p>

      <p>Change Password 
         <Link to="/changePassword"> here</Link>
      </p>
    </section>
  );
}