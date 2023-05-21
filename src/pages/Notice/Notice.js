import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Table, Pagination, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { getNotice } from "../../store/actions/notice_actions";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./notice.module.css";
import { notice_columns } from "../../assets/string/notice_columns";

const Notice = () => {
  // 페이지 이동
  const navigate = useNavigate();

  // 리덕스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Notice.notice);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(getNotice());
  }, []);

  // 페이지네이션
  // const [current, setCurrent] = useState(0);
  // const onChange = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };

  return (
    <div style={{ marginBottom: 100 }}>
      <PageTitle title="Notice" />
      <div className={styles.table_container}>
        <div className={styles.createBtn}>
          <Button
            color="#868e96"
            icon={<PlusOutlined />}
            onClick={() =>
              navigate("/notice/create", { state: { type: "Create" } })
            }
          />
        </div>
        {/* <Divider>notice</Divider> */}
        <Table
          columns={notice_columns}
          dataSource={data}
          size="large"
          rowClassName={styles.table_row}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate("/notice/detail", { state: record });
              }, // click row
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
    </div>
  );
};

export default Notice;
