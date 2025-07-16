import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import AddTaskForm from "./AddTaskForm";
import KanbanColumn from "./KanbanColumn";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { io } from "socket.io-client";

const KanbanBoard = () => {
  const { backendUrl } = useContext(AppContext);
  const [columns, setColumns] = useState({
    Todo: [],
    "In Progress": [],
    Done: [],
  });

  const token = localStorage.getItem("token");
  const socket = io(backendUrl);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const grouped = { Todo: [], "In Progress": [], Done: [] };
      res.data.tasks.forEach((task) => {
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        }
      });

      setColumns(grouped);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [backendUrl, token]);

  useEffect(() => {
    socket.on("task-updated", () => {
      fetchTasks(); // refresh when another user updates
    });
    return () => socket.disconnect();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const draggedTaskId = active.id;
    const newStatus = over.id;

    const oldStatus = Object.keys(columns).find((key) =>
      columns[key].some((task) => task._id === draggedTaskId)
    );

    if (newStatus === oldStatus) return;

    try {
      await axios.put(
        `${backendUrl}/api/tasks/${draggedTaskId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = { ...columns };
      const draggedTask = updated[oldStatus].find(
        (t) => t._id === draggedTaskId
      );
      updated[oldStatus] = updated[oldStatus].filter(
        (t) => t._id !== draggedTaskId
      );
      updated[newStatus] = [
        { ...draggedTask, status: newStatus },
        ...updated[newStatus],
      ];
      setColumns(updated);

      socket.emit("task-updated", {
        taskId: draggedTaskId,
        status: newStatus,
      });
    } catch (err) {
      console.error("Drag update failed:", err);
    }
  };

  return (
    <div className="kanban-board">
      <AddTaskForm
        onTaskAdded={(newTask) => {
          setColumns((prev) => {
            const updated = { ...prev };
            if (updated[newTask.status]) {
              updated[newTask.status] = [newTask, ...updated[newTask.status]];
            }
            return updated;
          });
          socket.emit("task-updated", { taskId: newTask._id });
        }}
      />

      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        {Object.keys(columns).map((status) => (
          <KanbanColumn key={status} status={status} tasks={columns[status]} />
        ))}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
