import  { useContext } from 'react';
import {Context} from '../../main';
import { Link } from 'react-router-dom';
import { BeatLoader } from "react-spinners";


const HeroSection = () => {
  const {books} = useContext(Context);
  return (
    <section className='hero'>
      {
        books && books.length >0 ? (books.slice(0,2).map(element => {
          return (
            <Link to={`/book/${element._id}`} className='card' key={element._id}>
              <img src={element.mainImage.url} alt='book' className='blogImg'   />
              <h1>{element.title}</h1>
              <div className='writer_section'>
                <div className='author'>
                  <img src={element.authorAvatar} alt={"authorAvatar"}/>
                  <p>{element.authorName}</p>

                </div>

              </div>
            </Link>
          )
        })) : (
          <BeatLoader color="gray" size={30} />
        )
      }
      
    </section >
  )
}

export default HeroSection
