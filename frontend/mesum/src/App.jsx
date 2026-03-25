import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from "./components/user/loginPage/login"
import Register from "./components/user/registerPage/register"
import ChangePassword from "./components/user/changePasswordPage/changePassword"
import AuthMenu from "./components/user/MangeAccount/mangeAccount"
import Home from "./components/HomePage/home"
 


export default function App() {



  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register"  element={< Register />} />
  <Route path="/changePassword" element={< ChangePassword />} />
  <Route path="/manageAccount" element={< AuthMenu />} />
  
</Routes>
</BrowserRouter>
  );
}


/* npm install framer-motion
npm install locomotive-scroll
npm install three
npm install @react-three/fiber
npm install @react-three/drei */