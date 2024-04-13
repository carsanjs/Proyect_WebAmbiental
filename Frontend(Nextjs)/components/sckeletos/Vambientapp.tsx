import React, { FunctionComponent } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

interface MyLoaderProps extends IContentLoaderProps {}

const MyLoader: FunctionComponent<MyLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={270}
    height={45}
    viewBox="0 0 270 45"
    backgroundColor="#dee8f2"
    foregroundColor="#1d74aa"
    {...props}
  >
    <rect x="37" y="20" rx="0" ry="0" width="270" height="45" />
  </ContentLoader>
);

export default MyLoader;
