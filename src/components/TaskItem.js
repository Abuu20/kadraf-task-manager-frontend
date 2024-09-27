// src/components/TaskItem.js
import React, { useState, useEffect } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const calculateTimeLeft = () => {
    const deadline = new Date(task.deadline);
    const now = new Date();
    const difference = deadline - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { message: 'Task overdue' };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    assignedTo: task.assignedTo,
    email: task.email,
    deadline: task.deadline,
    completed: task.completed,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const taskStatus = timeLeft.message ? 'bg-danger text-white' : 'bg-success text-white';

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    updateTask(task._id, editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  return (
    <div className={`card my-3 ${taskStatus}`}>
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              className="form-control mb-2"
              value={editedTask.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className="form-control mb-2"
              value={editedTask.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="assignedTo"
              className="form-control mb-2"
              value={editedTask.assignedTo}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={editedTask.email}
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              name="deadline"
              className="form-control mb-2"
              value={new Date(editedTask.deadline).toISOString().slice(0, 16)}
              onChange={handleChange}
            />
            <div className="form-group form-check mb-2">
              <input
                type="checkbox"
                name="completed"
                className="form-check-input"
                checked={editedTask.completed}
                onChange={(e) => setEditedTask({ ...editedTask, completed: e.target.checked })}
              />
              <label className="form-check-label">Completed</label>
            </div>
            <button className="btn btn-success btn-sm mr-2" onClick={handleUpdate}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
            <p className="card-text">
              <strong>Assigned To:</strong> {task.assignedTo} ({task.email})
            </p>
            <p className="card-text">
              <strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}
            </p>
            <p className="card-text">
              <strong>Time Remaining:</strong>{' '}
              {timeLeft.hours !== undefined
                ? `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
                : timeLeft.message}
            </p>
            {task.completed && <span className="badge badge-success">Completed</span>}
            <div className="mt-3">
              <button className="btn btn-warning btn-sm mr-2" onClick={handleEditToggle}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
