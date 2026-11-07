import { useState } from "react";

function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [formData, setFormData] = useState(
    editingEmployee || {
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: ""
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);

    if (!editingEmployee) {
      setFormData({
        name: "",
        employeeId: "",
        department: "",
        gender: "",
        phone: "",
        localAddress: "",
        permanentAddress: ""
      });
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
        required
        disabled={!!editingEmployee}
      />

      <input
        type="text"
        name="department"
        placeholder="Department Name"
        value={formData.department}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <textarea
        name="localAddress"
        placeholder="Local Address"
        value={formData.localAddress}
        onChange={handleChange}
        required
      />

      <textarea
        name="permanentAddress"
        placeholder="Permanent Address"
        value={formData.permanentAddress}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </button>

      {editingEmployee && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EmployeeForm;