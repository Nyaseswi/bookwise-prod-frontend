import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(Context);
  
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await axios.get(
        "https://lionfish-app-n4s9i.ondigitalocean.app/api/v1/user/authors",
        { withCredentials: true }
      );
      setAuthors(data.authors);
    };
    fetchAuthors();
  }, []);
  
  return (
    <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}>
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => (
            <div className="card" key={element._id}>
              {element.avatar && element.avatar.url && (
                <img src={element.avatar.url} alt="author_avatar" />
              )}
              <h3>{element.name}</h3>
              <p>{element.role}</p>
            </div>
          ))
        ) : (
          <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />
        )}
      </div>
    </article>
  );
};

export default AllAuthors;
