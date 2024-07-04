import React, { useState, useEffect } from "react";
import Task from "./Task";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      setTasks(tasks);
    }
    fetchTasks();
  }, []);

  const completeTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}/complete`, {
      method: "PATCH",
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: true } : task
      )
    );
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
