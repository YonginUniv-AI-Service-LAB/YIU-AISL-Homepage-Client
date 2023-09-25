import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";

import { Row, Col, Calendar, Table, List, Button, Badge, Popover } from "antd";
import VirtualList from "rc-virtual-list";
import { LikeOutlined } from "@ant-design/icons";
import ContentBox from "./ContentBox";

import { notice_columns_main } from "../../assets/string/notice_columns";
import styles from "./main.module.css";
import { colors } from "../../assets/colors";

const onPanelChange = (value, mode) => {
  // console.log(value.format("YYYY-MM-DD"), mode);
};

const ContainerHeight = 330;

const MainContent = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [today, setToday] = useState(() => dayjs(new Date()));
  const [descPost, setDescPost] = useState([]);

  // 달력에 데이터 업데이트
  const renderCell = (data) => {
    let cntPlan = 0;
    let cntPost = 0;
    let date;
    for (let i in props.data_calendar) {
      if (i == data.format("YYYY-MM-DD")) {
        for (let j of props.data_calendar[i]) {
          date = j.planid
            ? j.date.substring(0, 10)
            : j.createdAt.substring(0, 10);
          if (j.hasOwnProperty("planid")) cntPlan++;
          else if (j.hasOwnProperty("postid")) cntPost++;
        }
      }
    }

    return (
      <div>
        {date ? (
          <Popover
            content={
              <div>
                {getContents(date).map((item) => {
                  return <h3>{item}</h3>;
                })}
              </div>
            }
            title={date}
            trigger="hover"
          >
            {cntPlan > 0 ? (
              <Badge
                count={cntPlan}
                color={colors.plan}
                style={{ marginRight: 10 }}
              />
            ) : null}
            {cntPost > 0 ? <Badge count={cntPost} color={colors.post} /> : null}
          </Popover>
        ) : null}
      </div>
    );
  };

  const getContents = (date) => {
    let contents = [];
    // console.log(props.data_calendar[date]);
    for (let i of props.data_calendar[date]) {
      contents.push(i.contents);
    }
    return contents;
  };

  return (
    <div
      style={{
        margin: isMobile ? 50 : isTablet ? 70 : 20,
      }}
    >
      <div
        style={{
          display: "grid",
          textAlign: "center",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            isMobile ? "50vw" : isTablet ? "45vw" : "25vw"
          }, 1fr))`,
          gridAutoRows: "1fr",
          rowGap: 30,
          columnGap: 20,
        }}
      >
        {/* 메인 - 공지사항 */}
        <div>
          <ContentBox
            title="Notice"
            onClick={() => props.onClick("/notice")}
            content={
              <Table
                columns={notice_columns_main}
                dataSource={props.data_notice}
                size="middle"
                pagination={{ hideOnSinglePage: true }}
              />
            }
          />
        </div>

        {/* 메인 - 커뮤니티 */}
        <div>
          <ContentBox
            title="Community"
            onClick={() => props.onClick("/community")}
            content={
              <div>
                {/* <h3 style={{ textAlign: "center" }}>{`${today?.format(
                  "YYYY-MM-DD"
                )}`}</h3> */}
                <VirtualList
                  data={props.data_post}
                  height={ContainerHeight}
                  itemHeight={47}
                  itemKey="key"
                >
                  {(item) => (
                    <List.Item key={item.key} className={styles.post_container}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "bold",
                          marginLeft: 5,
                          paddingTop: 20,
                        }}
                      >
                        <span>{item.writer}</span>
                        <span>{item.createdAt.substring(0, 10)}</span>
                      </div>
                      <p
                        style={{
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 8,
                        }}
                      >
                        {item.contents}
                      </p>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: 5,
                          paddingBottom: 19,
                        }}
                      >
                        <LikeOutlined />
                        &nbsp;&nbsp;&nbsp;{item.likers.length}
                      </span>
                    </List.Item>
                  )}
                </VirtualList>
              </div>
            }
          />
        </div>

        {/* 메인 - 달력(일정) */}
        <div>
          <ContentBox
            title="Calendar"
            onClick={() => props.onClick("/community")}
            content={
              <Calendar
                fullscreen={false}
                onPanelChange={onPanelChange}
                cellRender={renderCell}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
