import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ActivityLog = () => {
  const { backendUrl } = useContext(AppContext);
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/logs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error("Error fetching activity logs:", err);
      }
    };

    fetchLogs();
  }, [backendUrl, token]);

  return (
    <div className="activity-log">
      <h3>Activity Log</h3>
      {logs.length === 0 ? (
        <p className="empty">No activity yet</p>
      ) : (
        logs.map((log, idx) => (
          <p key={idx}>
            {log.user?.name || "Someone"} {log.action}
          </p>
        ))
      )}
    </div>
  );
};

export default ActivityLog;
