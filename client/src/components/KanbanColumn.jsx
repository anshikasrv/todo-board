import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCardSortable } from "./TaskCardSortable";

const KanbanColumn = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="kanban-column">
      <h3>{status}</h3>
      <SortableContext
        items={tasks.map((t) => t._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCardSortable key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
