import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/book/mybooks",
        { withCredentials: true }
      );
      setMyBooks(data.books);
    };
    fetchMyBooks();
  }, []);

  const deleteBookHandler = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/book/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <section className="my-books">
        {myBooks && myBooks.length > 0
          ? myBooks.map((element) => {
              return (
                <div className="author-blog-card" key={element._id}>
                  {element.mainImage && element.mainImage && (
                    <img src={element.mainImage.url} alt="blogImg" />
                  )}
                  <span className="category">{element.category}</span>
                  <h4>{element.title}</h4>
                  <div className="btn-wrapper">
                    <Link
                      to={`/book/update/${element._id}`}
                      className="update-btn"
                    >
                      UPDATE
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBookHandler(element._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })
          : "You have not posted any book!"}
      </section>
    </>
  );
};

export default MyBooks;