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
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MinusOutlined,
} from "@ant-design/icons";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getWaitingUser,
  enterUser,
  refuseUser,
  getAllUser,
} from "../../store/actions/user_actions";
import { refresh } from "../../store/actions/main_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import { colors } from "../../assets/colors";
import styles from "./master.module.css";
import { ModalFooter } from "reactstrap";

const WaitingUsers = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.User.get_waiting_user);
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

  const funcEnterUser = (userid) => {
    dispatch(enterUser(userid))
      .then((res) => {
        if (res.payload === true) {
          dispatch(getWaitingUser());
          dispatch(getAllUser());
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
                    {item.name}
                  </span>
                  <br />
                  <span style={{ color: colors.grey_mid }}>{item.email}</span>
                </div>
                <Button
                  color="#868e96"
                  icon={<PlusOutlined />}
                  onClick={() => funcEnterUser(item.userid)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WaitingUsers;
