import React, { useState, useEffect } from 'react';
import { getTasks } from '../api/authAPI'; // Import API function

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data); // Store tasks in state
      } catch (error) {
        setError('Error fetching tasks. Please try again later.');
      } finally {
        setIsLoading(false); // Set loading to false after data fetch
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Task List</h2>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition duration-200">
              <span className="text-lg font-medium text-gray-700">{task.title}</span>
              {/* Task completion button or details link */}
              <button
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
                onClick={() => alert(`Task ID: ${task.id}`)} // Placeholder for task action
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
