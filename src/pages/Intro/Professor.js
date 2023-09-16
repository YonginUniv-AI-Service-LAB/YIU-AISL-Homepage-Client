import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { aisl_professors } from "../../assets/string/aisl_professors";
import userImg from "../../assets/images/user.png";
import defaultImg from "../../assets/images/yiu_logo.jpg";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProject } from "../../store/actions/project_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./intro.module.css";
import { colors } from "../../assets/colors";
import Card_Professor_Contents from "../../components/Card/Card_Professor_Contents";

const Professor = (props) => {
  const { Meta } = Card;

  // 페이지 이동
  const navigate = useNavigate();
  // get params
  const { id } = useParams();

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [professor, setProfessor] = useState(id);

  useEffect(() => {
    const result = aisl_professors.find((e) => e.id === id);
    console.log("result: ", result);
    setProfessor(result);
  }, []);

  return (
    <div
      style={{
        width: isMobile ? "90vw" : isTablet ? "80vw" : "70vw",
        margin: "0 auto",
        marginBottom: 100,
        whiteSpace: "pre-line",
      }}
    >
      <PageTitle title="Professor" />
      {/* Top Card */}
      <div
        style={{
          backgroundColor: colors.grey_light2,
          display: "grid",
          // gridTemplateColumns: `repeat(auto-fit, minmax(${
          //   "50vw"
          // }, 1fr))`,
          gridTemplateColumns: isMobile
            ? `repeat(auto-fit, minmax(${"50vw"}, 1fr))`
            : isTablet
            ? "1fr 7fr"
            : "1fr 5fr",
          // gridAutoRows: "1fr",
          rowGap: 20,
          columnGap: 10,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <div
          style={{
            // backgroundColor: "red",
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          <img
            src={professor.img ? professor.img : defaultImg}
            style={{
              // width: isMobile ? 150 : isMobile ? 170 : 200,
              height: isMobile ? 200 : isTablet ? 220 : 250,
              // width: isMobile ? "40%" : isTablet ? "40%" : "50%",
              // height: isMobile ? "40%" : isTablet ? "40%" : "50%",
              // borderRadius: 10,
              marginRight: isMobile ? null : 30,
              objectFit: "contain",
            }}
          />
        </div>
        <div>
          <p
            style={{
              fontSize: isMobile ? 20 : isTablet ? 23 : 25,
              fontWeight: "bold",
              textAlign: isMobile ? "center" : null,
            }}
          >
            {professor.name}
            <span
              style={{
                marginLeft: 10,
                color: colors.grey_mid,
                fontWeight: "normal",
              }}
            >
              {professor.engName}
            </span>
          </p>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(${
                isMobile ? "40vw" : isTablet ? "55vw" : "50%"
              }, 1fr))`,
              textAlign: isMobile ? "center" : null,
            }}
            // style={{
            //   width: "100%",
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "space-evenly",
            //   alignItems: "center",
            // }}
          >
            {professor.Department ? (
              <p
                style={{
                  width: isMobile ? "100%" : isTablet ? "70%" : "95%",
                  // backgroundColor: "blue",
                }}
              >
                {professor.Department}
              </p>
            ) : null}
            <div
              style={{
                width: isMobile ? "100%" : isTablet ? "70%" : "100%",
                // backgroundColor: "green",
              }}
            >
              {professor.Email ? <p>Email: {professor.Email}</p> : null}
              {professor.Office ? <p>Office: {professor.Office}</p> : null}
              {professor.Fax ? <p>Fax: {professor.Fax}</p> : null}
              {professor.Mobile ? <p>Mobile: {professor.Mobile}</p> : null}
            </div>
          </div>
        </div>
      </div>

      {/* Contents */}
      <div>
        {professor.Research_Interests ? (
          <Card_Professor_Contents
            title={"Research Interests"}
            contents={professor.Research_Interests}
          />
        ) : null}
        {professor.Research ? (
          <Card_Professor_Contents
            title={"Research"}
            contents={professor.Research}
          />
        ) : null}
        {professor.Educations ? (
          <Card_Professor_Contents
            title={"Educations"}
            contents={professor.Educations}
          />
        ) : null}
        {professor.Careers ? (
          <Card_Professor_Contents
            title={"Careers"}
            contents={professor.Careers}
          />
        ) : null}
        {professor.Teaching_Subjects ? (
          <Card_Professor_Contents
            title={"Teaching Subjects"}
            contents={professor.Teaching_Subjects}
          />
        ) : null}
        {professor.Skills ? (
          <Card_Professor_Contents
            title={"Skills"}
            contents={professor.Skills}
          />
        ) : null}
        {professor.Publications ? (
          <Card_Professor_Contents
            title={"Publications"}
            contents={professor.Publications}
          />
        ) : null}
        {professor.Awards ? (
          <Card_Professor_Contents
            title={"Awards"}
            contents={professor.Awards}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Professor;
