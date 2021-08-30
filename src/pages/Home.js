import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Carousel from "../components/Carousel";
import CardList from "../components/CardList";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:4040/movie/list");
      setData(result.data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#141414" }}>
      <Carousel />
      <CardList data={data} />
    </div>
  );
};

export default Home;
