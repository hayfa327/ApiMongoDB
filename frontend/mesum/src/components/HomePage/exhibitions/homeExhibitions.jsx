 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeExhibitions.css";

export default function  HomeExhibition () {
  const [exhibitions, setExhibitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://mesum-api.onrender.com/api/v1/exhibitions/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);  
        setExhibitions(data.exhibitions);  
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="homeExhibitions">
  

      <h2>Current Exhibitions</h2>

    <div className="grid">
  {exhibitions.slice(0, 3).map((item) => (
    <div key={item._id} className="card">

      
      <div
        className="cardImg"
        style={{
          backgroundImage: `url(${item.image || "https://picsum.photos/400/300"})`
        }}
      >
        <span className="badge">LIVE NOW</span>
      </div>

      
      <div className="cardContent">

        <p className="category">EXHIBITION</p>

        <h3>{item.title}</h3>

        <p className="artist">by {item.artist?.username}</p>

        <p className="desc">
          {item.description.slice(0, 80)}...
        </p>

        <p className="date">
          {new Date(item.startDate).toLocaleDateString()}
        </p>

        <button
          className="primaryBtn"
          onClick={() => navigate(`/exhibitions/${item._id}`)}
        >
          View Exhibition
        </button>

      </div>
    </div>
  ))}
</div>
<div className="viewAll">
  <button onClick={() => navigate("/AllExhibitions")}>
    View All Exhibitions →
  </button>
</div>
    </section>
  );
}