// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div>
      <h2>Assigned Tasks</h2>
      <div className="row">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="col-md-6">
              <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
