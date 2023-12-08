import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('');

  const addTask = () => {
    if (!taskInput || !deadlineInput) return;
    const newTask = {
      name: taskInput,
      deadline: new Date(deadlineInput),
      state: 'pending',
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDeadlineInput('');
  };

  const toggleTaskState = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].state =
      updatedTasks[index].state === 'completed' ? 'pending' : 'completed';
    setTasks(updatedTasks);
  };
  const calculateTaskStyle = (deadline, state) => {
    const currentDate = new Date();

    if (deadline < currentDate && state !== 'completed') {
      return 'late';
    } else if (state === 'completed') {
      return 'completed';
    } else {
      return 'pending';
    }
  };

  return (
    <div className="App">
      <h3>Task Management App</h3>
      <div>
        <input
          type="text"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="datetime-local"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={calculateTaskStyle(task.deadline, task.state)}
            onClick={() => toggleTaskState(index)}
          >
            {task.name} - Deadline: {task.deadline.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


