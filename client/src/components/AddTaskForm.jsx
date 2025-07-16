import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const AddTaskForm = ({ onTaskAdded }) => {
  const { backendUrl } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      console.warn(" Task title is empty");
      return;
    }

    if (!token) {
      console.error(" No auth token found. User might not be logged in.");
      return;
    }

    try {
      setLoading(true);
      console.log(" Sending task:", { title, status });

      const res = await axios.post(
        `${backendUrl}/api/tasks`,
        { title, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(" Task created:", res.data.task);
      setTitle("");
      setStatus("Todo");
      setLoading(false);

      if (onTaskAdded && res.data.task) {
        onTaskAdded(res.data.task);
      }
    } catch (err) {
      console.error(
        " Task creation failed:",
        err.response?.data || err.message
      );
      setLoading(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h4>Add New Task</h4>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default AddTaskForm;
