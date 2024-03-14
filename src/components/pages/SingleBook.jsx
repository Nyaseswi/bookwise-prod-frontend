import  { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleBook = () => {
  const { mode,  isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const { data } = await axios.get(
          `https://lionfish-app-n4s9i.ondigitalocean.app/api/v1/book/singlebook/${id}`,
          { withCredentials: true }
        );
        setBook(data.book);
      } catch (error) {
        setBook({});
        console.log(error);
      }
    };
    getSingleBook();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <article
      className={mode === "dark" ? "dark-bg singleBook" : "light-bg singleBook"}
    >
      {book && (
        <section className="container">
          <div className="category">{book.category}</div>
          <h1>{book.title}</h1>
          <div className="writer_section">
            <div className="author">
              <img src={book.authorAvatar} alt="author_avatar" />
              <p>{book.authorName}</p>
            </div>
          </div>
          {book && book.mainImage && (
            <img
              src={book.mainImage.url}
              alt="mainBookImg"
              className="mainImg"
            />
          )}
          <p className="intro-text">{book.intro}</p>
          <div className="sub-para">
            <h3>{book.paraOneTitle}</h3>
            {book && book.paraOneImage && (
              <img src={book.paraOneImage.url} alt="paraOneImg" />
            )}
            <p>{book.paraOneDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{book.paraTwoTitle}</h3>
            {book && book.paraTwoImage && (
              <img src={book.paraTwoImage.url} alt="paraOneImg" />
            )}
            <p>{book.paraThreeDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{book.paraThreeTitle}</h3>
            <p>{book.paraThreeDescription}</p>
            {book && book.paraThreeImage && (
              <img src={book.paraThreeImage.url} alt="paraOneImg" />
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBook;