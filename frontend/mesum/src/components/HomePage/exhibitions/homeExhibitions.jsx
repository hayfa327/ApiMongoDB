import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeExhibitions.css";

export default function HomeExhibition() {
  const [exhibitions, setExhibitions] = useState([]);
  const navigate = useNavigate();

  // REVIEW: Hardcoded API URL — extract to an environment variable (e.g., VITE_API_URL) so it can differ between dev/staging/production
  // REVIEW: No loading state — user sees nothing while data is being fetched
  // REVIEW: No error state UI — if the fetch fails, the user sees no feedback
  // REVIEW: console.log(data) is debug code — remove for production
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
      <div className="heroHeader">
        <h1 className="heroTitle">Exhibitions</h1>

        <p className="heroSubtitle">
          A carefully curated collection of contemporary works exploring the
          boundaries of artistic expression
        </p>
      </div>

      <div className="grid">
        {exhibitions.slice(0, 3).map((item) => (
          <div
            key={item._id}
            className="item"
            onClick={() => navigate(`/exhibitions/${item._id}`)}
          >
            <div className="imageWrapper1">
              <img src={item.image || "/fallback.jpg"} alt={item.title} />

              <button className="hoverBtn">View Exhibition →</button>
            </div>

            <div className="info">
              <h3>{item.title}</h3>
              <p className="artist">{item.artist?.username}</p>
              <p className="date">
                {new Date(item.startDate).toLocaleDateString()} –{" "}
                {new Date(item.endDate).toLocaleDateString()}
              </p>
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
