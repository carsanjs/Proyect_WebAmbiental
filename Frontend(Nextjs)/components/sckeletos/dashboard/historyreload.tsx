import { FunctionComponent } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";
interface MyLoaderProps extends IContentLoaderProps {}

const MyLoader: FunctionComponent<MyLoaderProps> = (props) => (
  <ContentLoader 
  speed={2}
  width={845}
  height={42}
  viewBox="0 0 845 42"
  backgroundColor="#f3f3f3"
  foregroundColor="#6592ae"
  {...props}
>
  <circle cx="25" cy="21" r="15" /> 
  <rect x="129" y="13" rx="0" ry="0" width="150" height="23" /> 
  <rect x="420" y="13" rx="0" ry="0" width="188" height="23" /> 
  <rect x="780" y="13" rx="0" ry="0" width="123" height="23" />
</ContentLoader>
);

export default MyLoader;
