// Example: src/api/tasks.js

import { API_BASE_URL } from '../config';

// Fetch All Tasks
export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create New Task
export const createTask = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update Task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete Task
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
