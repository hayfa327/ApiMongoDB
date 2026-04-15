import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user/loginPage/login";
import Register from "./components/user/registerPage/register";
import ChangePassword from "./components/user/changePasswordPage/changePassword";
import AuthMenu from "./components/user/MangeAccount/mangeAccount";
import Home from "./components/HomePage/home";
import Header from "./components/header/header";
import Update from "./components/user/updatePaymentPage/updatePayment";
import HomeExhibition from "./components/HomePage/exhibitions/homeExhibitions";
import AllExhibitions from "./components/exhibitionPage/exhibitionPage";
import CreateExhibition from "./components/user/MangeAccount/admin/createExhibition/admainCreateexibition";
import AddArtist from "./components/user/MangeAccount/admin/addArtist/addArtist";
import AdminDashboard from "./components/user/MangeAccount/admin/Dashboard/adminDashboard";
import NewsletterFooter from "./components/footer/footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* REVIEW: Placeholder route — /performances renders a plain <div> with no component */}
        <Route path="/performances" element={<div>Performances</div>} />
        <Route path="/exhibitions" element={<HomeExhibition />} />
        <Route path="/AllExhibitions" element={<AllExhibitions />} />
        {/* REVIEW: Placeholder route — /collection renders a plain <div> with no component */}
        <Route path="/collection" element={<div>Collection</div>} />
        <Route path="/addArtist" element={<AddArtist />} />
        {/* REVIEW: BUG — Exhibition detail route renders <NewsletterFooter> instead of an exhibition detail component. This should render an ExhibitionDetail component. */}
        <Route path="/exhibitions/:id" element={<NewsletterFooter />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        {/* REVIEW: Typo in route path — "/upadatPayment" should be "/updatePayment" */}
        <Route path="/upadatPayment" element={<Update />} />
        <Route path="/manageAccount" element={<AuthMenu />} />
        {/* REVIEW: No route protection — admin-only pages (/createExhibitions, /addArtist, /admin) are accessible to any user. Wrap them in a ProtectedRoute component that checks auth + role. */}
        <Route path="/createExhibitions" element={<CreateExhibition />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

{
  /* REVIEW: These npm install comments should be removed from source code — they belong in README or documentation */
}
{
  /* npm install framer-motion
npm install locomotive-scroll
npm install three
npm install @react-three/fiber
npm install @react-three/drei */
}
