import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import styles from "./join.module.css";
import { colors } from "../../assets/colors";

import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

const JoinComplete = (props) => (
  <div className={styles.completeContainer}>
    <Result
      icon={<SmileOutlined style={{ color: colors.yiu_dark_blue }} />}
      title={<h1 style={{ marginTop: 50 }}>회원이 되신 걸 환영합니다!</h1>}
      extra={
        <Large_SubmitButton
          name="TO LOGIN PAGE"
          bgColor={colors.yiu_dark_blue_light}
          bgColor_hover={colors.yiu_dark_blue}
          style={{ marginTop: 150, marginBottom: 100 }}
          onClick={props.onClick}
        />
        //   <Button
        //     size="large"
        //     type="primary"
        //     onClick={props.onClick}
        //     style={{ marginTop: 150, marginBottom: 100 }}
        //   >
        //     로그인 페이지로 이동
        //   </Button>
      }
    />
  </div>
);
export default JoinComplete;
