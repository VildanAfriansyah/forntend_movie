import { useState, useEffect } from "react";
import axios from "axios";

import Payment from "./Payment";
import Login from "./Login";
import "../assets/css/vip.css";

const Vip = (props) => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [dataSub, setDataSub] = useState(null);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isOpenPayment, setOpenPayment] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:4040/subscription/");
      setData(result.data.data);
    }
    async function checkToken() {
      const result = await axios({
        method: "post",
        url: "http://localhost:4040/auth/token",
        data: {
          token: localStorage.getItem("token"),
        },
      });
      if (result.data.status === "success") {
        setCheck(true);
      }
    }
    fetchData();
    checkToken();
  }, []);

  const handleOutsideClick = () => {
    props.onClose();
  };

  const onClose = () => {
    setOpenPayment(false);
  };

  const onCloseLogin = () => {
    setOpenLogin(false);
  };

  const selectPackage = (data) => {
    setDataSub(data);
  };

  const next = () => {
    if (check) {
      setOpenPayment(true);
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <>
      <div
        className={props.isOpen ? "vip-active" : "vip-inactive"}
        onClick={handleOutsideClick}
      >
        <div
          className="modal-vip"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="vip-head">
            <a className="vip-tittle">Please choose the package</a>
            <a className="vip-subtittle">Enjoy unlimited movie</a>
          </div>
          <div className="vip-body">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: "10px",
                padding: "10px",
                height: "400px",
              }}
            >
              {data.map((subs, idx) => (
                <div
                  className={
                    dataSub && dataSub.subscription_id === subs.subscription_id
                      ? "vip-card-selected"
                      : "vip-card"
                  }
                  key={idx}
                  onClick={() => selectPackage(subs)}
                >
                  <a className="subs-tittle">Standard</a>
                  <br />
                  <a className="subs-tittle">
                    {" "}
                    {subs.duration} Day Subscription
                  </a>
                  <br />
                  <br />
                  <a className="subs-price">Rp. {subs.price}</a>
                  <br />
                  <br />
                  <a className="subs-benefit">{subs.benefit}</a>
                </div>
              ))}
            </div>
            <div className="subsribtion-submit">
              <input
                type="submit"
                value="Next"
                className="btn-next"
                onClick={() => next()}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalPayment isOpen={isOpenPayment} onClose={onClose} id={dataSub} />
      <ModalLogin isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
};

export default Vip;

const ModalPayment = ({ isOpen, onClose, id }) => {
  return (
    <Payment isOpen={isOpen} onClose={onClose} id={id} type="subscription" />
  );
};

const ModalLogin = ({ isOpen, onClose }) => {
  return <Login isOpen={isOpen} onClose={onClose} />;
};
