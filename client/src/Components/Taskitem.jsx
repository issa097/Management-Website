import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { completeTask, deleteTask, updateTask } from "../redux/Taskslice";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );
  const [updatedDueDate, setUpdatedDueDate] = useState(task.createdAt);
  const [updatedPriority, setUpdatedPriority] = useState(task.priority);

  const handleComplete = async () => {
    try {
      const result = await Swal.fire({
        title: "Complete Task?",
        text: "Are you sure you want to mark this task as completed?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, complete it!",
      });

      if (result.isConfirmed) {
        await axios.put(`http://localhost:4000/task/complete/${task._id}`);
        dispatch(completeTask(task._id));
        Swal.fire(
          "Completed!",
          "The task has been marked as completed.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error completing task:", error);
      Swal.fire(
        "Error",
        "An error occurred while completing the task.",
        "error"
      );
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(`http://localhost:4000/task/update/${task._id}`, {
        title: updatedTitle,
        description: updatedDescription,
        createdAt: updatedDueDate,
        priority: updatedPriority,
      });

      dispatch(
        updateTask({
          id: task._id,
          title: updatedTitle,
          description: updatedDescription,
          createdAt: updatedDueDate,
          Priority: updatedPriority,
        })
      );

      setIsModalOpen(false);

      Swal.fire("Updated!", "The task has been updated.", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire("Error", "An error occurred while updating the task.", "error");
    }
  };

  return (
    <>
      <motion.div
        whileHover="hover"
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        variants={{
          hover: {
            scale: 1.05,
          },
        }}
        className="relative overflow-hidden rounded-xl bg-indigo-500 p-8 w-80 text-white m-4"
      >
        <span className="mb-2 block text-sm font-light">
          {task.completed ? "Pro" : "Pending"}
        </span>
        <h1 className="my-2 block text-2xl font-bold leading-[1.2]">
          {task.description}
        </h1>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleComplete}
            className="flex-1 rounded border-2 border-white bg-white py-2 text-center font-mono uppercase text-indigo-800 transition-colors hover:bg-white/30 hover:text-white"
          >
            {task.completed ? "Completed" : "Complete"}
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 rounded border-2 border-white bg-white py-2 text-center font-mono uppercase text-indigo-800 transition-colors hover:bg-white/30 hover:text-white"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 rounded border-2 border-white bg-white py-2 text-center font-mono uppercase text-indigo-800 transition-colors hover:bg-white/30 hover:text-white"
          >
            Delete
          </button>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Update Task Modal"
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#3F51B5",
            padding: "20px",
            maxWidth: "400px",
            width: "100%",
            zIndex: 1000,
          },
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          },
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Update Task
        </h2>
        <label>Title:</label>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <label>Description:</label>
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <label>Due Date:</label>
        <input
          type="date"
          value={updatedDueDate}
          onChange={(e) => setUpdatedDueDate(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <label>Priority:</label>
        <select
          value={updatedPriority}
          onChange={(e) => setUpdatedPriority(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={handleUpdateTask}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "0.5rem",
            hover: { backgroundColor: "#2980b9" },
          }}
        >
          Update Task
        </button>
        <button
          onClick={handleCloseModal}
          style={{
            backgroundColor: "#95a5a6",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            hover: { backgroundColor: "#7f8c8d" },
          }}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default TaskItem;
