import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeExhibitions.css";

export default function HomeExhibition() {
  const [exhibitions, setExhibitions] = useState([]);
  const [searchArtist, setSearchArtist] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const res = await fetch(
          "https://mesum-api.onrender.com/api/v1/exhibitions/all"
        );

        const data = await res.json();

        setExhibitions(data.exhibitions || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExhibitions();
  }, []);

  const searchByArtist = async () => {
    try {
      const res = await fetch(
        "https://mesum-api.onrender.com/api/v1/exhibitions/all"
      );

      const data = await res.json();

      const filtered = data.exhibitions.filter((item) =>
        item.artist?.username
          .toLowerCase()
          .includes(searchArtist.trim().toLowerCase())
      );

      setExhibitions(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const resetExhibitions = async () => {
    try {
      const res = await fetch(
        "https://mesum-api.onrender.com/api/v1/exhibitions/all"
      );

      const data = await res.json();

      setExhibitions(data.exhibitions || []);
      setSearchArtist("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="homeExhibitions">

      <div className="heroHeader">
        <h1 className="heroTitle">Exhibitions</h1>

        <p className="heroSubtitle">
          A carefully curated collection of contemporary works exploring
          the boundaries of artistic expression
        </p>

        {/* Search */}
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search by artist name..."
            value={searchArtist}
            onChange={(e) => setSearchArtist(e.target.value)}
          />

          <button onClick={searchByArtist}>
            Search
          </button>

          <button onClick={resetExhibitions}>
            Reset
          </button>
        </div>
      </div>

      <div className="grid">
        {exhibitions.slice(0, 3).map((item) => (
          <div
            key={item._id}
            className="item"
            onClick={() => navigate(`/exhibitions/${item._id}`)}
          >
            <div className="imageWrapper1">
              <img
                src={item.image || "/fallback.jpg"}
                alt={item.title}
              />

              <button
                className="hoverBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/exhibitions/${item._id}`);
                }}
              >
                View Exhibition →
              </button>
            </div>

            <div className="info">
              <h3>{item.title}</h3>

              <p className="artist">
                {item.artist?.username}
              </p>

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