import { FunctionComponent } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";


interface MyLoaderProps extends IContentLoaderProps {}

const MyLoader: FunctionComponent<MyLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={70}
    height={74}
    viewBox="0 0 70 74"
    backgroundColor="#dee8f2"
    foregroundColor="#1d74aa"
    {...props}
  >
    <rect width="70" height="74" />
  </ContentLoader>
)

export default MyLoader
