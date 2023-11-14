
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/Taskslice';
import '../Components/Fillter.css'

const TaskFilter = () => {
    const dispatch = useDispatch();
    const [filter, setLocalFilter] = useState('');
  
    const handleFilterChange = (e) => {
      const selectedFilter = e.target.value;
      setLocalFilter(selectedFilter);
      dispatch(setFilter(selectedFilter));
    };
  
    return (
      <div className="filter-container">
        <label>Filter by:</label>
        <select className="filter-dropdown" value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    );
  };
  
  export default TaskFilter;