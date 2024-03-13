
import  { useContext, useEffect } from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// Import your components here
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Books from './components/pages/Books';
import SingleBook from './components/pages/SingleBook';
import About from './components/pages/About';
import AllAuthors from './components/pages/AllAuthors';
import Dashboard from './components/pages/DashBoard';
import UpdateBook from './components/pages/UpdateBook'; 
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Context } from "./main";
import axios from "axios";
import { Toaster } from "react-hot-toast";



const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, user, setBooks } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/myprofile",
          {
            withCredentials: true,
          }
        );

        setUser(data.user);
        console.log("user data: ", data.user)
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    const fetchBooks = async () => {
      try{
        const { data } = await axios.get("http://localhost:4000/api/v1/book/all",
         { withCredentials: true }
         ); 
         setBooks(data.allBooks);
      } catch(error) {
        setBooks([]);
      }
    }
    fetchUser();
    fetchBooks();
  },  [isAuthenticated]);
  return (
    <>
    <Router>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}    />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/books' element={<Books />} />
        <Route path='/book/:id' element={<SingleBook />} />
        <Route path='/about' element={<About />} />
        <Route path='/authors' element={<AllAuthors />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/book/update/:id' element={<UpdateBook />} />

      </Routes>
     
      <Footer/>
      <Toaster />
    </Router>
      
    </>
  );
  
}

export default App
