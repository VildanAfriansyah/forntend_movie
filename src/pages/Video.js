import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoMdStar } from "react-icons/io";

import "../assets/css/video.css";

class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props.location.state;
    return (
      <div
        style={{
          display: "flex",
          backgroundColor: "#141414",
          justifyContent: "center",
        }}
      >
        <div className="video-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <iframe
              className="video-player"
              frameBorder="0"
              tittle={data.movie_id}
              src={`${data.trailer_url}`}
            />
          </div>
          <div style={{ margin: "20px", paddingLeft: "15px" }}>
            <a className="video-tittle">{data.tittle}</a>&nbsp;&nbsp;
            <a className="video-subtittle">Episode 1</a>
            <br />
            <div className="rate">
              <a className="rate-tittle">{data.rating}</a>
              <IoMdStar className="video-rate" />
              <IoMdStar className="video-rate" />
              <IoMdStar className="video-rate" />
              <IoMdStar className="video-rate" />
              <IoMdStar className="video-rate" />
              <div class="verticalLine">
                <a className="viewers">337 viewers</a>
              </div>
              <a className="rating">Rate this movie</a>
            </div>
            <a className="genre">Genre &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;</a>
            <a className="data-genre">{data.genre}</a>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <a className="country">Country&nbsp; : </a>
              <a className="data-country">&nbsp;United States</a>
              <div class="verticalLine">
                <a className="dubbing">Dubbing : </a>
                <a className="data-dubbing"> English</a>
              </div>
            </div>
            <a className="genre">
              Plot &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
            </a>
            <a className="data-genre">{data.plot}</a>
          </div>
          <div className="horizontalLine" />
          <div>asd</div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(Video);
