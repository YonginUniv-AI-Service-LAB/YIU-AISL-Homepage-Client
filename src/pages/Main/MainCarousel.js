import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import aisl_carousel_2000 from "../../assets/images/aisl_carousel_2000.jpg";

import styles from "./main.module.css";

const MainCarousel = () => (
  <Carousel
    showThumbs={false}
    showStatus={false}
    // autoPlay={true}
    infiniteLoop={true}
    className={styles.carousel_container}
    width={"100%"}
  >
    <div>
      <img className={styles.carousel_img} src={aisl_carousel_2000} />
    </div>
    <div>
      <img
        className={styles.carousel_img}
        src="https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_960_720.jpg"
      />
      {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
      <img
        className={styles.carousel_img}
        src="https://cdn.pixabay.com/photo/2018/12/02/10/07/web-3850917_960_720.jpg"
      />
    </div>
    <div>
      <img
        className={styles.carousel_img}
        src="https://cdn.pixabay.com/photo/2018/09/27/09/21/web-3706561_960_720.jpg"
      />
    </div>
  </Carousel>
);

export default MainCarousel;
