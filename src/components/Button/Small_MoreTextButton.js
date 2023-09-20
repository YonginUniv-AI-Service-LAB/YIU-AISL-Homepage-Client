import React from "react";
import { Button, ConfigProvider } from "antd";

import styles from "./button.module.css";
import { colors } from "../../assets/colors";

const Small_MoreTextButton = (props) => {
  return (
    <span
      style={{
        textAlign: "center",
        padding: 12,
        borderRadius: 10,
        fontWeight: "bold",
      }}
      onClick={props.onClick}
      className={styles.small_moreTextButton}
    >
      {props.title}
    </span>
  );
};
export default Small_MoreTextButton;
