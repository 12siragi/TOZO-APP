import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ChangePasswordPage from './pages/ChangePasswordPage'; 
import NotFoundPage from './pages/NotFoundPage'; 
import TaskList from './components/TaskList'; 
import TaskDetail from './components/TaskDetail'; 
import CreateTask from './components/CreateTask';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar outside of Routes so it shows on every page */}
        <Navbar />
        <Routes>
          {/* Define your routes here */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="password-reset" element={<PasswordResetPage />} />
          <Route path="Change-password" element={<ChangePasswordPage />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/:id" element={<TaskDetail />} />
          <Route path="create-task" element={<CreateTask />} /> 

        
          <Route path="/" element={<Navigate to="login" />} />
         
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
