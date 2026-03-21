import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from "./components/login/login"
import Home from "./components/HomePage/home/home"


export default function App() {



  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
   <Route path="/home" element={<Home />} />

</Routes>
</BrowserRouter>
  );
}


/* npm install framer-motion
npm install locomotive-scroll
npm install three
npm install @react-three/fiber
npm install @react-three/drei */