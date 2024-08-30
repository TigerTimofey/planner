import React from "react";
import { Task, Week } from "../../utils/interfaces";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DoneIcon from "@mui/icons-material/Done";

interface TaskRowProps {
  task: Task;
  index: number;
  isEditing: number | null;
  editedTask: Task | null;
  weeks: Week[];
  handleChange: (field: keyof Task, value: string) => void;
  handleEditClick: (index: number) => void;
  handleSaveClick: (index: number) => void;
  isTaskInWeek: (week: Week, task: Task) => boolean;
  handleMouseEnter: (e: React.MouseEvent<HTMLElement>, task: Task) => void;
  handleMouseLeave: () => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  index,
  isEditing,
  editedTask,
  weeks,
  handleChange,
  handleEditClick,
  handleSaveClick,
  isTaskInWeek,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <tr>
      <td style={{ padding: "0.5rem" }}>
        {isEditing === index ? (
          <TextField
            fullWidth
            value={editedTask?.name || ""}
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
            value={
              editedTask
                ? editedTask.startDate.slice(0, 10)
                : task.startDate.slice(0, 10)
            }
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        ) : (
          task.startDate
        )}
      </td>
      <td style={{ padding: "0.5rem" }}>
        {isEditing === index ? (
          <TextField
            type="date"
            fullWidth
            value={
              editedTask
                ? editedTask.endDate.slice(0, 10)
                : task.endDate.slice(0, 10)
            }
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        ) : (
          task.endDate
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
  );
};

export default TaskRow;
