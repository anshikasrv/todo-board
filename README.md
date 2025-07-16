#  Kanban To-Do Board

A real-time collaborative Kanban board built with React, Node.js, Express, and Socket.IO. Features secure user authentication, drag-and-drop task management, live activity logging, and modular architecture — optimized for team collaboration and personal productivity.

---

##  Features

-  **User Login/Logout** with JWT-based authentication
-  **Task Creation & Status Update** per user
-  **Drag-and-Drop Functionality** across Kanban columns
-  **Real-Time Sync** using Socket.IO
-  **Activity Log** of task interactions
-  **Navbar** for login/logout and smooth navigation

---


---

## ⚙ Tech Stack

- **Frontend**: React, Context API, Axios, HTML/CSS
- **Backend**: Node.js, Express.js, MongoDB, Socket.IO
- **Auth**: JWT token-based authentication
- **Database**: MongoDB with Mongoose

---

##  Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/kanban-board.git
   cd To-Do-Board
   cd client && npm install
   cd ../server && npm install
# server/.env
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key

# client/.env
REACT_APP_BACKEND_URL=http://localhost:5000

cd server && npm run dev  # starts backend
cd client && npm start    # starts frontend



