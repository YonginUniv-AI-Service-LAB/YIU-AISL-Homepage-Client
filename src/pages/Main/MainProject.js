import React from "react";
import { useMediaQuery } from "react-responsive";
import Fade from "react-reveal/Fade";
import ScrollContainer from "react-indiana-drag-scroll";

import styles from "./main.module.css";
import { colors } from "../../assets/colors";
import { aisl } from "../../assets/string/aisl";
import altImg from "../../assets/images/aisl_carousel_2000.jpg";
import Main_ContentTitle from "../../components/Text/Main_ContentTitle";
import Small_MoreTextButton from "../../components/Button/Small_MoreTextButton";

const MainProject = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const showProject = () => {
    let data = props.data_project;
    return (
      <div
        style={{
          display: "grid",
          margin: 50,
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
        {data.map((item, index) => {
          if (index < 3)
            return (
              <div
                style={{
                  textAlign: "center",
                  borderRadius: 10,
                  // backgroundColor: colors.grey_light2,
                  paddingBottom: 20,
                  cursor: "pointer",
                }}
                // onClick={() =>
                //   navigate("/project/detail", { state: item.projectid })
                // }
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
                <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: "bold" }}>
                  {item.title}
                </p>
              </div>
            );
        })}
      </div>
    );
  };

  return (
    <div
      style={{
        // height: 300,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Main_ContentTitle title={"Our Projects"} />
      {props.data_project && showProject()}
      <Small_MoreTextButton
        title={"프로젝트 더보기"}
        onClick={() => props.moveProject()}
      />
    </div>
  );
};
export default MainProject;
