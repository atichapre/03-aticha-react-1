import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateUserHome = () => {
    navigate("/user");
  };
  const handleNavigateAdminHome = () => {
    navigate("/admin");
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">Generation Thailand</h1>
      <h2 className="text-4xl font-bold mb-10">React - Assessment</h2>
      <button
        onClick={handleNavigateUserHome}
        className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition"
      >
        User Home Sector
      </button>
      <button
        onClick={handleNavigateAdminHome}
        className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition"
      >
        Admin Home Sector
      </button>
      <br />
      <br />
    </div>
  );
};

export default Home;
