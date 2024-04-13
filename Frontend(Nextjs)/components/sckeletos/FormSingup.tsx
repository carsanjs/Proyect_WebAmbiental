import React, { FunctionComponent } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";


interface MyLoaderProps extends IContentLoaderProps {}

const MyLoader: FunctionComponent<MyLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={430}
    viewBox="0 0 400 430"
    backgroundColor="#dee8f2"
    foregroundColor="#1d74aa"
    {...props}
  >
    <rect x="5" y="11" rx="8" ry="8" width="400" height="430" />
  </ContentLoader>
)

export default MyLoader