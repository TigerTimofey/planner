import React, { useState } from "react";
import TaskTable from "./components/taskTable/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import { getCurrentQuarter, getWeeksInQuarter } from "./utils/dateUtils";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Task } from "./utils/interfaces";

const App: React.FC = () => {
  const today = new Date();
  const initialQuarter = getCurrentQuarter(today);

  const [currentQuarter, setCurrentQuarter] = useState(initialQuarter);
  const [tasks, setTasks] = useState<Task[]>([]);
  const year = today.getFullYear();

  const weeks = getWeeksInQuarter(currentQuarter, year);

  const addTask = (task: Task) => {
    if (tasks.length >= 10) {
      alert("Maximum amount of tasks is 10. Please upgrade your plan.");
      return;
    }
    setTasks([...tasks, task]);
  };

  const updateTask = (index: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const nextQuarter = () =>
    setCurrentQuarter(currentQuarter === 4 ? 1 : currentQuarter + 1);

  const prevQuarter = () =>
    setCurrentQuarter(currentQuarter === 1 ? 4 : currentQuarter - 1);

  return (
    <div className="App">
      <h1>
        Task Planner - Quarter {currentQuarter}, {year}
      </h1>

      <AddTaskForm addTask={addTask} />
      <div className="controls">
        <Box sx={{ "& button": { m: 1, my: 6 } }}>
          <Button variant="contained" size="medium" onClick={prevQuarter}>
            Previous Quarter
          </Button>
          <Button variant="contained" size="medium" onClick={nextQuarter}>
            Next Quarter
          </Button>
        </Box>
      </div>

      <div className="task-table">
        <TaskTable
          tasks={tasks}
          weeks={weeks}
          year={year}
          onUpdateTask={updateTask}
        />
      </div>
    </div>
  );
};

export default App;
