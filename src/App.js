import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const Home = ({ task, setTask, handleAddTask, showModal }) => (
  <div className="container">
    <header>
      <h1>Hello Folk!!</h1>
      <p>What we do daily, the habits we form, determine our future</p>
    </header>
    <div className="task-input">
      <h2>Add Your Tasks</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
      />
    </div>
    <div className="buttons">
      <button className="add-btn" onClick={handleAddTask}>Add</button>
      <Link to="/view-tasks">
        <button className="view-btn">View Your Tasks</button>
      </Link>
      <Link to="/show-completed-tasks">
        <button className="show-completed-btn">Show Completed Tasks</button>
      </Link>
    </div>

    {/* Modal Pop-up */}
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <h3>Task Successfully Added!</h3>
        </div>
      </div>
    )}
  </div>
);

const TaskList = ({ tasks, handleTaskClick, handleCheckboxChange }) => (
  <div className="container">
    <header>
      <h1>Your Tasks</h1>
    </header>
    <div className="task-list">
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(task)}
              />
              {task}
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
    <Link to="/">
      <button className="view-btn">Back to Home</button>
    </Link>
  </div>
);

const CompletedTasks = ({ completedTasks }) => (
  <div className="container">
    <header>
      <h1>Completed Tasks</h1>
    </header>
    <div className="task-list">
      <ul>
        {completedTasks.length > 0 ? (
          completedTasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))
        ) : (
          <p>No completed tasks.</p>
        )}
      </ul>
    </div>
    <Link to="/">
      <button className="view-btn">Back to Home</button>
    </Link>
  </div>
);

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = () => {
    if (task.trim()) {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save tasks to localStorage
      setTask('');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // Hide modal after 2 seconds
    }
  };

  const handleCheckboxChange = (taskToMove) => {
    // Remove task from tasks list
    const updatedTasks = tasks.filter((t) => t !== taskToMove);
    // Add task to completed tasks list
    const updatedCompletedTasks = [...completedTasks, taskToMove];
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home task={task} setTask={setTask} handleAddTask={handleAddTask} showModal={showModal} />}
        />
        <Route
          path="/view-tasks"
          element={<TaskList tasks={tasks} handleCheckboxChange={handleCheckboxChange} />}
        />
        <Route
          path="/show-completed-tasks"
          element={<CompletedTasks completedTasks={completedTasks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
