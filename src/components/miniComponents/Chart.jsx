import  { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Chart = () => {
  const [myBooks, setMyBooks] = useState([]);
  useEffect(() => {
    const fetchMyBooks = async () => {
      const { data } = await axios.get(
        "https://lionfish-app-n4s9i.ondigitalocean.app/api/v1/book/mybooks",
        { withCredentials: true }
      );
      setMyBooks(data.books);
    };
    fetchMyBooks();
  }, []);

  const publishedBooks =
    myBooks && myBooks.filter((book) => book.published === true);
  const notPublishedBooks =
    myBooks && myBooks.filter((book) => book.published === false);

  console.log(publishedBooks);

  const data = {
    labels: ["Published", "Not Published"],
    datasets: [
      {
        label: "Books",
        data: [
          publishedBooks.length > 0 ? publishedBooks.length : 0,
          notPublishedBooks.length > 0 ? notPublishedBooks.length : 0,
        ],
        borderColor: ["#0e7490", "#facc15"],
        backgroundColor: ["#0e7490", "#facc15"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <section className="chart-container" style={{ height: "90vh" }}>
      <h3> ANALYTICS</h3>
      <Doughnut data={data} style={{ height: "550px" }} />
    </section>
  );
};

export default Chart;