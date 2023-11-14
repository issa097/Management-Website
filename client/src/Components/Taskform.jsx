import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Taskslice";
import { tasksApi } from "../Api";
import { FiPlus } from "react-icons/fi";
import Modal from "react-modal";
// import { calcLength } from "framer-motion";

Modal.setAppElement("#root");

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setDueDate] = useState("");
  const [Priority, setPriority] = useState("low");
  const [isModalOpen, setIsModalOpen] = useState(false);
const issa= localStorage.getItem("user_id")
// console.log(issa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      createdAt,
      Priority,
user_id:issa
     
    };
    
    console.log(newTask)

    try {
      const response = await tasksApi.addTask(newTask);
      dispatch(addTask(response.data));
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("low");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "4rem",
          right: "4rem",
          zIndex: 20,
          backgroundColor: "#3498db",
          color: "white",
          padding: "1rem",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
        onClick={toggleModal}
      >
        <FiPlus size={24} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Task"
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#3F51B5",
            padding: "2rem",
            maxWidth: "400px",
            width: "100%",
            zIndex: 1000,
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          },
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 999,
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Add Task</h2>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={createdAt}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Priority:
            <select
              value={Priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              hover: { backgroundColor: "#2980b9" },
            }}
          >
            Add Task
          </button>
        </form>
      </Modal>
    </>
  );
};

export default TaskForm;
