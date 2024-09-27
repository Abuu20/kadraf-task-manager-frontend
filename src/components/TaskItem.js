// src/components/TaskItem.js
import React, { useState, useEffect } from 'react';

const TaskItem = ({ task }) => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const taskStatus = timeLeft.message ? 'bg-danger text-white' : 'bg-success text-white';

  return (
    <div className={`card my-3 ${taskStatus}`}>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <strong>Time Remaining:</strong> {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </p>
        {timeLeft.message && <p className="text-white">{timeLeft.message}</p>}
      </div>
    </div>
  );
};

export default TaskItem;
