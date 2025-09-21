import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { tokens, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {tokens ? (
        <>
          <p className="mb-4">✅ You are logged in with YouTube OAuth.</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-red-600">⚠️ Not authenticated</p>
      )}
    </div>
  );
};

export default Dashboard;
