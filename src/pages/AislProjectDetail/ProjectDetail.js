import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetail,
  deleteProject,
} from "../../store/actions/project_actions";

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
import altImg from "../../assets/images/aisl_carousel_2000.jpg";

import styles from "./projectdetail.module.css";
import { colors } from "../../assets/colors";

const ProjectDetail = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 프로젝트 목록 페이지로부터 받은 데이터
  const location = useLocation();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Project.detail);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getProjectDetail(location.state));
    convertURLtoFile(
      "https://cdn.pixabay.com/photo/2014/04/05/11/40/poster-316690_960_720.jpg"
    );
  }, []);

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    console.log("이미지: ", new File([data], filename, metadata));
    return new File([data], filename, metadata);
  };

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

  const reqDelete = () => {
    dispatch(deleteProject(data.projectid))
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

  const utcToKst = (date) => {
    console.log(new Date());
    let time_diff = 9 * 60 * 60 * 1000;
    let cur_date_korea = new Date(date + time_diff);
    console.log("cur_date_korea: ", cur_date_korea);
    return cur_date_korea;
  };

  return (
    <div>
      {contextHolder}
      {console.log("현재: ", location.state)}
      <div style={{ marginBottom: 100 }}>
        <PageTitle title="Project" />
        {data != undefined ? (
          <div
            // className={styles.contents_container}
            style={{
              margin: "0 auto",
              width: isMobile ? "90%" : isTablet ? "80%" : "60%",
              minHeight: 600,
              // minWidth: isMobile ? 350 : 500,
              // maxWidth: isMobile ? 400 : 700,
            }}
          >
            {sessionStorage.getItem("master") == 2 ? (
              <div className={styles.actionBtn_container}>
                <Button
                  color="#868e96"
                  icon={<EditOutlined />}
                  onClick={() =>
                    navigate("/project/update", {
                      replace: true,
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
            ) : null}
            <p style={{ fontSize: isMobile ? 20 : 27, fontWeight: "bold" }}>
              {data.title}
            </p>
            <Divider
              style={{
                backgroundColor: colors.grey_light,
                height: 2,
                border: "none",
              }}
            />
            <p
              style={{
                fontSize: isMobile ? 17 : 20,
                fontWeight: "bold",
                marginBottom: 50,
              }}
            >
              {data.contents}
            </p>
            <Button
              type="text"
              block
              onClick={() =>
                window.open(data.link, "_blank", "noopener, noreferrer")
              }
            >
              Link
            </Button>
            <br />
            <br />
            <br />
            <div className={styles.project_img}>
              {data.img && (
                <Image
                  // width={"100%"}
                  height={"50%"}
                  src={`${data.img}`.replace(
                    "aiservicelab.yongin.ac.kr/public",
                    "localhost:3000"
                  )}
                  // src={altImg}
                />
              )}
            </div>
          </div>
        ) : null}

        {/* 모달 */}
        <Modal
          title={"프로젝트 삭제"}
          open={isModalOpen}
          okText={"삭제"}
          cancelText={"취소"}
          onOk={() => reqDelete()}
          onCancel={() => setIsModalOpen(false)}
        >
          <div>
            <h4>프로젝트를 삭제하시겠습니까?</h4>
            <br />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectDetail;
