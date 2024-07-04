import { useContext } from "react";
import AuthContext from "./auth";

export default function NewTask({ updateTasks }) {
  const userId = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const title = event.target.elements.title.value;
    if (title.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      updateTasks();
      event.target.elements.title.value = "";
    } catch (error) {
      console.error("Error adding task:", error);
      alert("There was an error adding the task.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Add a new task"
      />
      <button className="add-task" type="submit">
        +
      </button>
    </form>
  );
}
