import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
  const navigate = useNavigate();

  const handleNavigateUserHome = () => {
    navigate("/user");
  };
  const handleNavigateAdminHome = () => {
    navigate("/admin");
  };

  // State to manage the employees
  const [employees, setEmployees] = useState(employeesData);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    lastName: "",
    position: "",
  });

  // Function to delete an employee
  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  // Function to add a new employee
  const handleAddEmployee = () => {
    if (
      newEmployee.id &&
      newEmployee.name &&
      newEmployee.lastName &&
      newEmployee.position
    ) {
      const updatedEmployees = [...employees, newEmployee];
      localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
      setNewEmployee({
        id: "",
        name: "",
        lastName: "",
        position: "",
      });
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">Generation Thailand</h1>
      <h2 className="text-4xl font-bold mb-10">React - Assessment</h2>
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
      <div className="overflow-x-auto">
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Add New Employee</h2>
          <div className="grid grid-cols-6 gap-2">
            <input
              type="text"
              placeholder="ID"
              value={newEmployee.id}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, id: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newEmployee.lastName}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, lastName: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="position"
              placeholder="position"
              value={newEmployee.position}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleAddEmployee}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Employee
          </button>
        </div>

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
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{employee.id}</td>
                  <td className="px-4 py-2 border-b">{employee.name}</td>
                  <td className="px-4 py-2 border-b">{employee.lastName}</td>
                  <td className="px-4 py-2 border-b">{employee.position}</td>

                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
