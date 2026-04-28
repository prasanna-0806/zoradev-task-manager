import React, { useState, useEffect } from 'react';
import './App.css';

// API base URL - uses environment variable in production, localhost in dev
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Could not load tasks. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const created = await response.json();
      setTasks((prev) => [...prev, created]);
      setNewTask('');
      setError('');
    } catch (err) {
      setError('Could not add task.');
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setError('');
    } catch (err) {
      setError('Could not delete task.');
      console.error(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updated = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setError('');
    } catch (err) {
      setError('Could not update task.');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
          <p className="subtitle">Add, track, and complete your tasks</p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="task-list">
          {loading ? (
            <p className="empty-message">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty-message">No tasks yet. Add one above!</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <span className="task-title">{task.title}</span>
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {tasks.length > 0 && (
          <footer className="footer">
            <span>{tasks.filter((t) => !t.completed).length} active</span>
            <span>{tasks.length} total</span>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
