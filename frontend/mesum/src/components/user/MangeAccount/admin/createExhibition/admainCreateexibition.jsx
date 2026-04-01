import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(
          "https://mesum-api.onrender.com/api/v1/users/artists"
        );
        const data = await res.json();

        setArtists(data.artists || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
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

setLoading(true);

  if (!title || !description || !startDate || !endDate || !artistId) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://mesum-api.onrender.com/api/v1/exhibitions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Exhibition created successfully ");
      navigate("/exhibitions");

    } catch (error) {
      console.error(error);
      alert("Error creating exhibition");
    }finally {
      setLoading(false);
    }
   
  };

  return (
   <section className="createPage">
      <div className="container">
    
          <div className="headerBlock">
            <div className="title"> 
       <UserPlus className="iconSvg" />
    
      <h1>Create Exhibition</h1>
     </div>
      <p className="subtitle">
         Add a new exhibition to the gallery collection
      </p>
    </div>
  

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
   <select
  value={artistId}
  onChange={(e) => setArtistId(e.target.value)}
>
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
       <button
    type="submit"
    className="primaryBtnAdd"
    disabled={!title || !description || !artistId || loading}
  >
    {loading ? "Creating..." : "CREATE EXHIBITION"}
  </button>
 

      <button type="button" className="secondaryBtn4">
        CANCEL
      </button>
    </div>

  </form>
  </div>
</section>
  );
}