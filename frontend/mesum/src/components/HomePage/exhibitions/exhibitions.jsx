 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeExhibitions.css";

export default function HomeExhibitions() {
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
        {exhibitions.slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="card"
            onClick={() => navigate(`/exhibitions/${item._id}`)}
          >
            <div className="cardImg"></div>

            <div className="cardContent">
              <h3>{item.title}</h3>

              <p className="artist">
                by {item.artist?.username}
              </p>

              <p>
                {item.description.slice(0, 60)}...
              </p>

              <span className="date">
                {new Date(item.startDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}