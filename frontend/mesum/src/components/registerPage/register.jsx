import { useState } from "react";
import {useNavigate} from "react-router-dom"
import  changePassword  from  "../../assets/changePassword.png"


export default function Register() {

const navigataRrgister = useNavigate; 

const [username, setUsername] = useState(""); 
const [email, setEmail] = useState(""); 
const [password, setPassword] = useState("")

const handleRegister = async (userRegister) => {
userRegister.preventDefault() ; 

try {
  const response = await fetch (
    "https://mesum-api.onrender.com/api/v1/users/register",
    {
      method: "Post", 
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify(
        {
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

       
      alert("User registered successfully ");

    
      navigataRrgister("/");

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

 return (
    <section>
      <img src={changePassword} alt="picture desin for the register page" />
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(registerValue) => setUsername(registerValue.target.value)}
        />

        <input
          type="email"
          placeholder="Email@example.com"
          value={email}
          onChange={(registerValue) => setEmail(registerValue.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(registerValue) => setPassword(registerValue.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}


