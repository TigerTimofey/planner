import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DoneIcon from "@mui/icons-material/Done";
import { format, isWithinInterval, startOfWeek, endOfWeek } from "date-fns";
import { Task, Week, TaskTableProps } from "../utils/interfaces";

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  weeks,
  year,
  onUpdateTask,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [hoveredCell, setHoveredCell] = useState<HTMLElement | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  const isTaskInWeek = (week: Week, task: Task): boolean => {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);

    const weekStartDate = startOfWeek(
      new Date(year, 0, (week.weekNumber - 1) * 7 + 1),
      { weekStartsOn: 1 }
    );
    const weekEndDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });

    return (
      isWithinInterval(start, { start: weekStartDate, end: weekEndDate }) ||
      isWithinInterval(end, { start: weekStartDate, end: weekEndDate }) ||
      (start < weekStartDate && end > weekEndDate)
    );
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    task: Task
  ) => {
    setAnchorEl(event.currentTarget);
    setHoveredTask(task);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredTask(null);
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    task: Task
  ) => {
    if (event.currentTarget.style.backgroundColor === "lightblue") {
      setHoveredCell(event.currentTarget);
      handlePopoverOpen(event, task);
    }
  };

  const handleMouseLeave = () => {
    if (hoveredCell) {
      handlePopoverClose();
    }
  };

  const handleEditClick = (index: number) => {
    setIsEditing(index);
    setEditedTask(tasks[index]);
  };

  const handleSaveClick = (index: number) => {
    if (editedTask) {
      onUpdateTask(index, editedTask);
      setIsEditing(null);
      setEditedTask(null);
    }
  };

  const handleChange = (field: keyof Task, value: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, [field]: value });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th rowSpan={2}>Task Name</th>
                <th rowSpan={2}>Start Date</th>
                <th rowSpan={2}>End Date</th>
                {weeks.map((week, index, array) => {
                  if (index === 0 || week.month !== array[index - 1].month) {
                    const sameMonthWeeks = array.filter(
                      (w) => w.month === week.month
                    ).length;
                    return (
                      <th key={index} colSpan={sameMonthWeeks}>
                        {week.month}
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
              <tr>
                {weeks.map((week, index) => (
                  <th key={index}>{week.weekNumber}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td style={{ padding: "0.5rem" }}>
                    {isEditing === index ? (
                      <TextField
                        fullWidth
                        value={editedTask?.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    ) : (
                      task.name
                    )}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {isEditing === index ? (
                      <TextField
                        type="date"
                        fullWidth
                        value={format(
                          new Date(editedTask?.startDate || task.startDate),
                          "yyyy-MM-dd"
                        )}
                        onChange={(e) =>
                          handleChange("startDate", e.target.value)
                        }
                      />
                    ) : (
                      format(new Date(task.startDate), "dd.MM.yyyy")
                    )}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {isEditing === index ? (
                      <TextField
                        type="date"
                        fullWidth
                        value={format(
                          new Date(editedTask?.endDate || task.endDate),
                          "yyyy-MM-dd"
                        )}
                        onChange={(e) =>
                          handleChange("endDate", e.target.value)
                        }
                      />
                    ) : (
                      format(new Date(task.endDate), "dd.MM.yyyy")
                    )}
                  </td>
                  {weeks.map((week, idx) => (
                    <td
                      key={idx}
                      style={{
                        backgroundColor: isTaskInWeek(week, task)
                          ? "lightblue"
                          : "transparent",
                        padding: "0.5rem",
                        minWidth: "50px",
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, task)}
                      onMouseLeave={handleMouseLeave}
                    ></td>
                  ))}
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {isEditing === index ? (
                      <IconButton
                        aria-label="save"
                        color="success"
                        onClick={() => handleSaveClick(index)}
                      >
                        <DoneIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="change"
                        color="primary"
                        onClick={() => handleEditClick(index)}
                      >
                        <ChangeCircleIcon />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Grid>
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
              Start Date:{" "}
              {format(new Date(hoveredTask.startDate), "dd.MM.yyyy")}
            </Typography>
            <Typography>
              End Date: {format(new Date(hoveredTask.endDate), "dd.MM.yyyy")}
            </Typography>
          </div>
        )}
      </Popover>
    </Grid>
  );
};

export default TaskTable;
