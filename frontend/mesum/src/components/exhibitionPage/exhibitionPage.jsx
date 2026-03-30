import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./exhibitionPage.css"

export default function AllExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://mesum-api.onrender.com/api/v1/exhibitions/all")
      .then((res) => res.json())
      .then((data) => {
        setExhibitions(data.exhibitions);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="exhibitionsPage">

      <h1>All Exhibitions</h1>

      <div className="grid">
        {exhibitions.map((item) => (    

          <div key={item._id} className="card">

            <div
              className="cardImg"
              style={{
                backgroundImage: `url(${item.image || "https://picsum.photos/400/300"})`
              }}
            >
              <span className="badge">EXHIBITION</span>
            </div>

            <div className="cardContent">
              <h3>{item.title}</h3>

              <p className="artist">
                by {item.artist?.username}
              </p>

              <p className="desc">
                {item.description.slice(0, 80)}...
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

    </section>
  );
}