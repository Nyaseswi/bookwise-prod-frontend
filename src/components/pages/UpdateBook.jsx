import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Context } from "../../main";

const UpdateBook = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [paraThreeTitle, setParaThreeTitle] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [paraThreeDescription, setParaThreeDescription] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(
          `https://lionfish-app-n4s9i.ondigitalocean.app/api/v1/book/singlebook/${id}`,
          { withCredentials: true }
        );
        setTitle(data.book.title);
        setIntro(data.book.intro);
        setCategory(data.book.category);
        setPublished(data.book.published);
        setMainImage(data.book.mainImage.url);
        setParaOneTitle(data.book.paraOneTitle);
        setParaOneDescription(data.book.paraOneDescription);
        data.book.paraOneImage && setParaOneImage(data.book.paraOneImage.url);
        setParaTwoTitle(data.book.paraTwoTitle);
        setParaTwoDescription(data.book.paraTwoDescription);
        data.book.paraTwoImage && setParaTwoImage(data.book.paraTwoImage.url);
        setParaThreeTitle(data.book.paraThreeTitle);
        setParaThreeDescription(data.book.paraThreeDescription);
        data.book.paraThreeImage &&
          setParaThreeImage(data.book.paraThreeImage.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBook = new FormData();
    updatedBook.append("title", title);
    updatedBook.append("intro", intro);
    updatedBook.append("category", category);
    console.log(published);
    updatedBook.append("published", published);
    updatedBook.append("mainImage", mainImage);
    if (paraOneTitle && paraOneTitle.length !== 0) {
      updatedBook.append("paraOneTitle", paraOneTitle);
    } else {
      updatedBook.append("paraOneTitle", "");
    }
    if (paraOneDescription && paraOneDescription.length !== 0) {
      updatedBook.append("paraOneDescription", paraOneDescription);
    } else {
      updatedBook.append("paraOneDescription", "");
    }
    if (paraOneImage) {
      updatedBook.append("paraOneImage", paraOneImage);
    }
    if (paraTwoTitle && paraTwoTitle.length !== 0) {
      updatedBook.append("paraTwoTitle", paraTwoTitle);
    } else {
      updatedBook.append("paraTwoTitle", "");
    }
    if (paraTwoDescription && paraTwoDescription.length !== 0) {
      updatedBook.append("paraTwoDescription", paraTwoDescription);
    } else {
      updatedBook.append("paraTwoDescription", "");
    }
    if (paraTwoImage) {
      updatedBook.append("paraTwoImage", paraTwoImage);
    }
    if (paraThreeTitle && paraThreeTitle.length !== 0) {
      updatedBook.append("paraThreeTitle", paraThreeTitle);
    } else {
      updatedBook.append("paraThreeTitle", "");
    }
    if (paraThreeDescription && paraThreeDescription.length !== 0) {
      updatedBook.append("paraThreeDescription", paraThreeDescription);
    } else {
      updatedBook.append("paraThreeDescription", "");
    }
    if (paraThreeImage) {
      updatedBook.append("paraThreeImage", paraThreeImage);
    }

    try {
      const { data } = await axios.put(
        `https://lionfish-app-n4s9i.ondigitalocean.app/api/v1/book/update/${id}`,
        updatedBook,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };
  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };
  const paraThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImagePreview(reader.result);
      setParaThreeImage(file);
    };
  };

  const { mode } = useContext(Context);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3>UPDATE BOOK</h3>
        <form>
          <div className="category-box">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Book Category</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="BOOK MAIN TITLE"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label>BOOK MAIN IMAGE</label>
            <img
              src={
                mainImagePreview
                  ? `${mainImagePreview}` // If paraOneImage exists, use it directly
                  : mainImage // Otherwise, use paraOneImagePreview
                  ? `${mainImage}`
                  : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists, use an empty string
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={mainImagePreviewHandler}
              style={{ border: "none" }}
            />
          </div>
          <textarea
            rows="25"
            className="intro"
            placeholder="BOOK INTRO..... (Must contain at least 250 characters!)"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph one title"
              value={
                paraOneTitle && paraOneTitle.length > 0 ? paraOneTitle : ""
              }
              onChange={(e) => setParaOneTitle(e.target.value)}
            />
            <img
              src={
                paraOneImagePreview
                  ? `${paraOneImagePreview}` // If paraOneImage exists, use it directly
                  : paraOneImage // Otherwise, use paraOneImagePreview
                  ? `${paraOneImage}`
                  : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists, use an empty string
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={paraOneImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Book First Sub Paragraph Comes Here..."
              value={
                paraOneDescription && paraOneDescription.length > 0
                  ? paraOneDescription
                  : ""
              }
              onChange={(e) => setParaOneDescription(e.target.value)}
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph two title"
              value={
                paraTwoTitle && paraTwoTitle.length > 0 ? paraTwoTitle : ""
              }
              onChange={(e) => setParaTwoTitle(e.target.value)}
            />
            <img
              src={
                paraTwoImagePreview
                  ? `${paraTwoImagePreview}` // If paraOneImage exists, use it directly
                  : paraTwoImage // Otherwise, use paraOneImagePreview
                  ? `${paraTwoImage}`
                  : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists, use an empty string
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={paraTwoImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Book Second Sub Paragraph Comes Here..."
              value={
                paraTwoDescription && paraTwoDescription.length > 0
                  ? paraTwoDescription
                  : ""
              }
              onChange={(e) => setParaTwoDescription(e.target.value)}
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph three title"
              value={
                paraThreeTitle && paraThreeTitle.length > 0
                  ? paraThreeTitle
                  : ""
              }
              onChange={(e) => setParaThreeTitle(e.target.value)}
            />
            <img
              src={
                paraThreeImagePreview
                  ? `${paraThreeImagePreview}` // If paraOneImage exists, use it directly
                  : paraThreeImage // Otherwise, use paraOneImagePreview
                  ? `${paraThreeImage}`
                  : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists, use an empty string
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={paraThreeImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Book Third Sub Paragraph Comes Here..."
              value={
                paraThreeDescription && paraThreeDescription.length > 0
                  ? paraThreeDescription
                  : ""
              }
              onChange={(e) => setParaThreeDescription(e.target.value)}
            />
          </div>
          <div className="publish-box">
            <label>Published?</label>
            <select
              value={published === null ? "" : published}
              onChange={(e) => setPublished(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button className="update-btn" onClick={handleUpdate}>
            UPDATE
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateBook;