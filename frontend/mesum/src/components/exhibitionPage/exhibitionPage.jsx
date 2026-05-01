import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./exhibitionPage.css" ;

export default function HomeExhibition() {
  const [exhibitions, setExhibitions] = useState([]);
  const [index, setIndex] = useState(0);
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

  const next = () => {
    setIndex((prev) =>
      prev === exhibitions.length - 1 ? prev : prev + 1
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? 0 : prev - 1
    );
  };

  return (
    <section className="verticalSlider">

      <div
        className="sliderWrapper"
        style={{
          transform: `translateY(-${index * 100}vh)`
        }}
      >
        {exhibitions.map((item) => (
          <div className="slide" key={item._id}>

            <img src={item.image} alt={item.title} />

            <div className="content">
              <h1>{item.title}</h1>
              <p>{item.artist?.username}</p>

              <button
                onClick={() =>
                  navigate(`/exhibitions/${item._id}`)
                }
              >
                Explore Exhibition →
              </button>
            </div>

          </div>
        ))}
      </div>

     
      <button className="downBtn" onClick={next}>
        ↓
      </button>

      
      <button className="upBtn" onClick={prev}>
        ↑
      </button>

    </section>
  );
}