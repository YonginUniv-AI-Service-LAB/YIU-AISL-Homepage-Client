import React, { useState, useEffect } from "react";
import { Alert, Calendar, Badge } from "antd";
import dayjs from "dayjs";

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

  // 커뮤니티 관련 데이터를 달력에 표시
  // 계획: 주황색   커뮤니티: 초록색
  const getListData = (value) => {
    let listData;
    console.log("getListData 함수가 받은 value: ", value.date());
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

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  // 정리
  useEffect(() => {
    getList();
  }, []);

  const dateCellRender = (current, info) => {
    console.log("dateCellRender 함수의 value: ", current.date(), info);
    // const listData = getListData(current);
    // // const listData = getList(value);
    // return (
    //   <ul className="events">
    //     {listData.map((item) => (
    //       <li key={item.content}>
    //         <Badge status={item.type} text={item.content} />
    //       </li>
    //     ))}
    //   </ul>
    // );
  };

  const renderCell = (data) => {
    console.log("renderCell: ", data.format("YYYY-MM-DD"));
    // const listData = getList(data.format("YYYY-MM-DD"));
    // console.log("listData: ", listData);
    // return (
    //   <ul className="events">
    //     {listData.map((item) => (
    //       <li key={item.content}>
    //         <Badge status={item.type} text={item.content} />
    //       </li>
    //     ))}
    //   </ul>
    // );
  };

  const [calendarData, setCalendarDate] = useState([]);

  const getList = () => {
    // console.log("cell: ", cell);
    console.log("시작한다!");
    let data = props.data_plan;
    let result = {};

    for (let i of data) {
      console.log("i: ", i);
      const date = i.date.substring(0, 10);
      if (result.hasOwnProperty(date)) {
        console.log("있음");
        result[date].push(i);
      } else {
        result[date] = [];
        result[date].push(i);
        console.log("없음");
        // result1.push(`[date]: []`);
      }
    }
    console.log("result: ", result);
    setCalendarDate(result);

    // for (let j in result) {
    //   console.log("일치? ", j, cell);
    //   if (j == cell) {
    //     console.log("반환: ", result[j]);
    //     return result[j];
    //   } else return [];
    // }
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current, info);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={renderCell}
      />
    </>
  );
};
export default CommunityCalendar;
