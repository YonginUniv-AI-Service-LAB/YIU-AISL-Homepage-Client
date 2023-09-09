import React, { Component } from "react";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./layout.module.css";
import styled from "styled-components";

const LAYOUT = (props) => {
  const { className, children } = props;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <div className={styles.main_container}>{children}</div>
      <hr />
      <Footer />
    </div>
  );
};

export default LAYOUT;
