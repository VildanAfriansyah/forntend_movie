import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { CarouselData } from "../data/carousel";

import "../assets/css/slider.css";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = CarouselData.length;

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <section className="slider">
      <IoIosArrowBack className="left-arrow" onClick={prevImage} />
      <IoIosArrowForward className="right-arrow" onClick={nextImage} />
      {CarouselData.map((slide, index) => {
        return (
          <div
            className={current === index ? "image slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div>
                <img src={slide.poster} alt="img carousel" className="image" />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Carousel;
