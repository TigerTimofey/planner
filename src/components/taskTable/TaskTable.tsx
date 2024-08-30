import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import TableHeader from "./TableHeader";
import TaskRow from "./TaskRow";
import TaskPopover from "./TaskPopover";
import { Task, Week, TaskTableProps } from "../../utils/interfaces";
import { isWithinInterval, startOfWeek, endOfWeek } from "date-fns";

export {};

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
            <TableHeader weeks={weeks} />
            <tbody>
              {tasks.map((task, index) => (
                <TaskRow
                  key={index}
                  task={task}
                  index={index}
                  isEditing={isEditing}
                  editedTask={editedTask}
                  weeks={weeks}
                  handleChange={handleChange}
                  handleEditClick={handleEditClick}
                  handleSaveClick={handleSaveClick}
                  isTaskInWeek={isTaskInWeek}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Grid>
      <TaskPopover
        anchorEl={anchorEl}
        hoveredTask={hoveredTask}
        handlePopoverClose={handlePopoverClose}
      />
    </Grid>
  );
};

export default TaskTable;
