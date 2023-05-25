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

  // 리덕스
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.Community.plan);
  const post = useSelector((state) => state.Community.post);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getCommunity());
    // console.log("result - plan: ", plan);
    // console.log("result - post: ", post);
    // testFun();
  }, []);

  // const testFun = () => {
  //   console.log("시작한다!");
  //   let data = test.plan;
  //   let result = {};

  //   for (let i of data) {
  //     console.log("i: ", i);
  //     const date = i.date.substring(0, 10);
  //     if (result.hasOwnProperty(date)) {
  //       console.log("있음");
  //       result[date].push(i);
  //     } else {
  //       result[date] = [];
  //       result[date].push(i);
  //       console.log("없음");
  //       // result1.push(`[date]: []`);
  //     }
  //   }
  //   console.log("result: ", result);
  // };

  return (
    <div style={{ marginBottom: 100 }}>
      <PageTitle title="Community" />
      <h2 className={styles.page_date}>{`${selectedValue?.format(
        "YYYY-MM-DD"
      )}`}</h2>

      {plan != undefined && post != undefined ? (
        <Row style={{ marginLeft: 50, marginRight: 50 }}>
          {/* 왼쪽 - 달력 */}
          <Col span={24}>
            <CommunityCalendar
              setDate={setSelectedValue}
              data_plan={plan}
              data_post={post}
            />
          </Col>

          {/* 왼쪽-오른쪽 사이 중간 여백 */}
          <Col span={2}></Col>

          {/* 오른쪽 섹션1 - 주요일정 */}
          <Col span={10}>
            <CommunityPlan data={plan} />

            {/* 오른쪽 섹션 사이의 중간 여백 */}
            <br />
            <br />
            {/* 오른쪽 섹션2 - 커뮤니티 */}
            <CommunityPost data={post} />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default Community;
