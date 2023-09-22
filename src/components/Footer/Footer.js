import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "antd";
import logo from "../../assets/images/yiu_logo_col.jpg";
import styles from "./footer.module.css";
import styled from "styled-components";
import { aisl } from "../../assets/string/aisl";
import { colors } from "../../assets/colors";

const Footer = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        display: isMobile ? "grid" : "flex",
        flex: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 30,
        marginRight: 30,
        // padding: 50,
        // display: "grid",
        // margin: isMobile ? 50 : 70,
        // gridTemplateColumns: `repeat(auto-fit, minmax(${
        //   isMobile ? "50vw" : "25vw"
        // }, 1fr))`,
        // gridAutoRows: "1fr",
        // rowGap: 10,
      }}
    >
      <img src={logo} className={styles.logo} />
      <div
        style={{
          marginLeft: isMobile ? null : isTablet ? 50 : 70,
          fontSize: 13,
          color: colors.grey_dark,
        }}
      >
        <p
          style={{
            fontSize: 17,
            color: colors.yiu_dark_blue,
            fontWeight: "bold",
          }}
        >
          AI Service Lab
        </p>
        <span>E-Mail : {aisl.email}</span>
        <br />
        <span>{aisl.address}</span>
        <br />
        <span>{aisl.copyright}</span>
      </div>
    </div>
  );
};
export default Footer;
