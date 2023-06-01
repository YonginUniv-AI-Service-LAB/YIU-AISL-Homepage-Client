import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getNoticeDetail,
  deleteNotice,
} from "../../store/actions/notice_actions";

import {
  Divider,
  Row,
  Col,
  Image,
  Button,
  message,
  Popconfirm,
  Modal,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./noticedetail.module.css";
import { colors } from "../../assets/colors";

const NoticeDetail = () => {
  // 공지사항 목록 페이지로부터 받은 데이터
  const location = useLocation();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Notice.detail);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getNoticeDetail(location.state));
    // console.log("넘어온 공지사항 id: ", location.state);
  }, []);

  // 에러메세지 함수
  const error = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 완료메세지 함수
  const complete = (data) => {
    messageApi.open({
      type: "success",
      content: data,
    });
  };

  const reqDelete = () => {
    let result = dispatch(deleteNotice(data.noticeid));
    if (result.payload === true)
      navigate("/notice", {
        replace: true,
      });
    else ResFunc(result.payload);
  };

  const ResFunc = (res) => {
    switch (res) {
      case 400:
        error("입력한 값을 확인해주세요.");
        break;
      case 403:
        error("접근 권한이 없습니다.");
        break;
      case 404:
        error("이미 삭제된 일정입니다.");
        break;
      case 500:
        error("관리자에게 문의해주세요.");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {contextHolder}
      {/* {console.log("현재: ", location.state.noticeid)} */}
      <div style={{ marginBottom: 100 }}>
        <PageTitle title="Notice" />
        <div className={styles.contents_container}>
          <div className={styles.actionBtn_container}>
            <Button
              color="#868e96"
              icon={<EditOutlined />}
              onClick={() =>
                navigate("/notice/update", {
                  state: { type: "update", data: data },
                })
              }
            />
            <span style={{ width: 15 }} />
            <Button
              color="#868e96"
              icon={<DeleteOutlined />}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <h1>{data.title}</h1>
          <Row justify="space-between" className={styles.notice_info}>
            <Col span={12}>
              <h3 className={styles.notice_info_left}>
                {data.createdAt}
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                {data.writer}
              </h3>
            </Col>
            <Col span={12} className={styles.notice_info_right}>
              <EyeOutlined size={3} />
              &nbsp;&nbsp;&nbsp;
              <h3>{data.views}</h3>
            </Col>
          </Row>
          <Divider
            style={{
              backgroundColor: colors.grey_light,
              height: 2,
              border: "none",
            }}
          />
          <p className={styles.notice_contents}>{data.contents}</p>
          <br />
          <br />
          <br />
          <div className={styles.notice_img}>
            <Image width={"70%"} src={data.img} />
          </div>
        </div>

        {/* 모달 */}
        <Modal
          title={"공지사항 삭제"}
          open={isModalOpen}
          okText={"삭제"}
          cancelText={"취소"}
          onOk={() => reqDelete()}
          onCancel={() => setIsModalOpen(false)}
        >
          <div>
            <h4>공지사항을 삭제하시겠습니까?</h4>
            <br />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NoticeDetail;
