import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./components/AddTaskForm";
import { UpdateTaskForm } from "./components/UpdateTaskForm";
import { Task } from "./components/Task"; // Correct case-sensitive import
import axios from "axios";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [task, setTask] = useState([]);
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </ThemeProvider>
  );
}
