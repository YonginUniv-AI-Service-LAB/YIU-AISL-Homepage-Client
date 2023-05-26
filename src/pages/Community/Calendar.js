import React, { useState, useEffect } from "react";
import { Alert, Calendar, Badge } from "antd";
import dayjs from "dayjs";
import { colors } from "../../assets/colors";

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CommunityCalendar = (props) => {
  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));

  // 달력 날짜 눌렀을 때
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    props.setDate(newValue); // 부모 컴포넌트에 넘겨 상단 날짜 변경
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  // [사용X]
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current, info);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  // [사용X] mode = "year"
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  // [사용X] mode = "month"
  const dateCellRender = (current, info) => {
    console.log("dateCellRender 함수의 value: ", current.date(), info);
  };

  // 달력에 데이터 업데이트
  const renderCell = (data) => {
    let cntPlan = 0;
    let cntPost = 0;
    for (let i in props.data) {
      if (i == data.format("YYYY-MM-DD")) {
        for (let j of props.data[i]) {
          if (j.hasOwnProperty("planid")) cntPlan++;
          else if (j.hasOwnProperty("postid")) cntPost++;
        }
      }
    }
    return (
      <>
        {cntPlan > 0 ? (
          <Badge
            count={cntPlan}
            color={colors.plan}
            style={{ marginRight: 10 }}
          />
        ) : null}
        {cntPost > 0 ? <Badge count={cntPost} color={colors.post} /> : null}
      </>
    );
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={renderCell}
        // mode="month"
      />
    </>
  );
};
export default CommunityCalendar;
