import React, { useState, useContext } from "react";
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
} from "antd";
import { colors } from "../../assets/colors";

import HeaderNavBtn from "./HeaderNavBtn";

const DropdownItemStyle = {
  padding: 10,
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      label: "Members",
      style: DropdownItemStyle,
      onClick: () => {
        // setMembers("professors");
        navigate("/intro/members");
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
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("master");
    navigate("/", { replace: true });
  };

  return (
    <div>
      {console.log("제발: ", sessionStorage.getItem("userid"))}
      <Row align={"middle"} justify={"space-evenly"}>
        {/* 랩실 로고 */}
        <Col span={4}>
          <a href="/">
            <h1 style={{ color: colors.yiu_dark_blue }}>AI Service Lab</h1>
          </a>
        </Col>

        {/* 메인 네비 */}
        <Col span={8}>
          <Space wrap>
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 8,
                },
              }}
            >
              <Dropdown menu={{ items }} placement="bottom">
                <Button
                  type="text"
                  size="large"
                  onClick={() => navigate("/intro")}
                >
                  Introduce
                </Button>
              </Dropdown>
            </ConfigProvider>
            <HeaderNavBtn type={"text"} text="Notice" href="/notice" />
            <HeaderNavBtn type={"text"} text="Community" href="/community" />
          </Space>
        </Col>
        {console.log(sessionStorage.getItem("userid"))}
        {/* 로그인&회원가입 */}
        <Col span={4}>
          {sessionStorage.getItem("userid") ? (
            <Space>
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
