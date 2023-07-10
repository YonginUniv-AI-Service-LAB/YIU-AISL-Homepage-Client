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
import { deleteProject, getProject } from "../../store/actions/project_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./project.module.css";

const Project = () => {
  const { Meta } = Card;
  // 페이지 이동
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Project.project);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  console.log("innerWidth", innerWidth);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getProject());
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

  const setDelete = (data) => {
    setSelectedId(data);
    setIsModalOpen(true);
  };

  const reqDelete = () => {
    dispatch(deleteProject(selectedId))
      .then((res) => {
        if (res.payload === true) {
          navigate("/project", {
            replace: true,
          });
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
        errorMsg("이미 삭제된 프로젝트입니다.");
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

  const getColumn = () => {
    if (innerWidth <= 899) return 1;
    else if (innerWidth <= 1300) return 2;
    else if (innerWidth <= 1799) return 3;
    else return 4;
  };

  return (
    <div style={{ marginBottom: 100 }}>
      <PageTitle title="Project" />
      <div className={styles.list_container}>
        {sessionStorage.getItem("master") == 2 ? (
          <div className={styles.createBtn}>
            <Button
              color="#868e96"
              icon={<PlusOutlined />}
              onClick={() =>
                navigate("/project/create", { state: { type: "create" } })
              }
            />
          </div>
        ) : null}

        <div className={styles.list_inner_container}>
          <List
            grid={{
              column: getColumn(),
              gutter: 25,
              // xs: 1,
              // sm: 2,
              // md: 4,
              // lg: 4,
              // xl: 6,
              // xxl: 3,
            }}
            style={{
              marginTop: 50,
            }}
            className={styles.inner_container}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  hoverable
                  onClick={() => navigate("/project/detail", { state: item })}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 30,
                  }}
                  className={styles.card}
                  cover={
                    <img
                      alt="example"
                      src={item.img}
                      className={styles.cardImg}
                    />
                  }
                >
                  <Meta title={item.title} />
                </Card>
              </List.Item>
            )}
          />
        </div>
        {/* <List
          style={{
            display: "flex",
            // alignSelf: "center",
            justifyContent: "center",
          }}
          grid={{
            gutter: 20,
            // xs: 1,
            // sm: 2,
            // md: 4,
            // lg: 4,
            // xl: 6,
            // xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            // <a
            //   onClick={() =>
            //     navigate("/project/detail", { state: item.projectid })
            //   }
            // >
            <Card
              hoverable
              style={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
              }}
              onClick={() => navigate("/project/detail", { state: item })}
              cover={
                <img alt="example" src={item.img} className={styles.cardImg} />
              }
            >
              <Meta title={item.title} />
            </Card>
            // </a>
          )}
        /> */}
      </div>
    </div>
  );
};

export default Project;
