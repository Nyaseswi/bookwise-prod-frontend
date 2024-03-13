import  { useContext } from 'react';
import { Context } from "../../main";
import HeroSection from '../miniComponents/HeroSection';
import TrendingBooks from '../miniComponents/TrendingBooks';

// import PopularAuthors from '../miniComponents/PopularAuthors'

const Home = () => {
  const {mode} = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection/>
      <TrendingBooks/>
      {/* <PopularAuthors/> */}
    </article>
  );
};

export default Home
