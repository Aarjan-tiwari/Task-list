// src/App.js
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { fetchTasks } from "./api";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.Items || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Task Manager
        </Typography>
        <AddTaskForm refreshTasks={refreshTasks} />
        <TaskList tasks={tasks} refreshTasks={refreshTasks} />
      </Container>
    </ThemeProvider>
  );
}

// src/components/AddTaskForm.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createTasks } from "../api";

export const AddTaskForm = ({ refreshTasks }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    try {
      await createTasks({ name: taskName, completed: false });
      setTaskName("");
      refreshTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ margin: "20px 0" }}>
      <TextField
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        label="New Task"
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Add Task
      </Button>
    </Box>
  );
};

// src/components/TaskList.js
import React from "react";
import { List } from "@mui/material";
import { Task } from "./Task";

export const TaskList = ({ tasks, refreshTasks }) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task key={task.id} task={task} refreshTasks={refreshTasks} />
      ))}
    </List>
  );
};

// src/components/Task.js
import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateTasks, deleteTasks } from "../api";

export const Task = ({ task, refreshTasks }) => {
  const handleToggle = async () => {
    try {
      await updateTasks({
        id: task.id,
        name: task.name,
        completed: !task.completed,
      });
      refreshTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTasks(task.id);
      refreshTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={task.completed}
        onChange={handleToggle}
        inputProps={{ "aria-labelledby": task.id }}
      />
      <ListItemText
        id={task.id}
        primary={task.name}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      />
    </ListItem>
  );
};
