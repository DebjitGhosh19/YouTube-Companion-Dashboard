import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href =
      "https://youtube-companion-dashboard-8gg0.onrender.com/auth";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">YouTube Companion Dashboard</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
