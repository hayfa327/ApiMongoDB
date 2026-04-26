import { useState } from "react";

export default function ArtistExhibitionsDebug() {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getArtistExhibitions = async () => {
    try {
      setLoading(true);
      setError("");

      const artistId = "69d021de0618c006cbeb81fd";

      const res = await fetch(
        `https://mesum-api.onrender.com/api/v1/exhibitions/artist/${artistId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch exhibitions");
      }

      const data = await res.json();

      console.log(data);

      setExhibitions(data.exhibitions || []);

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "40px" }}>

      <button
        onClick={getArtistExhibitions}
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Test Artist Exhibitions API
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <div style={{ marginTop: "30px" }}>
        {exhibitions.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px"
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "250px",
                height: "180px",
                objectFit: "cover"
              }}
            />

            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <p>
              Artist: {item.artist?.username}
            </p>

            <p>
              {new Date(item.startDate).toLocaleDateString()} -{" "}
              {new Date(item.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}