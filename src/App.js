import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

import {
  Router,
  Routes,
  Route,
  Link,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import ScrollToTop from "./scrollTop";

import Layout from "./pages/Layout/Layout";
import Main from "./pages/Main/Main";
import Album from "./pages/Album/Album";
import FindUserInfo from "./pages/FindUserInfo/FindUserInfo";
import Intro from "./pages/Intro/Intro";
import Members from "./pages/Intro/Members";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Community from "./pages/Community/Community";
import Notice from "./pages/Notice/Notice";
import NoticeDetail from "./pages/NoticeDetail/NoticeDetail";
import NoticeForm from "./pages/NoticeForm/NoticeForm";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route exact path="/*" element={<Main />} />
          <Route exact path="/album" element={<Album />} />
          <Route exact path="/finduserinfo" element={<FindUserInfo />} />
          <Route exact path="/intro" element={<Intro />} />
          <Route exact path="/intro/members" element={<Members />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/notice" element={<Notice />} />
          <Route exact path="/notice/detail" element={<NoticeDetail />} />
          <Route exact path="/notice/create" element={<NoticeForm />} />
          <Route exact path="/notice/update" element={<NoticeForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
