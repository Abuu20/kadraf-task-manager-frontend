// src/components/AddTaskForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      assignedTo,
      email,
      deadline,
    };
    await addTask(newTask);
    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignedTo('');
    setEmail('');
    history.push('/'); // Redirect to Dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Form Fields as before */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Assigned To Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="datetime-local"
          className="form-control"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
