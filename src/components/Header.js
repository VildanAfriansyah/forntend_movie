import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import logo from "../assets/images/logo.png";
import vip from "../assets/images/vip.png";
import Login from "./Login";
import Vip from "./Vip";
import "../assets/css/header.css";

function Header() {
  const [check, setCheck] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isOpenVip, setOpenVip] = useState(false);
  const [dimension, setDimension] = useState(null);

  useEffect(() => {
    async function fetchData() {
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
  });

  const onClose = () => {
    setOpen(false);
  };

  const onCloseVip = () => {
    setOpenVip(false);
  };

  let { id } = useParams();

  useLayoutEffect(() => {
    function updatePosition() {
      setDimension(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <>
      <nav
        className={
          id === "my-movie" || id === "video"
            ? "child"
            : dimension > 245
            ? "sticky-active"
            : "sticky"
        }
      >
        <Link
          to={{
            pathname: "/",
            prevPath: id,
          }}
          className="class-logo"
        >
          <img src={logo} className="logo" />
        </Link>
        <div>
          <ul>
            <li>
              <img src={vip} className="vip" onClick={() => setOpenVip(true)} />
            </li>
            {check ? (
              <>
                <li>
                  <Link
                    to={{
                      pathname: "my-movie",
                      prevPath: id,
                    }}
                  >
                    My Movie
                  </Link>
                </li>
                <li>
                  <Link to="#">Profile</Link>
                </li>
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <li>
                  <Link to="#" onClick={() => setOpen(true)}>
                    Login
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>

      <ModalLogin isOpen={isOpen} onClose={onClose} />
      <ModalVip isOpen={isOpenVip} onClose={onCloseVip} />
    </>
  );
}

export default Header;

const ModalLogin = ({ isOpen, onClose }) => {
  return <Login isOpen={isOpen} onClose={onClose} />;
};

const ModalVip = ({ isOpen, onClose }) => {
  return <Vip isOpen={isOpen} onClose={onClose} />;
};
