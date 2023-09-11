import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import aisl_carousel_2000 from "../../assets/images/aisl_carousel_2000.jpg";

import styles from "./main.module.css";
import CarouselImg from "../../components/Image/CarouselImg";

const MainCarousel = () => (
  <Carousel
    showThumbs={false}
    showStatus={false}
    // autoPlay={true}
    infiniteLoop={true}
    className={styles.carousel_container}
    width={"100%"}
    swipeable={true}
    emulateTouch={true}
  >
    <CarouselImg img={aisl_carousel_2000} />
    <CarouselImg img={aisl_carousel_2000} />
    <CarouselImg img={aisl_carousel_2000} />
    <CarouselImg img={aisl_carousel_2000} />
  </Carousel>
);

export default MainCarousel;

// "https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_960_720.jpg"
// "https://cdn.pixabay.com/photo/2018/12/02/10/07/web-3850917_960_720.jpg"
// "https://cdn.pixabay.com/photo/2018/09/27/09/21/web-3706561_960_720.jpg"
