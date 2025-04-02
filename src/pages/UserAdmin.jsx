import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";

export const UserAdmin = () => {
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    lastname: "",
    position: "",
  });

  const getMembers = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(
        "https://jsd5-mock-backend.onrender.com/members"
      );
      setMembers(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`https://jsd5-mock-backend.onrender.com/member/${id}`);
      setMembers(members.filter((member) => member.id !== id));
      alert("Member deleted successfully.");
    } catch (error) {
      console.error(error);
      setIsError(true);
      alert("Failed to delete member.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.lastname || !newMember.position) {
      alert("Please complete all fields.");
      return;
    }
    try {
      const response = await axios.post(
        "https://jsd5-mock-backend.onrender.com/members",
        newMember
      );
      setMembers([...members, response.data]);
      setNewMember({ name: "", lastname: "", position: "" });
    } catch (error) {
      console.error(error);
      setIsError(true);
      alert("Failed to delete member.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <Home />
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Create User Here</h2>
        <div className="grid grid-cols-6 gap-2">
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
            value={newMember.lastname}
            onChange={(e) =>
              setNewMember({ ...newMember, lastname: e.target.value })
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
          Save
        </button>
        <button
          onClick={getMembers}
          className="mt-2 px-4 mx-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Table
        </button>
      </div>

      {isLoading && <h1 className="text-center">Loading...</h1>}
      {isError && !isLoading && (
        <h1 className="text-center text-red-600">An error occurred.</h1>
      )}

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
                  <td className="px-4 py-2 border-b">{member.lastname}</td>
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
    </>
  );
};
