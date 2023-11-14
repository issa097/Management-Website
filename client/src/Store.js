
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../src/redux/Taskslice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

