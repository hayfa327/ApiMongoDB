import {useState} from "react"
import  login from "../../../assets/login.jpeg"
import {Link, useNavigate }  from "react-router-dom";
import "./login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const isDisabled = !email || !password;
  const navigate = useNavigate();

  const handleLogin = async (login) => {
    login.preventDefault();

  try {
    const response = await fetch(
      " https://mesum-api.onrender.com/api/v1/users/login",
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

     localStorage.setItem("token", data.token);
     localStorage.setItem("username", data.user.username);
    localStorage.setItem("role", data.user.role);

    navigate("/");

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
 
  };



  return (
  
    <section className="loginPage">
      
      
      <div className="loginImage">
        <img src={login} alt="gallery corridor" />


  <div className="imageText">
        <h1>Enter the living stage</h1>
        <p>Access exclusive live performances, artist talks, and contemporary art experiences from around the world.</p>
      </div>
      </div>

    
      <div className="loginContent">

 

        <div className="loginBox">
          
          <Link to="/" className="backHome">
  ←  Back to Home
</Link>
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
                onChange={(loginValue) => setPassword(loginValue.target.value)}
              />
            </div>

 
            <button type="submit" className="primaryBtn"  disabled={isDisabled} >
              Sign In
            </button>
          </form>



          <div className="links" >
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
  };
