import { useState } from "react";
import "./footer.css";

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");

  // REVIEW: handleSubmit only logs to console and resets state — no actual API call to subscribe the user. Implement a real subscription endpoint or remove the form.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);

    setEmail("");
  };

  return (
    <footer className="newsletter-footer">
      <div className="newsletter-container">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay informed about upcoming exhibitions and exclusive events</p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    </footer>
  );
}
