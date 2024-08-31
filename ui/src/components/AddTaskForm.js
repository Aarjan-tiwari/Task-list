import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    try {
      await axios.post(API_URL, {
        title: newTask, // Changed from 'name' to 'title' to match the expected API structure
        completed: false,
      });

      await fetchTasks();

      setNewTask("");
    } catch (err) {
      console.error("Error adding new task:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTask();
  };

  return (
    <div>
      <Typography align="center" variant="h1" paddingTop={3} paddingBottom={3}>
        My Task List
      </Typography>
      <form onSubmit={handleSubmit} className="addTaskForm">
        <TextField
          size="small"
          label="Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="submit" variant="outlined" disabled={!newTask.length}>
          <AddIcon />
        </Button>
      </form>
    </div>
  );
};
