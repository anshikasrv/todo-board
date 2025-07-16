import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskCardSortable = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id, //  This matches MongoDB's field
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="task-card"
      style={style}
    >
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>
    </div>
  );
};
