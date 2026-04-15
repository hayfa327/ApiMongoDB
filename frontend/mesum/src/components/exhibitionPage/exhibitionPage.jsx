import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./exhibitionPage.css";

export default function AllExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const navigate = useNavigate();

  // REVIEW: Hardcoded API URL — use an environment variable
  // REVIEW: No loading or error state UI for the user
  useEffect(() => {
    const getExhibitions = async () => {
      try {
        const res = await fetch(
          "https://mesum-api.onrender.com/api/v1/exhibitions/all",
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setExhibitions(data.exhibitions || []);
      } catch (error) {
        console.error(error);
      }
    };

    getExhibitions();
  }, []);

  return (
    <section className="exhibitionsPage">
      <div className="heroHeader">
        <h1 className="heroTitle">Exhibitions</h1>

        <p className="heroSubtitle">
          A carefully curated collection of contemporary works exploring the
          boundaries of artistic expression
        </p>
      </div>

      <div className="grid">
        {/* REVIEW: Arbitrary limit of 40 with no pagination — if there are more than 40 exhibitions, they are silently dropped */}
        {exhibitions.slice(0, 40).map((item) => (
          <div
            key={item._id}
            className="item"
            onClick={() => navigate(`/exhibitions/${item._id}`)}
          >
            <div className="imageWrapper">
              {/* REVIEW: No fallback image — if item.image is empty/null, a broken image will render. homeExhibitions.jsx has a fallback but this page doesn't. */}
              <img src={item.image} alt={item.title} />

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
    </section>
  );
}
