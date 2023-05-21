const sharedOnCell = (_, index) => {
  if (index === 1) {
    return {
      colSpan: 0,
    };
  }
  return {};
};

export const notice_columns = [
  {
    title: "번호",
    dataIndex: "noticeid",
    width: 60,
  },
  {
    title: "제목",
    dataIndex: "title",
  },
  {
    title: "작성자",
    dataIndex: "writer",
    width: 100,
  },
  {
    title: "작성일",
    dataIndex: "createdAt",
    width: 150,
  },
  {
    title: "조회수",
    dataIndex: "views",
    width: 100,
  },
];

export const notice_columns_main = [
  {
    title: "번호",
    dataIndex: "noticeid",
  },
  {
    title: "제목",
    dataIndex: "title",
  },
  {
    title: "작성일",
    dataIndex: "createdAt",
  },
];
