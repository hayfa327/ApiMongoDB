import { PlusCircle, UserPlus, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

export default function AdminDashboard() {


  const navigate = useNavigate();
  return (
    <section className="adminPage">

      <h1 className="title">Admin Dashboard</h1>
      <p className="subtitle">Manage exhibitions and artists</p>

     
      <div className="cardGrid">

        <div className="card"  onClick={() => navigate("/createExhibitions")} >
          <PlusCircle className="icon" />
          <h3>Create Exhibition</h3>
          <p>Add a new exhibition to the gallery with artwork, dates, and artist information</p>
        </div>

        <div className="card" onClick={() => navigate("/addArtist")}>
          <UserPlus className="icon" />
          <h3>Add Artist</h3>
          <p>Create a new artist account with gallery access and exhibition privileges</p>
        </div>

        <div className="card" onClick={() => navigate("/AllExhibitions")}>
          <LayoutGrid className="icon" />
          <h3>View Exhibitions</h3>
          <p>Browse all current and upcoming exhibitions in the gallery collection</p>
        </div>

      </div>

   
      <div className="divider"></div>

      
      <h2 className="statsTitle">Quick Stats</h2>

      <div className="statsGrid">
        <div className="statCard">
          <h2>8</h2>
          <p>Total Exhibitions</p>
        </div>

        <div className="statCard">
          <h2>24</h2>
          <p>Registered Artists</p>
        </div>

        <div className="statCard">
          <h2>3</h2>
          <p>Active Now</p>
        </div>
      </div>

    </section>
  );
}