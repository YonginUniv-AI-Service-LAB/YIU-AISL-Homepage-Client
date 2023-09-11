import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

import { colors } from "../../assets/colors";

const NoData = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        backgroundColor: colors.grey_light2,
        borderRadius: 10,
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: isMobile ? 15 : 20,
        }}
      >
        {props.text}
      </p>
    </div>
  );
};
export default NoData;
