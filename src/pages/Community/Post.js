import React, { useState } from "react";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunity,
  createPost,
  updatePost,
  deletePost,
  like,
} from "../../store/actions/community_actions";

import {
  Card,
  Space,
  Input,
  Button,
  Row,
  Col,
  List,
  Dropdown,
  Modal,
} from "antd";
import VirtualList from "rc-virtual-list";
import { MoreOutlined, LikeOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import styles from "./community.module.css";
import { data_community } from "../../assets/data/community";

// 섹션 높이 지정
const ContainerHeight = 400;

const CommunityPost = (props) => {
  // 게시글 편집 버튼(수정, 삭제)
  const items = [
    {
      key: "1",
      label: (
        <Button
          type="link"
          block={true}
          onClick={() => {
            setType("update");
            showModal();
          }}
        >
          게시글 수정
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="link"
          block={true}
          onClick={() => {
            setType("delete");
            showModal();
          }}
        >
          게시글 삭제
        </Button>
      ),
    },
  ];
  const [contents, setContents] = useState("");

  const [type, setType] = useState("update");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(() => dayjs(new Date()));

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className={styles.section_title}>Community</h1>
      <Row>
        <Col span={19}>
          <Card>
            <VirtualList
              data={props.data}
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
                    <Col>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottom"
                      >
                        <Button
                          className={styles.community_btn}
                          type="text"
                          icon={<MoreOutlined />}
                          style={{ textAlign: "center" }}
                        ></Button>
                      </Dropdown>
                    </Col>
                    {/* <h3 style={{}}>⦁ {item.contents}</h3> */}
                  </Row>
                  <Button
                    type="text"
                    icon={<LikeOutlined />}
                    className={styles.like_btn}
                    block={true}
                  >
                    100
                  </Button>
                </List.Item>
              )}
            </VirtualList>
            <Space.Compact style={{ width: "100%", marginTop: 30 }}>
              <Input placeholder="글을 작성해보세요." onChange={setContents} />
              <Button
                type="primary"
                style={{ backgroundColor: "#fcece7", color: "#2a3037" }}
              >
                작성
              </Button>
            </Space.Compact>
          </Card>
        </Col>
      </Row>
      <Modal
        title={type === "update" ? "게시글 수정" : "게시글 삭제"}
        open={isModalOpen}
        okText={type === "update" ? "수정" : "삭제"}
        cancelText={"취소"}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default CommunityPost;
