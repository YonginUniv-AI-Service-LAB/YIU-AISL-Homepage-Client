import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/main_actions";
import { useCookies } from "react-cookie";

import {
  Button,
  Dropdown,
  Space,
  ConfigProvider,
  Col,
  Row,
  MenuProps,
  Drawer,
  theme,
} from "antd";
import { colors } from "../../assets/colors";

import HeaderNavBtn from "./HeaderNavBtn";

const DropdownItemStyle = {
  padding: 10,
};

const Header = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const containerStyle = {
    position: "relative",
    height: 100,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const items = [
    {
      key: "1",
      label: "AIServiceLab",
      style: DropdownItemStyle,
      onClick: () => {
        // setMembers("professors");
        navigate("/intro");
      },
    },
    {
      key: "2",
      label: "People",
      style: DropdownItemStyle,
      onClick: () => {
        // setMembers("professors");
        navigate("/intro/people");
      },
    },
    // {
    //   key: "2",
    //   label: "Professors",
    //   style: DropdownItemStyle,
    //   onClick: () => {
    //     // setMembers("professors");
    //     navigate("/intro/members", { state: "professors" });
    //   },
    // },
    // {
    //   key: "3",
    //   label: "Students",
    //   style: DropdownItemStyle,
    //   onClick: () => {
    //     navigate("/intro/members", { state: "students" });
    //   },
    // },
  ];
  const funcLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("master");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ width: "100%" }}>
      {isMobile ? (
        <div>
          {sessionStorage.getItem("userid") ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: isMobile ? 11 : 15,
                  // marginTop: 50,
                }}
              >
                {sessionStorage.getItem("name")} 님
              </p>
              <HeaderNavBtn
                type={"text"}
                text="Logout"
                onClick={() => funcLogout()}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 10,
                marginRight: 10,
              }}
            >
              <HeaderNavBtn type={"text"} text="Login" href="/login" />
              <HeaderNavBtn type={"text"} text="Join" href="/join" />
            </div>
          )}

          <a href="/">
            <p
              style={{
                color: colors.yiu_dark_blue,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              AI Service Lab
            </p>
          </a>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space wrap>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 8,
                    fontSize: isMobile ? 11 : 15,
                  },
                }}
              >
                <Dropdown menu={{ items }} placement="bottom">
                  <Button
                    type="text"
                    size={isMobile ? "small" : "large"}
                    onClick={() => navigate("/intro")}
                  >
                    Introduce
                  </Button>
                </Dropdown>
              </ConfigProvider>
              <HeaderNavBtn type={"text"} text="Project" href="/project" />
              <HeaderNavBtn type={"text"} text="Notice" href="/notice" />
              <HeaderNavBtn type={"text"} text="Community" href="/community" />
              {sessionStorage.getItem("master") == 2 ? (
                <HeaderNavBtn type={"text"} text="Master" href="/master" />
              ) : null}
            </Space>
          </div>
        </div>
      ) : (
        <Row align={"middle"} justify={"space-evenly"}>
          {/* 랩실 로고 */}
          <Col span={4}>
            <a href="/">
              <p
                style={{
                  color: colors.yiu_dark_blue,
                  fontSize: isMobile ? 14 : 30,
                  fontWeight: "bold",
                }}
              >
                AI Service Lab
              </p>
            </a>
          </Col>

          {/* 메인 네비 */}
          <Col span={8}>
            <Space wrap>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 8,
                    fontSize: isMobile ? 11 : 15,
                  },
                }}
              >
                <Dropdown menu={{ items }} placement="bottom">
                  <Button
                    type="text"
                    size={isMobile ? "small" : "large"}
                    onClick={() => navigate("/intro")}
                  >
                    Introduce
                  </Button>
                </Dropdown>
              </ConfigProvider>
              <HeaderNavBtn type={"text"} text="Project" href="/project" />
              <HeaderNavBtn type={"text"} text="Notice" href="/notice" />
              <HeaderNavBtn type={"text"} text="Community" href="/community" />
              {sessionStorage.getItem("master") == 2 ? (
                <HeaderNavBtn type={"text"} text="Master" href="/master" />
              ) : null}
            </Space>
          </Col>
          {/* 로그인&회원가입 */}
          <Col span={4}>
            {sessionStorage.getItem("userid") ? (
              <Space
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 18,
                  }}
                >
                  {sessionStorage.getItem("name")} 님
                </p>
                <HeaderNavBtn
                  type={"text"}
                  text="Logout"
                  onClick={() => funcLogout()}
                />
              </Space>
            ) : (
              <Space>
                <Space>
                  <HeaderNavBtn type={"text"} text="Login" href="/login" />
                  <HeaderNavBtn type={"text"} text="Join" href="/join" />
                </Space>
              </Space>
              // <HeaderNavBtn
              //   type={"text"}
              //   text="Logout"
              //   onClick={() => dispatch(logout())}
              // />
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};
export default Header;

// {
//   key: "1",
//   label: (
//     <a
//       target="_blank"
//       rel="noopener noreferrer"
//       href="https://www.antgroup.com"
//       style={{ textDecoration: "none" }}
//     >
//       AI Service Lab
//     </a>
//   ),
// },

// import React, { useState } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "reactstrap";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <Navbar color="light" light expand="md" style={{ paddingLeft: 150 }}>
//         <NavbarBrand href="/">AI Service Lab</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="ml-auto" navbar>
//             <NavItem>
//               <NavLink href="/intro">Intro</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/notice">Notice </NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 Community
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem href="/board">게시판</DropdownItem>
//                 <DropdownItem href="/album">앨범</DropdownItem>
//                 <DropdownItem divider />
//               </DropdownMenu>
//             </UncontrolledDropdown>
//             <NavItem>
//               <NavLink href="/login">로그인</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/join">회원가입</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </>
//   );
// };

// export default Header;
