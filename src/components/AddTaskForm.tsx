import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";

interface Task {
  name: string;
  startDate: string;
  endDate: string;
}

interface AddTaskFormProps {
  addTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear}-12-31`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ name, startDate, endDate });
    setName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
        boxShadow: 2,
        width: "100%",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <TextField
        label="Task"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Grid2 container spacing={2}>
        <TextField
          type="date"
          label="Start Date"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          fullWidth
          InputProps={{
            inputProps: { min: minDate, max: maxDate },
          }}
        />
      </Grid2>

      <TextField
        type="date"
        label="End Date"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        fullWidth
        InputProps={{
          inputProps: { min: minDate, max: maxDate },
        }}
      />

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Task
      </Button>
    </Box>
  );
};

export default AddTaskForm;
