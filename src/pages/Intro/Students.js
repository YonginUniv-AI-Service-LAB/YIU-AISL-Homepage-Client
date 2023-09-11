import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import { aisl_students } from "../../assets/string/aisl_students";
import styles from "./intro.module.css";
import { colors } from "../../assets/colors";

const { Meta } = Card;

const Students = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{ marginTop: "5vh", marginBottom: "5vh" }}
      className={styles.container}
    >
      <div
        style={{
          display: "grid",
          margin: isMobile ? 20 : 50,
          textAlign: "center",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            isMobile ? "30vw" : "20vw"
          }, 1fr))`,
          gridAutoRows: "1fr",
          rowGap: 30,
          columnGap: 30,
        }}
      >
        {aisl_students.map((item, index) => {
          return (
            <div
              style={{
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: colors.grey_light2,
                paddingTop: 30,
                paddingBottom: 20,
              }}
            >
              <img
                src={item.img}
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  marginRight: 15,
                  objectFit: "contain",
                }}
              />
              <div>
                <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: "bold" }}>
                  {item.name}
                </p>
                <p style={{ fontSize: isMobile ? 14 : 17 }}>
                  {item.major}
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

export default Students;
