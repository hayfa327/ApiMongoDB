import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./adminCreateExhibition.css";

export default function CreateExhibition() {
 const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState("");

  const navigate = useNavigate();

 
useEffect(() => {
  fetch("https://mesum-api.onrender.com/api/v1/users/all") // or your route
    .then(res => res.json())
    .then(data => {
      // filter only artists
      const onlyArtists = data.users.filter(u => u.role === "artist");
      setArtists(onlyArtists);
    });
}, []);

    const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl); // show preview
    setImage(imageUrl);   // (temporary) save to send to backend
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const token = localStorage.getItem("token");

      if (!token) {
  alert("You must login first");
  return;
}

    try {
      const response = await fetch(
        "https://mesum-api.onrender.com/api/v1/exhibitions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            description,
            startDate,
            artistId,
            endDate,
            image,
          }),
        }
      );

      const data = await response.json();
 

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Exhibition created successfully ");
      navigate("/exhibitions");

    } catch (error) {
      console.error(error);
      alert("Error creating exhibition");
    }
   
  };

  return (
   <section className="createPage">
  <h1>Create Exhibition</h1>
  <p className="subtitle">
    Add a new exhibition to the gallery collection
  </p>

  <form onSubmit={handleSubmit} className="form">

    <label>Exhibition Image</label>
  <div className="imageUpload">

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
  />

  {preview ? (
    <img src={preview} className="previewImg" />
  ) : (
    <>
      <p>Click to upload or drag and drop</p>
      <span>PNG, JPG up to 10MB</span>
    </>
  )}

</div>

    <label>Exhibition Title</label>
    <input
  type="text"
  placeholder="Enter exhibition title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

    <label>Description</label>
    <textarea 
      placeholder="Enter exhibition description" 
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <label>Artist ID</label>
   <select value={artistId} onChange={(e) => setArtistId(e.target.value)}>
  <option value="">Select Artist</option>
  {artists.map((artist) => (
    <option key={artist._id} value={artist._id}>
      {artist.username}
    </option>
  ))}
</select>

    <div className="dateRow">
      <div>
        <label>Start Date</label>
        <input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
/>
      </div>

      <div>
        <label>End Date</label>
         <input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
/>
      </div>
    </div>

    <div className="buttonRow">
      <button type="submit" className="primaryBtn3">
        CREATE EXHIBITION
      </button>

      <button type="button" className="secondaryBtn4">
        CANCEL
      </button>
    </div>

  </form>
</section>
  );
}