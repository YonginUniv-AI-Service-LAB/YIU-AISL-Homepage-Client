import React from "react";
import { Row, Col, Image } from "antd";
import { useMediaQuery } from "react-responsive";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./intro.module.css";
import aisl_intro from "../../assets/images/aisl_intro.jpg";
import { colors } from "../../assets/colors";
import { aisl } from "../../assets/string/aisl";

const Intro = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        whiteSpace: "pre-line",
        marginBottom: 150,
        // marginLeft: isMobile ? 30 : isTablet ? 70 : 220,
        // marginRight: isMobile ? 30 : isTablet ? 70 : 220,
      }}
    >
      {/* 이름 */}
      <Fade top>
        <p
          style={{
            color: colors.yiu_dark_blue,
            fontSize: isMobile ? 30 : isTablet ? 35 : 40,
            textAlign: "center",
            margin: isMobile ? 50 : isTablet ? 70 : 100,
            fontWeight: "bold",
          }}
        >
          AI SERVICE LAB
        </p>
      </Fade>

      {/* 슬로건 */}
      <Fade bottom>
        <p
          style={{
            textAlign: "center",
            fontSize: isMobile ? 25 : isTablet ? 30 : 35,
            fontWeight: "bold",
          }}
        >
          {aisl.slogan}
        </p>
      </Fade>

      {/* 설명+이미지 */}
      <div
        style={{
          display: "grid",
          margin: isMobile ? 30 : isTablet ? 50 : 150,
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            isMobile ? "50vw" : "25vw"
          }, 2fr))`,
          gridAutoRows: "1fr",
          rowGap: 30,
          columnGap: "20px",
          // backgroundColor: "blue",
          justifyContent: "center",
        }}
      >
        <div
          style={
            {
              // marginRight: isMobile ? null : 20,
              // marginBottom: isMobile ? 50 : null,
              // marginTop: -20,
            }
          }
        >
          <Fade left>
            <p
              style={{
                fontSize: isMobile ? 14 : isTablet ? 15 : 18,
                color: colors.grey_dark,
                fontWeight: "bold",
                textAlign: "left",
                // backgroundColor: "red",
              }}
            >
              {aisl.contents}
            </p>
          </Fade>
        </div>

        <div style={{ textAlign: "center" }}>
          <Fade right>
            <img
              src={aisl_intro}
              style={{
                maxWidth: isMobile ? 250 : isTablet ? "100%" : 470,
                // height: isMobile ? 200 : 300,
                marginBottom: isMobile ? 50 : null,
              }}
            />
          </Fade>
        </div>
      </div>

      {/* <Row
        justify="center"
        align="top"
        style={{
          textAlign: "center",
          // alignItems: "center",
          marginTop: isMobile ? 30 : 100,
        }}
      >
        <Col span={isMobile ? 24 : 12}>
          <div
            style={{
              marginRight: isMobile ? null : 20,
              marginBottom: isMobile ? 50 : null,
              marginTop: -20,
            }}
          >
            <Fade left>
              <p
                style={{
                  fontSize: isMobile ? 14 : isTablet ? 15 : 18,
                  color: colors.grey_dark,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {aisl.contents}
              </p>
            </Fade>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Fade right>
            <img
              src={aisl_intro}
              style={{
                maxWidth: isMobile ? 250 : isTablet ? "100%" : 500,
                // height: isMobile ? 200 : 300,
                backgroundColor: "transparent",
                marginBottom: isMobile ? 50 : null,
              }}
            />
          </Fade>
        </Col>
      </Row> */}
    </div>
  );
};
export default Intro;
