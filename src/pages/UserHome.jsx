import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserHome = () => {
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleNavigateUserHome = () => {
    navigate("/user");
  };

  const handleNavigateAdminHome = () => {
    navigate("/admin");
  };

  const getMembers = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await axios.get(
        "https://jsd5-mock-backend.onrender.com/members"
      );
      setMembers(response.data);
    } catch (error) {
      console.error(
        "Request Failed:",
        error.response ? error.response.data : error.message
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">Generation Thailand</h1>
      <h2 className="text-4xl font-bold mb-10">Home - User</h2>
      <button
        onClick={handleNavigateUserHome}
        className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition"
      >
        User Home
      </button>
      <button
        onClick={handleNavigateAdminHome}
        className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition"
      >
        Admin Home
      </button>
      <br />
      <br />

      {isLoading && <h1>Loading ....</h1>}
      {!isLoading && isError && <h1>Request failed</h1>}

      {!isLoading && !isError && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Position</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{member.id}</td>
                  <td className="px-4 py-2 border-b">{member.name}</td>
                  <td className="px-4 py-2 border-b">{member.lastname}</td>
                  <td className="px-4 py-2 border-b">{member.position}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
