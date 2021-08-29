import { useState, useEffect } from "react";
import axios from "axios";

import "../assets/css/payment.css";

const Payment = (props) => {
  const [data, setData] = useState([]);
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:4040/payment/list");
      setData(result.data);
    }
    fetchData();
  }, []);

  const handleOutsideClick = () => {
    props.onClose();
  };

  const payNow = async (id, price) => {
    console.log("ASd");
    setLoading(true);
    await axios({
      method: "post",
      url: "http://localhost:4040/payment/",
      data: {
        token: localStorage.getItem("token"),
        phone,
        method_id: method,
        type: "film",
        movie_id: id,
        price,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((result) => {
      if (result.data.status === "success") {
        setLoading(false);
        props.onClose();
      }
    });
  };

  return (
    <div
      className={props.isOpen ? "payment-active" : "payment-inactive"}
      onClick={handleOutsideClick}
    >
      <div
        className="modal-payment"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="payment-head">
          <a className="payment-tittle">Confirm Payment</a>
        </div>
        <div className="payment-body">
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "25px",
            }}
          >
            <img src={props.data.poster} alt="img" className="image-payment" />
            <div className="payment-movie-detail">
              <a className="tittle-movie">Tittle : {props.data.tittle}</a>
              <a className="genre-movie">Genre : {props.data.genre}</a>
              <a className="genre-movie">Rating : {props.data.rating}</a>
              <a className="director-movie">Director : {props.data.director}</a>
              <div
                style={{
                  overflowWrap: "break-word",
                  height: "10px",
                }}
              >
                <a className="plot-movie">Price : {props.data.price}</a>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <select
                className="payment-method"
                onChange={(event) => setMethod(event.target.value)}
              >
                <option
                  disabled
                  selected
                  style={{ color: "#DBDBDB", fontSize: "1.2rem" }}
                >
                  Pilih metode pembayaran
                </option>
                {data.map((value, index) => (
                  <option value={value.method_id} key={index}>
                    {value.method}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3">
              <input
                className="custom-input"
                type="number"
                placeholder="Phone number"
                // value={password}
                onChange={(event) => setPhone(event.target.value)}
              />
              <span className="focus-border"></span>
            </div>
            <div>
              <input
                type="submit"
                value="Pay Now"
                className="payment-button"
                onClick={() => payNow(props.data.movie_id, props.data.price)}
                // disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
