import { useState, useEffect } from "react";
import axios from "axios";

import CardList from "../components/CardList";
import "../assets/css/mymovie.css";

const Mymovie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios({
        method: "post",
        url: "http://localhost:4040/movie/my-movie",
        data: {
          token: localStorage.getItem("token"),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((result) => {
        setData(result.data.data);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="mymovie-container">
      <CardList data={data} type="my-movie" />
    </div>
  );
};

export default Mymovie;
