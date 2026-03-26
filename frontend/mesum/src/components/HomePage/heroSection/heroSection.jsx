import heroSection from "../../../assets/heroSection.jpeg"; // use your image
import "./heroSection.css";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroSection})` }}
    >
      <div className="heroOverlay">

        <div className="heroContent">
          <span className="heroTag">Live</span>

          <h1>Body as Canvas</h1>

          <p>
            A live performance exploring embodiment, gesture, and
            transformation through movement and visual expression.
          </p>
        </div>

      </div>
    </section>
  );
}