import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button, ConfigProvider } from "antd";

import userImg from "../../assets/images/user.png";
import { colors } from "../../assets/colors";
import styles from "./card.module.css";

const Card_Professor = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        borderRadius: 10,
        // backgroundColor: colors.grey_light2,
        cursor: "pointer",
        alignItems: "center",
        padding: 10,
      }}
      onClick={props.onClick}
      className={styles.card}
    >
      <div style={{ width: "40%" }}>
        <img
          src={props.item.img ? props.item.img : userImg}
          style={{
            width: 100,
            height: 150,
            // width: isMobile ? "40%" : isTablet ? "40%" : "50%",
            // height: isMobile ? "40%" : isTablet ? "40%" : "50%",
            borderRadius: 10,
            marginRight: 30,
            objectFit: "contain",
          }}
        />
      </div>
      <div
        style={{
          textAlign: "start",
          width: "60%",
        }}
      >
        <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: "bold" }}>
          {props.item.name}
          <br />
          <span
            style={{
              fontSize: isMobile ? 13 : 17,
              color: colors.grey_mid,
              fontWeight: "normal",
            }}
          >
            {props.item.engName}
          </span>
          <p
            style={{
              fontSize: isMobile ? 13 : isTablet ? 14 : 16,
              color: colors.grey_dark,
            }}
          >
            {props.item.Email}
          </p>
        </p>
      </div>
    </div>
  );
};
export default Card_Professor;
