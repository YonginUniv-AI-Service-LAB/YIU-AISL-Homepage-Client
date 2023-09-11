import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import styles from "./join.module.css";
import { colors } from "../../assets/colors";

import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

const JoinComplete = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      className={styles.completeContainer}
      style={{ minWidth: isMobile ? 350 : 500, maxWidth: isMobile ? 400 : 600 }}
    >
      <Result
        icon={
          <SmileOutlined
            style={{
              color: colors.yiu_dark_blue,
            }}
          />
        }
        title={
          <p
            style={{
              marginTop: 50,
              fontSize: isMobile ? 25 : 40,
              fontWeight: "bold",
            }}
          >
            회원이 되신 걸 환영합니다!
          </p>
        }
        extra={
          <Large_SubmitButton
            name="로그인 화면으로 이동"
            bgColor={colors.yiu_dark_blue_light}
            bgColor_hover={colors.yiu_dark_blue}
            style={{ marginTop: 50, marginBottom: 100 }}
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
};
export default JoinComplete;
