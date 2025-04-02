import React, { useState, useEffect } from "react";
import Table from "../components/TableAdmin.jsx";
import { useNavigate } from "react-router-dom";

export const UserAdmin = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("members_data"));
      if (data && Array.isArray(data)) {
        setMembers(data);
      }
    } catch (error) {
      console.error("Failed to parse members data from localStorage:", error);
    }
  }, []);

  const handleEdit = (id) => {
    const member = members.find((member) => member.id === id);
    if (member) {
      setSelectedMember(member);
      setIsEditing(true);
    } else {
      console.error(`Member with ID ${id} not found`);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? You won't be able to revert this!"
    );

    if (confirmDelete) {
      const member = members.find((member) => member.id === id);
      if (member) {
        // Show success alert
        window.alert(
          `${member.firstName} ${member.lastName}'s data has been deleted.`
        );

        // Remove the member from the list
        const membersCopy = members.filter((member) => member.id !== id);

        // Update local storage and state
        localStorage.setItem("members_data", JSON.stringify(membersCopy));
        setMembers(membersCopy);
      } else {
        console.error(`Member with ID ${id} not found`);
      }
    }
  };

  const handleNavigateUserHome = () => {
    navigate("/user");
  };

  const handleNavigateAdminHome = () => {
    navigate("/admin");
  };

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

      {isLoading && <h1>Loading...</h1>}
      {isError && !isLoading && (
        <h1 className="text-red-600">
          An error occurred. Please try again later.
        </h1>
      )}
      {!isLoading && !isError && (
        <div className="container">
          {!isAdding && !isEditing && (
            <Table
              members={members}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
          {isAdding && (
            <Add
              members={members}
              setMembers={setMembers}
              setIsAdding={setIsAdding}
            />
          )}
          {isEditing && (
            <Edit
              members={members}
              selectedMember={selectedMember}
              setMembers={setMembers}
              setIsEditing={setIsEditing}
            />
          )}
        </div>
      )}
    </div>
  );
};
