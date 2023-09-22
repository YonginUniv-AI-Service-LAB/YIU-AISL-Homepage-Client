import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
  getAllUser,
  enterUser,
  refuseUser,
  getWaitingUser,
} from "../../store/actions/user_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import { colors } from "../../assets/colors";
import styles from "./master.module.css";

const Users = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.User.get_all_user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getAllUser());
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
          dispatch(getAllUser());
        } else ResFunc(res.payload);
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
  };

  const funcRefuseUser = (userid) => {
    dispatch(refuseUser(userid))
      .then((res) => {
        if (res.payload === true) {
          dispatch(getAllUser());
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
        dispatch(getAllUser());
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
      <div
        style={{
          width: isMobile ? "80vw" : isTablet ? "70vw" : "50vw",
          margin: "0 auto",
          marginTop: 50,
        }}
      >
        {data &&
          data.map((item, index) => {
            return (
              <div className={styles.listItem}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: "bold" }}>
                    <span
                      style={{
                        color:
                          item.master == 0
                            ? colors.silver
                            : item.master == 1
                            ? colors.gold
                            : colors.yiu_dark_blue,
                        marginRight: 10,
                        // paddingTop: 5,
                        // paddingBottom: 5,
                        // paddingLeft: 10,
                        // paddingRight: 10,
                        // borderRadius: 50,
                      }}
                    >
                      {item.master == 0 ? "준" : item.master == 1 ? "정" : "마"}
                    </span>
                    {item.name}
                  </span>
                  <br />
                  <span style={{ color: colors.grey_mid }}>{item.email}</span>
                </div>
                {item.email === "bmh2038@naver.com" ||
                item.master == 0 ? null : (
                  <Button
                    color="#868e96"
                    icon={<MinusOutlined />}
                    onClick={() => funcRefuseUser(item.userid)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
    // <div style={{ marginBottom: 100 }}>
    //   <div className={styles.list_container}>
    //     <List
    //       style={{ width: 700, alignSelf: "center" }}
    //       itemLayout="horizontal"
    //       dataSource={allUsers}
    //       renderItem={(item, index) => (
    //         <List.Item
    //           actions={[
    //             <Button
    //               color="#868e96"
    //               icon={<MinusOutlined />}
    //               onClick={() => funcRefuseUser(item.userid)}
    //             />,
    //           ]}
    //         >
    //           <List.Item.Meta title={item.name} description={item.email} />
    //         </List.Item>
    //       )}
    //     />

    //     {/* <Divider>notice</Divider> */}
    //     {/* <Table
    //       columns={notice_columns}
    //       dataSource={noticeList}
    //       size="large"
    //       rowClassName={styles.table_row}
    //       onRow={(record, rowIndex) => {
    //         return {
    //           onClick: (event) => {
    //             navigate("/notice/detail", { state: record.noticeid });
    //           }, // click row
    //           onDoubleClick: (event) => {}, // double click row
    //           onContextMenu: (event) => {}, // right button click row
    //           onMouseEnter: (event) => {}, // mouse enter row
    //           onMouseLeave: (event) => {}, // mouse leave row
    //         };
    //       }}
    //       pagination={{ position: ["bottomCenter"] }}
    //     /> */}
    //   </div>
    // </div>
  );
};

export default Users;
