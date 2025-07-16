import React from "react";
import KanbanBoard from "../components/KanbanBoard";
import ActivityLog from "../components/ActivityLog";

const Board = () => {
  return (
    <div className="board-page">
      <h2>Collaborative To-Do Board</h2>
      <KanbanBoard />
      <ActivityLog />
    </div>
  );
};

export default Board;
