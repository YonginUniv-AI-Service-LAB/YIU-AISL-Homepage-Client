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
  const post = useSelector((state) => state.Main.post);
  const plan = useSelector((state) => state.Main.plan);

  const [calendarData, setCalendarDate] = useState([]);
  const [noticeData, setNoticeDate] = useState([]);

  // 페이지 이동
  const navigate = useNavigate();
  const { page } = props;

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getMain());
  }, []);

  useEffect(() => {
    if (notice != undefined && post != undefined && plan != undefined) {
      getList();
      getNoticeList();
    }
  }, [notice, plan, post]);

  // 날짜별로 데이터 분류
  const getList = () => {
    let result = {};

    // plan 데이터 분류
    for (let i of plan) {
      const date = i.date.substring(0, 10);
      if (result.hasOwnProperty(date)) {
        result[date].push(i);
      } else {
        result[date] = [];
        result[date].push(i);
      }
    }

    // post 데이터 분류
    for (let j of post) {
      const date = j.createdAt.substring(0, 10);
      if (result.hasOwnProperty(date)) {
        result[date].push(j);
      } else {
        result[date] = [];
        result[date].push(j);
      }
    }

    setCalendarDate(result); // 데이터 최종 업데이트
  };

  const getNoticeList = () => {
    let result = [];
    for (let i of notice) {
      const date = i.createdAt.substring(0, 10);
      let temp = i;
      temp.createdAt = date;
      result.push(temp);
    }
  };

  return (
    <div>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <MainCarousel />
        <MainIntro />
        <Slide bottom>
          <MainContent
            onClick={(page) => navigate(page)}
            data_notice={notice}
            data_post={post}
            data_plan={plan}
            data_calendar={calendarData}
          />
        </Slide>
      </Container>
    </div>
  );
};

export default Main;
