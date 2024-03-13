import { useContext } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About</h2>
        <p>
        Bookstores are retail establishments that specialize in selling books and related items such as magazines, newspapers, and sometimes other products like stationery, gifts, or even coffee. They have been integral parts of communities for centuries, serving as hubs for literary culture, education, and entertainment. 
        </p>
        <p>
        Types of Bookstores: There are various types of bookstores, Overall, bookstores play a vital role in promoting literacy, fostering intellectual curiosity, and preserving the rich tradition of reading and literature in society.


        </p>
        <p>
        Independent Bookstores: These are locally owned and operated bookstores that are not part of a larger chain. They often have a unique charm, curated selections, and strong connections to their communities.
        </p>
        <p>
        Chain Bookstores: These are bookstores owned and operated by a larger company with multiple locations. Examples include Barnes & Noble, Waterstones, and Books-A-Million.
        </p>
        <p>
        Secondhand or Used Bookstores: These bookstores sell pre-owned books at discounted prices. They are popular among readers looking for bargains or out-of-print titles.
        </p>
      </div>
    </article>
  );
};

export default About;