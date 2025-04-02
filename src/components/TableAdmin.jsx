import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const TableAdmin = () => {
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    lastName: "",
    position: "",
  });

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://jsd5-mock-backend.onrender.com/members/${id}`
      );
      getMembers(); // Refresh the list after deletion
    } catch (error) {
      console.error(
        "Request Failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to add a new Member
  const handleAddMember = async () => {
    try {
      const response = await axios.post(
        "https://jsd5-mock-backend.onrender.com/members",
        newMember
      );
      setMembers([...members, response.data]);
      setNewMember({
        id: "",
        name: "",
        lastName: "",
        position: "",
      });
    } catch (error) {
      console.error(
        "Request Failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Add New Member</h2>
        <div className="grid grid-cols-6 gap-2">
          <input
            type="text"
            placeholder="ID"
            value={newMember.id}
            onChange={(e) => setNewMember({ ...newMember, id: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newMember.lastName}
            onChange={(e) =>
              setNewMember({ ...newMember, lastName: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Position"
            value={newMember.position}
            onChange={(e) =>
              setNewMember({ ...newMember, position: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddMember}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Member
        </button>
      </div>
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
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{member.id}</td>
                    <td className="px-4 py-2 border-b">{member.name}</td>
                    <td className="px-4 py-2 border-b">{member.lastName}</td>
                    <td className="px-4 py-2 border-b">{member.position}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No Members Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
