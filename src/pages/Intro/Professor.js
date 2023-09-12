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

import { professor_wjlee } from "../../assets/string/professor_wjlee";
import { professor_ehkim } from "../../assets/string/professor_ehkim";
import { professor_kjkim } from "../../assets/string/professor_kjkim";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProject } from "../../store/actions/project_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./intro.module.css";
import { colors } from "../../assets/colors";

const Professor = (props) => {
  const { Meta } = Card;

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [professor, setProfessor] = useState(props.professor);

  // 페이지 이동
  const navigate = useNavigate();

  useEffect(() => {
    // professor_`${props.professor}`;
  }, []);

  return (
    <div>
      <div>
        <p>{}</p>
      </div>
    </div>
  );
};

export default Professor;
