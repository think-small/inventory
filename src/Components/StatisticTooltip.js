import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

const StatisticTooltip = ({ title, content, direction, children }) => {
  const popover = (
    <Popover>
      <Popover.Title>{title}</Popover.Title>
      <Popover.Content>{content}</Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={direction}
      overlay={popover}
    >
      {children}
    </OverlayTrigger>
  );
};

export default StatisticTooltip;
