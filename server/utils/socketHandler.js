export const setupSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log(" Socket connected:", socket.id);

    socket.on("task-updated", () => {
      socket.broadcast.emit("task-updated");
    });

    socket.on("disconnect", () => {
      console.log(" Socket disconnected:", socket.id);
    });
  });
};
