import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Task } from "../../utils/interfaces";
import { format } from "date-fns";

interface TaskPopoverProps {
  anchorEl: HTMLElement | null;
  hoveredTask: Task | null;
  handlePopoverClose: () => void;
}

const TaskPopover: React.FC<TaskPopoverProps> = ({
  anchorEl,
  hoveredTask,
  handlePopoverClose,
}) => {
  return (
    <Popover
      id="mouse-over-popover"
      sx={{ pointerEvents: "none" }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      {hoveredTask && (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Typography variant="h6">{hoveredTask.name}</Typography>
          <Typography>
            Start Date: {format(new Date(hoveredTask.startDate), "dd.MM.yyyy")}
          </Typography>
          <Typography>
            End Date: {format(new Date(hoveredTask.endDate), "dd.MM.yyyy")}
          </Typography>
        </div>
      )}
    </Popover>
  );
};

export default TaskPopover;
