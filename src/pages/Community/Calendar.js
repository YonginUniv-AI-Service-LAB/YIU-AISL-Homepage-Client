import React, { useState } from "react";
import { Alert, Calendar, Badge } from "antd";
import dayjs from "dayjs";

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event。。....",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CommunityCalendar = (props) => {
  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    props.setDate(newValue); // 부모 컴포넌트에 넘겨 상단 날짜 변경
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
      />
    </>
  );
};
export default CommunityCalendar;
