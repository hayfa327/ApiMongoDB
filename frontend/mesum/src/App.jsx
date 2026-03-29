import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from "./components/user/loginPage/login"
import Register from "./components/user/registerPage/register"
import ChangePassword from "./components/user/changePasswordPage/changePassword"
import AuthMenu from "./components/user/MangeAccount/manageVisitorAccount/mangeAccount"
import Home from "./components/HomePage/home"
import Header from "./components/header/header"
import Update from "./components/user/updatePaymentPage/updatePayment"
 


export default function App() {



  return (
<BrowserRouter>

<Header /> 
<Routes>
  <Route path="/" element={<Home />} />
<Route path="/performances" element={<div>Performances</div>} />
<Route path="/exhibitions" element={<div>Exhibitions</div>} />
<Route path="/collection" element={<div>Collection</div>} />
<Route path="/artists" element={<div>Artists</div>} />
 
  <Route path="/login" element={<Login />} />
  <Route path="/register"  element={< Register />} />
  <Route path="/changePassword" element={< ChangePassword />} />
    <Route path="/upadatPayment" element={< Update />} />
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