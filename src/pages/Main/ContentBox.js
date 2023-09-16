import React from "react";
import { Button, Card, ConfigProvider } from "antd";
import { useMediaQuery } from "react-responsive";
// import { ConfigProvider, Card } from "antd";
import {
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";

const contentStyle = {
  height: "500px",
  color: "#fff",
  textAlign: "center",
  justifyContent: "center",
  background: "#364d79",
};

const ContentBox = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <Card
      hoverable={true}
      title={<h2>{props.title}</h2>}
      style={{ height: 550 }}
      // extra={<a href={props.onClick}>더보기</a>}
      extra={
        <Button type="link" onClick={props.onClick}>
          더보기
        </Button>
      }
    >
      <CardBody>
        {/* <CardTitle
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h2>{props.title}</h2>
      </CardTitle> */}
        <CardText>{props.content}</CardText>
      </CardBody>
    </Card>
    // <ConfigProvider
    //   theme={{
    //     token: {},
    //   }}
    // >
    //   <Card title={props.title} onClick={props.onClick} hoverable={false}>
    //     {props.content}
    //   </Card>
    // </ConfigProvider>
  );
};
export default ContentBox;
