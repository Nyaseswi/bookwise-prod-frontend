import  { useContext } from "react";
import { Context } from "../../main";
import TrendingBooks from '../miniComponents/TrendingBooks';

const Books = () => {
  const { mode, books } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
       <TrendingBooks books={books} title={"Books"} />

</article>
  )
}

export default Books
