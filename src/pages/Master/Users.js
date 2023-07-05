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
import { MinusOutlined } from "@ant-design/icons";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  enterAdmin,
  refuseAdmin,
} from "../../store/actions/user_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./master.module.css";

const Users = () => {
  // 페이지 이동
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.User.get_users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getUsers());
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

  const funcEnterAdmin = () => {
    dispatch(enterAdmin(selectedId))
      .then((res) => {
        if (res.payload === true) {
          dispatch(getUsers());
        } else ResFunc(res.payload);
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
  };

  const funcRefuseAdmin = () => {
    dispatch(refuseAdmin(selectedId))
      .then((res) => {
        if (res.payload === true) {
          dispatch(getUsers());
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
        dispatch(getUsers());
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
          style={{ width: 700, alignSelf: "center" }}
          itemLayout="horizontal"
          dataSource={allUsers}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  color="#868e96"
                  icon={<MinusOutlined />}
                  onClick={() => funcRefuseAdmin()}
                />,
              ]}
            >
              <List.Item.Meta title={item.name} description={item.email} />
            </List.Item>
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

export default Users;
