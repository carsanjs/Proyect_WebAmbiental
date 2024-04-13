import React, { FunctionComponent } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";


interface MyLoaderProps extends IContentLoaderProps {}

const MyLoader: FunctionComponent<MyLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={726}
    height={635}
    viewBox="0 0 726 635"
    backgroundColor="#dee8f2"
    foregroundColor="#1d74aa"
    {...props}
  >
    <rect x="6" y="14" rx="8" ry="8" width={726} height={616} />
  </ContentLoader>
);

export default MyLoader;
