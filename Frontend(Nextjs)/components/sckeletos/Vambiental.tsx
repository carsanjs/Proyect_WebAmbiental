import React, { FunctionComponent } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";


interface MyLoaderProps extends IContentLoaderProps {}

const MyLoader : FunctionComponent<MyLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={362}
    height={510}
    viewBox="0 0 362 510"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="258" y="62" rx="3" ry="3" width="74" height="10" /> 
    <rect x="260" y="23" rx="3" ry="3" width="52" height="10" /> 
    <rect x="257" y="42" rx="3" ry="3" width="97" height="10" /> 
    <rect x="41" y="114" rx="3" ry="3" width="111" height="84" /> 
    <rect x="3" y="57" rx="3" ry="3" width="115" height="18" /> 
    <circle cx="82" cy="468" r="31" /> 
    <rect x="45" y="336" rx="3" ry="3" width="66" height="13" /> 
    <rect x="161" y="211" rx="3" ry="3" width="114" height="88" /> 
    <rect x="43" y="207" rx="3" ry="3" width="111" height="90" /> 
    <rect x="159" y="116" rx="3" ry="3" width="116" height="84" /> 
    <rect x="129" y="327" rx="3" ry="3" width="38" height="22" /> 
    <rect x="41" y="371" rx="3" ry="3" width="163" height="17" /> 
    <circle cx="250" cy="467" r="31" />
  </ContentLoader>
)

export default MyLoader