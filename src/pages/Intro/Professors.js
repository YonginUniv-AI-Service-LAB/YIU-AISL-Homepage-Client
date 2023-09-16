import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

import userImg from "../../assets/images/user.png";
import { aisl_professors } from "../../assets/string/aisl_professors";

import styles from "./intro.module.css";
import { colors } from "../../assets/colors";
import Card_Professor from "../../components/Card/Card_Professor";

const { Meta } = Card;

const Professors = (props) => {
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
          margin: isMobile ? 50 : isTablet ? 120 : 140,
          textAlign: "center",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            isMobile ? "50vw" : isTablet ? "40vw" : "25vw"
          }, 1fr))`,
          gridAutoRows: "1fr",
          rowGap: 50,
          columnGap: 50,
        }}
      >
        {aisl_professors.map((item, index) => {
          return (
            <Card_Professor
              item={item}
              onClick={() => props.moveProfessorDetail(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Professors;
