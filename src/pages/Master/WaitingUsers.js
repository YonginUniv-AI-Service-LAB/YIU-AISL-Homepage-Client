import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Table,
  Pagination,
  Button,
  List,
  Card,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getWaitingUser,
  enterUser,
  refuseUser,
} from "../../store/actions/user_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./master.module.css";
import { ModalFooter } from "reactstrap";

const WaitingUsers = () => {
  // 페이지 이동
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.User.get_all_users);
  // const data = useSelector((state) => state.User.get_waiting_users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getWaitingUser());
  }, []);

  // 에러메세지 함수
  const errorMsg = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 완료메세지 함수
  const completeMsg = (data) => {
    messageApi.open({
      type: "success",
      content: data,
    });
  };

  const funcEnterUser = () => {
    dispatch(enterUser(selectedId))
      .then((res) => {
        if (res.payload === true) {
          dispatch(getWaitingUser());
        } else ResFunc(res.payload);
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
  };

  const funcRefuseUser = () => {
    dispatch(refuseUser(selectedId))
      .then((res) => {
        if (res.payload === true) {
          dispatch(getWaitingUser());
        } else ResFunc(res.payload);
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
  };

  const ResFunc = (res) => {
    switch (res) {
      case 400:
        errorMsg("새로고침 후 다시 시도해주세요.");
        break;
      case 403:
        errorMsg("접근 권한이 없습니다.");
        break;
      case 404:
        errorMsg("새로고침 후 다시 시도해주세요.");
        navigate("/project", {
          replace: true,
        });
        break;
      case 500:
        errorMsg("관리자에게 문의해주세요.");
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ marginBottom: 100 }}>
      <div className={styles.list_container}>
        <List
          // style={{
          //   minWidth: 1000,
          //   maxWidth: 1200,
          // }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            // <a
            //   onClick={() =>
            //     navigate("/project/detail", { state: item.projectid })
            //   }
            // >
            <Card
              style={{
                marginTop: 16,
              }}
              type="inner"
              title={<h3>{item.title}</h3>}
              extra={
                sessionStorage.getItem("master") == 2 ? (
                  <div className={styles.actionBtn_container}>
                    <Button
                      color="#868e96"
                      icon={<EditOutlined />}
                      onClick={() => funcEnterUser()}
                    />
                    &nbsp;&nbsp;
                    <Button
                      color="#868e96"
                      icon={<DeleteOutlined />}
                      onClick={() => funcRefuseUser()}
                    />
                  </div>
                ) : null
              }
              // extra={<a href={item.link}>Link</a>}
            >
              {item.contents}
              <br />
              <br />
              <a href={item.link}>Link</a>
            </Card>
            // </a>
          )}
        />

        {/* <Divider>notice</Divider> */}
        {/* <Table
          columns={notice_columns}
          dataSource={noticeList}
          size="large"
          rowClassName={styles.table_row}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate("/notice/detail", { state: record.noticeid });
              }, // click row
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
          pagination={{ position: ["bottomCenter"] }}
        /> */}
      </div>
    </div>
  );
};

export default WaitingUsers;
