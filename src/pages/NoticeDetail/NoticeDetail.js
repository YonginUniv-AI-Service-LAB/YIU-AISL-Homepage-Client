import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { deleteNotice } from "../../store/actions/notice_actions";

import { Divider, Row, Col, Image, Button, message, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./noticedetail.module.css";
import { colors } from "../../assets/colors";

const NoticeDetail = () => {
  // 공지사항 목록 페이지로부터 받은 데이터
  const location = useLocation();

  const navigate = useNavigate();

  // 리덕스
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.Notice.notice);

  // const confirm = (e) => {
  //   console.log(e);
  //   message.success('Click on Yes');
  // };

  // const cancel = (e) => {
  //   console.log(e);
  //   message.error('Click on No');
  // };

  // // 공지사항 삭제
  // const reqDelete = () => {
  //   dispatch(deleteNotice(location.state.noticeid));
  // };

  return (
    <div style={{ marginBottom: 100 }}>
      <PageTitle title="Notice" />
      <div className={styles.contents_container}>
        <div className={styles.actionBtn_container}>
          <Button
            color="#868e96"
            icon={<EditOutlined />}
            onClick={() =>
              navigate("/notice/update", {
                state: { type: "Update", data: location.state },
              })
            }
          />
          <span style={{ width: 15 }} />
          <Popconfirm
            title="공지사항 삭제"
            description="공지사항을 삭제하시겠습니까?"
            onConfirm={() => dispatch(deleteNotice(location.state.noticeid))}
            // onCancel={cancel}
            okText="네"
            cancelText="아니요"
          >
            <Button
              color="#868e96"
              icon={<DeleteOutlined />}
              // onClick={() => reqDelete()}
            />
          </Popconfirm>
        </div>
        <h1>{location.state.title}</h1>
        <Row justify="space-between" className={styles.notice_info}>
          <Col span={12}>
            <h3 className={styles.notice_info_left}>
              {location.state.createdAt}
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              {location.state.writer}
            </h3>
          </Col>
          <Col span={12} className={styles.notice_info_right}>
            <EyeOutlined size={3} />
            &nbsp;&nbsp;&nbsp;
            <h3>{location.state.views}</h3>
          </Col>
        </Row>
        <Divider
          style={{
            backgroundColor: colors.grey_light,
            height: 2,
            border: "none",
          }}
        />
        <p className={styles.notice_contents}>{location.state.contents}</p>
        <br />
        <br />
        <br />
        <div className={styles.notice_img}>
          <Image width={"70%"} src={location.state.img} />
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
