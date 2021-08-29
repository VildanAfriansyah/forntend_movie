import { useState } from "react";
import { IoIosPlayCircle, IoMdCart, IoMdStar } from "react-icons/io";

import Login from "./Login";
import "../assets/css/cardList.css";

const CardList = ({ data }) => {
  const [index, setIndex] = useState(null);
  const [isLogin, setLogin] = useState(false);

  const buy = () => {
    setLogin(true);
  };

  const onClose = () => {
    setLogin(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingRight: "50px",
          paddingLeft: "50px",
          marginTop: "-80px",
          justifyContent: "space-between",
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
                    <IoIosPlayCircle className="icon-play" />
                    <IoMdCart className="icon-play" onClick={buy} />
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
              ></div>
            )}
            <p className="tittle">{movie.tittle}</p>
          </div>
        ))}
      </div>

      <ModalLogin isLogin={isLogin} onClose={onClose} />
    </>
  );
};

export default CardList;

const ModalLogin = ({ isLogin, onClose }) => {
  return <Login isLogin={isLogin} onClose={onClose} />;
};
