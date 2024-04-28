import React,{ FC, ReactNode, useRef } from "react";
import "./style.css"

interface TooltipItem {
  id: string;
  component: ReactNode;
}

interface Props {
  children: ReactNode;
  tooltip?: TooltipItem[];
}

export const TooltipTitle: FC<Props> = ({ children, tooltip }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        console.log(left)
        let constvalue = tooltipRef.current.style.left=(clientX - left) - 250 + "px";
        let constvalue2 = tooltipRef.current.style.top=(clientX - left) - 50 + "px";
        console.log(constvalue)
        console.log(constvalue2)
        // tooltipRef.current.style.bottom= 500 - 50 + "px";
      }}
      className="group inline-block"
    >
      {children}
      {tooltip && (
  <span ref={tooltipRef} className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition text-white p-1 rounded absolute  z-999999999999 top-full mt-2 whitespace-nowrap">
    {tooltip.map(({id, component}) => (
      <React.Fragment key={id}>
        {component}
        </React.Fragment>
    ))}
  </span>
)}
    </div>
  );
};
