import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Right way to change state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      response = await response.json();

      if(response.success) return navigate("/");
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="add-form">
      <h1>Add new book</h1>
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

      <button className="add-form-btn" onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default Add;
