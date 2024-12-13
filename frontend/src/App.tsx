import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* Example of a redirect */}
        <Route path="/" element={<Navigate to="login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
