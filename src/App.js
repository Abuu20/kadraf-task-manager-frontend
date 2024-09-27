// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import axiosInstance from './api/axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axiosInstance.post('/', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axiosInstance.put(`/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Kadraf Task Manager</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Task</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Switch>
            <Route exact path="/">
              <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
            </Route>
            <Route path="/add">
              <AddTaskForm addTask={addTask} />
            </Route>
            {/* Add more routes as needed */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
