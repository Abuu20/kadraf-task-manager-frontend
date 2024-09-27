// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h2>Kadraf Tasks</h2>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Notifications
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h1 className="my-4">Task Management System</h1>
          <AddTaskForm addTask={addTask} />
          <TaskList tasks={tasks} />
        </main>
      </div>
    </div>
  );
}

export default App;
