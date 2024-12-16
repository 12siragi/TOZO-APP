import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskDetail, markTaskComplete } from '../api/authAPI'; // Import API functions

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetail = async () => {
      if (id) {
        try {
          const response = await getTaskDetail(parseInt(id)); // Fetch task details by ID
          setTask(response.data);
        } catch (error) {
          setError('Error fetching task details. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTaskDetail();
  }, [id]);

  const handleMarkComplete = async () => {
    if (id) {
      try {
        await markTaskComplete(parseInt(id)); // Mark task as complete via API
        navigate('/tasks'); // Redirect to tasks list after completion
      } catch (error) {
        setError('Error marking task as complete. Please try again.');
      }
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading task details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return task ? (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">{task.title}</h2>
      <p className="text-lg text-gray-700 mb-6">{task.description}</p>
      
      {/* Mark as complete button */}
      <button
        onClick={handleMarkComplete}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Mark as Complete
      </button>

      {/* Additional task information can go here */}
      <div className="mt-6 text-sm text-gray-500">
        <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
        <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500">Task not found.</div>
  );
};

export default TaskDetail;
