import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

import { colors } from "../../assets/colors";

const CarouselImg = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <img
      style={{
        width: "100%",
        objectFit: "contain",
        alignSelf: "center",
        margin: "0 auto",
      }}
      src={props.img}
    />
  );
};
export default CarouselImg;
