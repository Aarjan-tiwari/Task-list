import React, { useState } from "react";
import { Checkbox, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import classNames from "classnames";
import { UpdateTaskForm } from "./UpdateTaskForm";
import axios from "axios";
import { API_URL } from "../utils";

export const Task = ({ task, fetchTasks }) => {
  const { id, title, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        title,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
      await fetchTasks();
    } catch (err) {
      console.error("Error updating task completion:", err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="task">
      <div
        className={classNames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4">{title}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="outlined" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  );
};
