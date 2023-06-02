import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { Row, Col, Calendar, Table, List, Button, Badge, Popover } from "antd";
import VirtualList from "rc-virtual-list";
import { LikeOutlined } from "@ant-design/icons";
import ContentBox from "./ContentBox";

import { notice_columns_main } from "../../assets/string/notice_columns";
import styles from "./main.module.css";
import { colors } from "../../assets/colors";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const ContainerHeight = 330;

const MainContent = (props) => {
  const [today, setToday] = useState(() => dayjs(new Date()));

  // 달력에 데이터 업데이트
  const renderCell = (data) => {
    let cntPlan = 0;
    let cntPost = 0;
    let date;
    for (let i in props.data_calendar) {
      if (i == data.format("YYYY-MM-DD")) {
        for (let j of props.data_calendar[i]) {
          date = j.date.substring(0, 10);
          if (j.hasOwnProperty("planid")) cntPlan++;
          else if (j.hasOwnProperty("postid")) cntPost++;
        }
      }
    }
    return (
      <>
        {cntPlan > 0 ? (
          <Popover
            content={
              <div>
                {getContents(date).map((item) => {
                  // console.log("item", item);
                  return <h3>{item}</h3>;
                })}
              </div>
            }
            title={date}
            trigger="hover"
          >
            <Badge
              count={cntPlan}
              color={colors.plan}
              style={{ marginRight: 10 }}
            />
          </Popover>
        ) : null}
        {cntPost > 0 ? <Badge count={cntPost} color={colors.post} /> : null}
      </>
    );
  };

  const getContents = (date) => {
    let contents = [];
    console.log(props.data_calendar[date]);
    for (let i of props.data_calendar[date]) {
      contents.push(i.contents);
    }
    return contents;
  };

  return (
    <div style={{ marginLeft: 100, marginRight: 100 }}>
      {console.log("받음: ", props.data_notice)}
      {console.log("받음: ", props.data_community)}
      {console.log("받음: ", props.data_plan)}
      <Row gutter={16}>
        {/* 메인 - 공지사항 */}
        <Col span={8}>
          <ContentBox
            title="Notice"
            onClick={() => props.onClick("./notice")}
            content={
              <Table
                columns={notice_columns_main}
                dataSource={props.data_notice}
                size="middle"
                pagination={{ hideOnSinglePage: true }}
              />
            }
          />
        </Col>

        {/* 메인 - 커뮤니티 */}
        <Col span={8}>
          <ContentBox
            title="Community"
            onClick={() => props.onClick("./community")}
            content={
              <div>
                <h3 style={{ textAlign: "center" }}>{`${today?.format(
                  "YYYY-MM-DD"
                )}`}</h3>
                <VirtualList
                  data={props.data_post}
                  height={ContainerHeight}
                  itemHeight={47}
                  itemKey="key"
                >
                  {(item) => (
                    <List.Item key={item.key} className={styles.post_container}>
                      <Row align={"middle"} justify={"space-between"}>
                        <Col>
                          <div>
                            <h4> {item.writer}</h4>
                            <p>{item.contents}</p>
                          </div>
                        </Col>
                        {/* <h3 style={{}}>⦁ {item.contents}</h3> */}
                      </Row>
                      {/* <Button
                        type="text"
                        icon={<LikeOutlined />}
                        className={styles.like_btn}
                        block={true}
                        disabled={false}
                      >
                        {item.likers.length}
                      </Button> */}
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          paddingBottom: 15,
                        }}
                      >
                        <LikeOutlined /> {item.likers.length}
                      </span>
                    </List.Item>
                  )}
                </VirtualList>
              </div>
            }
          />
        </Col>

        {/* 메인 - 달력(일정) */}
        <Col span={8}>
          <ContentBox
            title="Calendar"
            onClick={() => props.onClick("./community")}
            content={
              <Calendar
                fullscreen={false}
                onPanelChange={onPanelChange}
                cellRender={renderCell}
              />
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default MainContent;
