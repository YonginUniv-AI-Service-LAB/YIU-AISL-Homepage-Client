import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../store/actions/main_actions";

import Slide from "react-reveal/Slide";
import { Container } from "reactstrap";

import MainCarousel from "./MainCarousel";
import MainIntro from "./MainIntro";
import MainContent from "./MainContent";

import styles from "./main.module.css";

const Main = (props) => {
  // 리덕스
  const dispatch = useDispatch();
  const notice = useSelector((state) => state.Main.notice);
  const community = useSelector((state) => state.Main.community);
  const plan = useSelector((state) => state.Main.plan);

  // 페이지 이동
  const navigate = useNavigate();
  const { page } = props;

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getMain());
  }, []);

  return (
    <div>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <MainCarousel />
        <MainIntro />
        <Slide bottom>
          <MainContent
            onClick={(page) => navigate(page)}
            data_notice={notice}
            data_community={community}
            data_plan={plan}
          />
        </Slide>
      </Container>
    </div>
  );
};

export default Main;
