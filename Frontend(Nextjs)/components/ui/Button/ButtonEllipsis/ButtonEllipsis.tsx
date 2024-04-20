import { VscEllipsis } from "react-icons/vsc";
import "./style.css";
import { NavLink } from "react-router-dom";

interface Ellipsis {
  to: string;
}

const Ellipsis = ({ to }: Ellipsis) => {
  return (
    <NavLink 
    className="btnElipsis"
    to={to}>
      <VscEllipsis />
    </NavLink>
  );
};
export default Ellipsis;

{
  /* <a className="btnElipsis"
  
  onClick={onClick}>{<VscEllipsis />}</a>; */
}
