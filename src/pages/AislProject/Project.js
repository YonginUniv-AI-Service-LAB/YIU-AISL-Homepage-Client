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
} from "@ant-design/icons";
import altImg from "../../assets/images/aisl_carousel_2000.jpg";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProject } from "../../store/actions/project_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./project.module.css";
import { colors } from "../../assets/colors";

const Project = () => {
  const { Meta } = Card;

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

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
    <div>
      <PageTitle title="Project" />
      <div
        style={{
          width: isMobile ? "90%" : "60%",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        {sessionStorage.getItem("master") == 2 ? (
          <div className={styles.createBtn}>
            <Button
              color="#868e96"
              icon={<PlusOutlined />}
              onClick={() =>
                navigate("/project/create", { state: { type: "create" } })
              }
            />
            <Divider
              style={{
                backgroundColor: colors.grey_light,
                height: 2,
                border: "none",
              }}
            />
          </div>
        ) : null}
      </div>
      <div
        style={{ marginTop: "10vh", marginBottom: "5vh" }}
        className={styles.container}
      >
        <div
          style={{
            display: "grid",
            margin: isMobile ? 20 : 50,
            marginRight: 100,
            marginLeft: 100,
            textAlign: "center",
            gridTemplateColumns: `repeat(auto-fill, minmax(${
              isMobile ? "50vw" : "25vw"
            }, 1fr))`,
            gridAutoRows: "1fr",
            rowGap: 30,
            columnGap: 30,
          }}
        >
          {data &&
            data.map((item, index) => {
              return (
                <div
                  style={{
                    textAlign: "center",
                    borderRadius: 10,
                    // backgroundColor: colors.grey_light2,
                    paddingBottom: 20,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/project/detail", { state: item.projectid })
                  }
                >
                  <img
                    src={altImg}
                    // src={item.img ? item.img : altImg}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      objectFit: "cover",
                    }}
                  />
                  <p
                    style={{ fontSize: isMobile ? 15 : 20, fontWeight: "bold" }}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Project;
