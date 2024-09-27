// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Assigned Tasks</h2>
      <div className="row">
        {tasks.map(task => (
          <div key={task.id} className="col-md-6">
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
