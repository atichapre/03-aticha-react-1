import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";

export const UserHome = () => {
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        "Request Failed",
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
    <>
      <Home />

      {isLoading && <h1 className="text-blue-600">Loading ....</h1>}
      {!isLoading && isError && (
        <h1 className="text-red-600">Request failed</h1>
      )}

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
