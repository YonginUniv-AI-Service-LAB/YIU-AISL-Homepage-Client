import React, { useNavigate } from "react";
import { Card, List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

import userImg from "../../assets/images/user.png";
import { aisl_professors } from "../../assets/string/aisl_professors";

import styles from "./intro.module.css";
import { colors } from "../../assets/colors";

const { Meta } = Card;

const Professors = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  return (
    <div
      style={{ marginTop: "5vh", marginBottom: "5vh" }}
      className={styles.container}
    >
      <div
        style={{
          display: "grid",
          margin: isMobile ? 20 : 100,
          marginRight: isMobile ? 20 : isTablet ? 100 : 220,
          marginLeft: isMobile ? 20 : isTablet ? 100 : 220,
          textAlign: "center",
          gridTemplateColumns: `repeat(auto-fill, minmax(${
            isMobile ? "70%" : "60%"
          }, 1fr))`,
          gridAutoRows: "1fr",
          rowGap: 30,
          columnGap: 30,
        }}
      >
        {aisl_professors.map((item, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: colors.grey_light2,
                padding: 50,
              }}
              onClick={() => navigate("/intro")}
            >
              <img
                src={item.img ? item.img : userImg}
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  marginRight: 30,
                  objectFit: "contain",
                }}
              />
              <div style={{ textAlign: "start" }}>
                <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: "bold" }}>
                  {item.name} 교수
                </p>
                <p style={{ fontSize: isMobile ? 14 : 17 }}>
                  {item.office}
                  <br />
                  {item.email}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Professors;
