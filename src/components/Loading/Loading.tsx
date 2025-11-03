import { FunctionComponent } from "react";
import { Spin } from "antd";
import classes from "./Loading.module.css";

const Loading: FunctionComponent = () => {
  return (
    <div className={classes.container}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;
