import React from "react";
import { Row, Col, Image } from "antd";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./intro.module.css";
import aisl_intro from "../../assets/images/aisl_intro.jpg";
import { colors } from "../../assets/colors";

const Intro = () => (
  <div style={{ marginTop: 200, marginBottom: 100 }}>
    {/* 이름 */}
    <Fade top>
      <h1
        style={{
          color: colors.yiu_dark_blue,
          fontSize: 50,
          textAlign: "center",
          margin: 100,
        }}
      >
        AI SERVICE LAB
      </h1>
    </Fade>

    {/* 슬로건 */}
    <Fade bottom>
      <p
        style={{
          margin: "0 auto",
          textAlign: "center",
          width: "50%",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
        <br />
        무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
        <br />
        남산위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리기상 일세
        <br />
        무궁화 삼천리 화려강산 대한사람 대한으로 길이보전하세
        {/* <p style={{ textAlign: "right" }}>"</p> */}
      </p>
    </Fade>

    {/* 설명+이미지 */}
    <Row
      justify="center"
      align="top"
      style={{ textAlign: "center", margin: 200 }}
    >
      <Col span={12}>
        <div
          style={{
            marginRight: 20,
          }}
        >
          <Fade left>
            <p
              style={{
                fontSize: 20,
                color: colors.grey_dark,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              용인대학교는 1953년 대한유도학교로 개교한 이래, 대한체육과학대학을
              거쳐, 1992년 종합대학으로 승격한 이후, 대한민국에서 무도, 체육,
              문화예술은 물론이고, 여러 학문분야에서 우뚝 솟은 오늘의
              용인대학교로 발전되어 왔습니다.
              <br />
              <br />
              앞으로 용인대학교는 4차 산업혁명 시대에 맞는 미래 교육으로의 전환,
              구성원과의 의사소통 활성화를 비롯한 대학 거버넌스의 혁신, 대학
              재정의 수입 확충과 재무건전성 확보에 집중할 것입니다.
              <br />
              <br />
              우리 용인대학교의 70년의 역사는 결코 짧지 않은 기간입니다. 앞으로
              30년 후에는 용인대학교가 100주년을 맞이하게 되는데, 오늘날의
              훌륭한 용인대학교를 만들어주신 많은 분들의 희망이 헛되지 않음은
              물론이고, 더욱 자랑스럽고 발전해 나가는 영광스러운 용인대학이 될
              것 입니다.
              <br />
              <br />
              정도경영을 하는 대학, 지속적인 성장이 가능한 대학, 역동성이 넘치며
              미래 인재를 육성하는 용인대학교 100년을 향해, 구성원 여러분의 힘을
              모아 주시기를 부탁드립니다.
              <br />
              <br />
              <br />
              <br />
              용인대학교 총장 한진수
            </p>
          </Fade>
        </div>
      </Col>
      <Col span={12}>
        <Fade right>
          <Image width={600} src={aisl_intro} />
        </Fade>
      </Col>
    </Row>
  </div>
);
export default Intro;
