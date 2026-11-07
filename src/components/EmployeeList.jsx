import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

function EmployeeList() {
  const [employees, setEmployees] = useState([
    {
      name: "Aritri Basu",
      employeeId: "EMP001",
      department: "Marketing",
      gender: "Female",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Kolkata"
    },
    {
      name: "Rahul Sharma",
      employeeId: "EMP002",
      department: "IT",
      gender: "Male",
      phone: "9876543211",
      localAddress: "Gurgaon",
      permanentAddress: "Delhi"
    },
    {
      name: "Priya Das",
      employeeId: "EMP003",
      department: "HR",
      gender: "Female",
      phone: "9876543212",
      localAddress: "Kolkata",
      permanentAddress: "Durgapur"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleSave = (employee) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((item) =>
          item.employeeId === employee.employeeId ? employee : item
        )
      );
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, employee]);
    }
  };

  const handleDelete = (employeeId) => {
    setEmployees(
      employees.filter((employee) => employee.employeeId !== employeeId)
    );
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <section>
      <EmployeeForm
        onSave={handleSave}
        editingEmployee={editingEmployee}
        onCancel={() => setEditingEmployee(null)}
      />

      <h2>Employee Directory</h2>

      <p className="employee-count">
        Total Employees: {employees.length}
      </p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Employee by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <div className="employee-list">
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.employeeId}
            employee={employee}
            onEdit={setEditingEmployee}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default EmployeeList;