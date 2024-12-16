import axiosClient from './axiosClient';




// User Registration - Handles user registration
export const register = (userData: {
  email: string;
  password1: string;
  password2: string;
  username: string;
}) => axiosClient.post('/auth/register/', userData);

// User Login - Handles user login and token retrieval
export const login = (credentials: { email: string; password: string }) =>
  axiosClient.post('/auth/token/', credentials);

// Password Reset Request - Handles requesting a password reset email
export const requestPasswordReset = (email: string) =>
  axiosClient.post('/auth/password-reset/', { email });

// Password Reset Confirmation - Confirms the password reset using token
export const confirmPasswordReset = (token: string, email: string, newPassword: string) =>
  axiosClient.post('/auth/password-reset-confirm/', { token, email, newPassword });

// Password Change - Handles changing the password for the logged-in user
export const changePassword = (oldPassword: string, newPassword: string) =>
  axiosClient.post('/auth/password-change/', { old_password: oldPassword, new_password: newPassword });

// Email Verification - Verifies the email address using a token
export const verifyEmail = (token: string, email: string) =>
  axiosClient.post('/auth/verify-email/', { token, email });

// Fetch Current User - Fetches the current logged-in user's data
export const fetchCurrentUser = () => axiosClient.get('/auth/user/');

// Fetch all tasks
export const getTasks = async () => {
  return axiosClient.get('/tasks/');
};

// Create a new task
export const createTask = async (task: { title: string; description: string }) => {
  return axiosClient.post('/tasks/create/', task);
};

// Fetch task details
export const getTaskDetail = async (id: number) => {
  return axiosClient.get(`/tasks/${id}/`);
};

// Mark task as complete
export const markTaskComplete = async (id: number) => {
  return axiosClient.patch(`/tasks/${id}/complete/`);
};

