import React, { Component } from "react";
import { Row, Col } from "antd";
import logo from "../../assets/images/yiu_logo_col.jpg";
import styles from "./footer.module.css";
import styled from "styled-components";
import { aisl } from "../../assets/string/aisl";

const Footer = () => {
  return (
    <Row justify={"center"}>
      <Col span={24} flex={"row"}>
        <div
          className={styles.footer_content_box}
          // style={{
          //   color: "#dee2e6",
          //   minHeight: "100px",
          //   backgroundColor: "#2a3037",
          //   paddingTop: 50,
          //   paddingBottom: 50,
          //   flex: "row",
          //   justifyContent: "center",
          // }}
        >
          <img src={logo} className={styles.logo} />
          <span className={styles.footer_content_text}>
            Ai Service Lab <br />
            <br />
            {aisl.email}
            <br />
            <br />
            Room 7203, 134 Yongindaehak-ro, Cheoin-gu, Yongin-si, Gyeonggi-do,
            Korea 17092
            <br />
            Copyright 2023 YiuAiServiceLab all rights reserved.
          </span>
        </div>
      </Col>
    </Row>
  );
};
export default Footer;
