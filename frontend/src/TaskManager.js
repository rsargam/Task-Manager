import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';

function TaskManager() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  // ✅ Handle create/update button click
  const handleTask = () => {
    if (updateTask && input) {
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      handleUpdateItem(obj);
    } else if (updateTask === null && input) {
      handleAddTask();
    }
    setInput('');
  };

  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
      notify("You can now edit and update this task", "info");
    }
  }, [updateTask]);

  // ✅ Create task
  const handleAddTask = async () => {
    const obj = { taskName: input, isDone: false };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) notify(message || "Task created successfully!", "success");
      else notify(message || "Failed to create task", "error");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to connect to server", "error");
    }
  };

  // ✅ Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const response = await GetAllTasks();
      console.log("API Response:", response);

      let taskData = [];
      if (Array.isArray(response)) taskData = response;
      else if (Array.isArray(response.data)) taskData = response.data;
      else if (Array.isArray(response.data?.tasks)) taskData = response.data.tasks;
      else if (Array.isArray(response.tasks)) taskData = response.tasks;

      setTasks(taskData);
      setCopyTasks(taskData);
    } catch (err) {
      console.error(err);
      notify("Failed to fetch tasks", "error");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // ✅ Delete task
  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) notify(message || "Task deleted successfully!", "success");
      else notify(message || "Failed to delete task", "error");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to connect to server", "error");
    }
  };

  // ✅ Toggle task complete
  const handleCheckAndUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = { taskName, isDone: !isDone };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success)
        notify(
          !isDone
            ? "Task marked as completed!"
            : "Task marked as pending again!",
          "success"
        );
      else notify(message || "Failed to update task", "error");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to connect to server", "error");
    }
  };

  // ✅ Update existing task
  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = { taskName, isDone };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) notify(message || "Task updated successfully!", "success");
      else notify(message || "Failed to update task", "error");
      fetchAllTasks();
      setUpdateTask(null);
    } catch (err) {
      console.error(err);
      notify("Failed to connect to server", "error");
    }
  };

  // ✅ Search filter
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const results = copyTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>

      {/* Input + Search */}
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control me-1"
            placeholder={
              updateTask ? "Update selected task" : "Add a new Task"
            }
          />
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
            <FaPlus className="m-2" />
          </button>
        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            className="form-control"
            type="text"
            placeholder="Search tasks"
          />
        </div>
      </div>

      {/* Task list */}
      <div className="d-flex flex-column w-100">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((item) => (
            <div
              key={item._id}
              className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
            >
              <span
                className={item.isDone ? "text-decoration-line-through" : ""}
              >
                {item.taskName}
              </span>

              <div>
                <button
                  onClick={() => handleCheckAndUncheck(item)}
                  className="btn btn-success btn-sm me-2"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => setUpdateTask(item)}
                  className="btn btn-primary btn-sm me-2"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDeleteTask(item._id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No tasks found</p>
        )}
      </div>

      {/* ✅ Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default TaskManager;
