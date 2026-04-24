import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleExhibition.css";

export default function SingleExhibition() {
  const { id } = useParams();

  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        const res = await fetch(
          `https://mesum-api.onrender.com/api/v1/exhibitions/exhibitions/${id}`
        );

        const data = await res.json();
        setExhibition(data.exhibition);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibition();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!exhibition) return <h2>Exhibition not found</h2>;

  return (
    <section className="singleExhibition">

      <div className="heroImage">
        <img src={exhibition.image} alt={exhibition.title} />
      </div>

      <div className="details">
        <h1>{exhibition.title}</h1>

        <p className="artist">
          Curated by {exhibition.artist?.username}
        </p>

        <p className="dates">
          {new Date(exhibition.startDate).toLocaleDateString()} –{" "}
          {new Date(exhibition.endDate).toLocaleDateString()}
        </p>

        <p className="description">
          {exhibition.description}
        </p>
      </div>

      <div className="gallery">
        <h2>Featured Artworks</h2>

        <div className="artGrid">
          {exhibition.artworks.map((art) => (
            <div key={art._id} className="artCard">
              <img src={art.image} alt={art.title} />
              <p>{art.title}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}