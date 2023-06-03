import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import dayjs from "dayjs";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { getCommunity } from "../../store/actions/community_actions";

import styles from "./community.module.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import CommunityCalendar from "./Calendar";
import CommunityPlan from "./Plan";
import CommunityPost from "./Post";

import { test } from "../../assets/data/test";

const Community = (props) => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));
  const [calendarData, setCalendarDate] = useState([]);
  const [noPlan, setNoPlan] = useState(true);
  const [noPost, setNoPost] = useState(true);

  // 리덕스
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.Community.plan);
  const post = useSelector((state) => state.Community.post);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getCommunity())
      .then((res) => {
        dispatch(getCommunity());
      })
      .catch((err) => {});
  }, []);

  // plan, post 데이터 변경될 때 getList 함수 통해서 분류 정리
  useEffect(() => {
    if (plan != undefined && post != undefined) {
      checkNoData();
      getList();
    }
    console.log("발동!");
  }, [plan, post]);

  // 선택한 날짜 바뀔 때 마다 오른쪽 Plan, Post 데이터 있는지 없는지 확인
  useEffect(() => {
    checkNoData();
  }, [selectedValue]);

  const checkNoData = () => {
    if (plan != undefined && post != undefined) {
      const current = selectedValue?.format("YYYY-MM-DD");
      let cntPlan = 0;
      let cntPost = 0;
      for (let i in calendarData) {
        if (current == i) {
          for (let j of calendarData[i]) {
            if (j.planid) cntPlan++;
            if (j.postid) cntPost++;
          }
        }
      }
      if (cntPlan > 0) setNoPlan(false);
      else setNoPlan(true);
      if (cntPost > 0) setNoPost(false);
      else setNoPost(true);
    }
  };

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

  return (
    <div style={{ marginBottom: 100 }}>
      <PageTitle title="Community" />
      <h2 className={styles.page_date}>{`${selectedValue?.format(
        "YYYY-MM-DD"
      )}`}</h2>

      {plan != undefined && post != undefined ? (
        <Row style={{ marginLeft: 50, marginRight: 50 }}>
          {/* 왼쪽 - 달력 */}
          <Col span={11}>
            <CommunityCalendar
              setDate={setSelectedValue}
              data_plan={plan}
              data_post={post}
              data={calendarData}
            />
          </Col>

          {/* 왼쪽-오른쪽 사이 중간 여백 */}
          <Col span={2}></Col>

          {/* 오른쪽 섹션1 - 주요일정 */}
          <Col span={11}>
            <CommunityPlan
              date={`${selectedValue?.format("YYYY-MM-DD")}`}
              data={plan}
              no={noPlan}
            />

            {/* 오른쪽 섹션 사이의 중간 여백 */}
            <br />
            <br />
            {/* 오른쪽 섹션2 - 커뮤니티 */}
            <CommunityPost
              date={`${selectedValue?.format("YYYY-MM-DD")}`}
              data={post}
              no={noPost}
              rerender={() => dispatch(getCommunity())}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default Community;
