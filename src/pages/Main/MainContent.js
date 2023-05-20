import React from "react";

import { Row, Col, Calendar, Table, List } from "antd";
import ContentBox from "./ContentBox";

import { notice_columns_main } from "../../assets/string/notice_columns";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const MainContent = (props) => {
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
                <h3>2023-05-13-토</h3>
                <List
                  itemLayout="horizontal"
                  dataSource={props.data_community}
                  renderItem={(item, index) => (
                    <div style={{ borderRadius: 10 }}>
                      <h3>{item.writer}</h3>
                      <p>{item.contents}</p>
                    </div>
                    // <List.Item>
                    //   <h3>{item.writer}</h3>
                    //   <p>{item.contents}</p>
                    //   {/* <Card title={item.writer}>{item.contents}</Card> */}
                    //   {/* <List.Item.Meta
                    //     title={<a href="https://ant.design">{item.writer}</a>}
                    //     description={item.contents}
                    //   /> */}
                    // </List.Item>
                  )}
                />
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
