import { useState, useEffect } from "react";
import { IoIosPlayCircle, IoMdCart, IoMdStar } from "react-icons/io";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import Payment from "./Payment";
import Vip from "./Vip";
import "../assets/css/cardList.css";

const CardList = ({ data, token, type }) => {
  const [index, setIndex] = useState(null);
  const [dataMovie, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isOpenVip, setOpenVip] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await axios({
        method: "post",
        url: "http://localhost:4040/auth/subscription",
        data: {
          token: localStorage.getItem("token"),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result.data.status === "success") {
        setStatus(true);
      }
    }
    fetchData();
    setInterval(() => {
      fetchData();
    }, 1000 * 60 * 60 * 24);
  }, []);

  const buyMovie = (dataMovie) => {
    setOpen(true);
    if (dataMovie) {
      setData(dataMovie);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseVip = () => {
    setOpenVip(false);
  };

  const video = async () => {
    const result = await axios({
      method: "post",
      url: "http://localhost:4040/auth/subscription",
      data: {
        token: localStorage.getItem("token"),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (result.data.status === "success") {
      history.push("/video");
    } else {
      setOpenVip(true);
    }
  };

  const history = useHistory();

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingRight: "50px",
          paddingLeft: "50px",
          marginTop: "-90px",
          justifyContent:
            data.length && data.length < 5 ? "left" : "space-between",
          flexWrap: "wrap",
        }}
      >
        {data.map((movie, idx) => (
          <div key={idx}>
            {index === idx ? (
              <div onMouseLeave={() => setIndex(null)} className="card">
                <iframe
                  className="video"
                  frameBorder="0"
                  tittle={idx}
                  src={`${movie.trailer_url}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&showinfo=0`}
                />
                <div
                  style={{
                    backgroundColor: "#181818",
                    marginTop: "-5px",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    minHeight: "155px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      padding: "10px",
                    }}
                  >
                    <IoIosPlayCircle
                      className="icon-play"
                      onClick={() => video()}
                    />
                    {type !== "my-movie" && (
                      <IoMdCart
                        className="icon-play"
                        onClick={() => buyMovie(movie)}
                      />
                    )}
                    <div
                      style={{
                        width: "80px",
                        display: "flex",
                      }}
                    >
                      <div style={{ color: "#46D369", fontSize: "2rem" }}>
                        {movie.rating}
                      </div>
                      <IoMdStar className="icon-star" />
                    </div>
                  </div>
                  <div className="tittle">{movie.tittle}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px",
                    }}
                  >
                    <a style={{ color: "#FFF" }}>{movie.year}</a>
                    <a style={{ color: "#FFF" }}>{movie.genre}</a>
                  </div>
                  <div style={{ padding: "10px", textAlign: "justify" }}>
                    <a className="plot">{movie.plot}</a>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="card"
                style={{
                  backgroundImage: `url(${movie.poster})`,
                }}
                onMouseEnter={() => setIndex(idx)}
                onMouseLeave={() => setIndex(idx)}
              />
            )}
            <p className="tittle">{movie.tittle}</p>
          </div>
        ))}
      </div>

      {token ? (
        <>
          <ModalPayment
            isOpen={isOpen}
            onClose={() => onClose()}
            data={dataMovie}
          />
          <ModalVip isOpen={isOpenVip} onClose={onCloseVip} />
        </>
      ) : (
        <ModalLogin isOpen={isOpen} onClose={() => onClose()} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.login.token,
  };
};

export default connect(mapStateToProps)(CardList);

const ModalLogin = ({ isOpen, onClose }) => {
  return <Login isOpen={isOpen} onClose={onClose} />;
};

const ModalPayment = ({ isOpen, onClose, data }) => {
  return <Payment isOpen={isOpen} onClose={onClose} data={data} />;
};

const ModalVip = ({ isOpen, onClose }) => {
  return <Vip isOpen={isOpen} onClose={onClose} />;
};
