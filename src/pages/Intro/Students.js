import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import { aisl_students } from "../../assets/string/aisl_students";
import styles from "./intro.module.css";
import { colors } from "../../assets/colors";
import Card_Student from "../../components/Card/Card_Student";

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
          margin: isMobile ? 20 : 100,
          textAlign: "center",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            isMobile ? "30vw" : "20vw"
          }, 1fr))`,
          gridAutoRows: "1fr",
          rowGap: 30,
          columnGap: 10,
        }}
      >
        {aisl_students.map((item, index) => {
          return <Card_Student item={item} />;
        })}
      </div>
    </div>
  );
};

export default Students;
