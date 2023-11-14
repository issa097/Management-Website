

import { createSlice } from '@reduxjs/toolkit';
import { tasksApi } from '../Api';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: '',
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    completeTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.completed = true;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },
    updateTask: (state, action) => {
        const taskId = action.payload;
        state.tasks = state.tasks.filter((task) => task._id !== taskId);
      },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, completeTask, deleteTask, setFilter, setTasks, updateTask } = tasksSlice.actions;

export const selectTasks = (state) => {
  const { tasks, filter } = state.tasks;

  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  } else if (filter === 'pending') {
    return tasks.filter((task) => !task.completed);
  }
  return tasks;
};

  

export default tasksSlice.reducer;
