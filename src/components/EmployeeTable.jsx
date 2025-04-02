import React, { useState } from "react";
import { employeesData } from "../data/index"; // Assuming employeesData is in a file named `data.js`

const EmployeeTable = () => {
  // State to manage the employees
  const [employees, setEmployees] = useState(employeesData);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
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
      newEmployee.firstName &&
      newEmployee.lastName &&
      newEmployee.email &&
      newEmployee.salary &&
      newEmployee.date
    ) {
      const updatedEmployees = [...employees, newEmployee];
      localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
      setNewEmployee({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        salary: "",
        date: "",
      });
    }
  };

  return (
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
            placeholder="First Name"
            value={newEmployee.firstName}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
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
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, salary: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={newEmployee.date}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, date: e.target.value })
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
            <th className="px-4 py-2 border-b">First Name</th>
            <th className="px-4 py-2 border-b">Last Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Salary</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{employee.id}</td>
                <td className="px-4 py-2 border-b">{employee.firstName}</td>
                <td className="px-4 py-2 border-b">{employee.lastName}</td>
                <td className="px-4 py-2 border-b">{employee.email}</td>
                <td className="px-4 py-2 border-b">{employee.salary}</td>
                <td className="px-4 py-2 border-b">{employee.date}</td>
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
  );
};

export default EmployeeTable;
