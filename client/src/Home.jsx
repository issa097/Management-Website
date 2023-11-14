
import React from 'react';
import TaskList from './Components/Tasklist';
import TaskForm from './Components/Taskform';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';


const HomePage = () => {
  return (
    <div>
        <Navbar />
      <TaskList />
      <TaskForm />
      <Footer />
    </div>
  );
};

export default HomePage;
