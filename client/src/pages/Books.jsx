import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      let response = await fetch("/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      return setBooks(response);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      let response = await fetch(`/api/book/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      if (response.success) return fetchAllBooks(); // Change the UI after deletion is successful
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => {
          return (
            <div key={book.id} className="book">
              <img src={book?.cover} alt={book.title} />
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <span>{book.price}</span>
              <button
                className="delete"
                onClick={() => handleDeleteBook(book.id)}
              >
                Delete
              </button>
              <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
          );
        })}
      </div>

      <Link to="/add">
        <button>Add new book</button>
      </Link>
    </div>
  );
};

export default Books;
