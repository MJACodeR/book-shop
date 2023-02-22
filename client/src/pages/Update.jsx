import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });

  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Right way to change state
  };

  const handleUpdateBook = async () => {
    try {
      let response = await fetch(`/api/book/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      response = await response.json();
      if (response.success) return navigate("/");
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="update-form">
      <h1>Update new book</h1>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="description"
        onChange={handleChange}
      />
      <input
        type="text"
        name="cover"
        id="cover"
        placeholder="cover"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        id="price"
        placeholder="price"
        onChange={handleChange}
      />

      <button className="update-form-btn" onClick={handleUpdateBook}>
        Update
      </button>
    </div>
  );
};

export default Update;
