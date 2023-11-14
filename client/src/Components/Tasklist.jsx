import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/Taskslice';
import TaskItem from './Taskitem';
import TaskFilter from './Tasklistfillter';
import { tasksApi } from '../Api';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await tasksApi.getAllTasks();
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <TaskFilter />
      {tasks.map((task) => (
        
        <TaskItem key={task._id} task={task} />
        
      ))}

    </div>
    
  );

};

export default TaskList;
