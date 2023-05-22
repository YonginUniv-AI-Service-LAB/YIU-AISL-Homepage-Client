import React, { useState } from "react";
import dayjs from "dayjs";

import { Row, Col, Calendar, Table, List, Button } from "antd";
import VirtualList from "rc-virtual-list";
import { LikeOutlined } from "@ant-design/icons";
import ContentBox from "./ContentBox";

import { notice_columns_main } from "../../assets/string/notice_columns";
import styles from "./main.module.css";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const ContainerHeight = 330;

const MainContent = (props) => {
  const [today, setToday] = useState(() => dayjs(new Date()));

  return (
    <div style={{ marginLeft: 100, marginRight: 100 }}>
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
                <h3>{`${today?.format("YYYY-MM-DD")}`}</h3>
                <VirtualList
                  data={props.data_community}
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
                      <Button
                        type="text"
                        icon={<LikeOutlined />}
                        className={styles.like_btn}
                        block={true}
                        disabled={false}
                      >
                        100
                      </Button>
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
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default MainContent;
