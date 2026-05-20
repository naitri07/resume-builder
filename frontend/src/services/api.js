// Production (Render)
const API_BASE = 'https://resume-builder-7hj9.onrender.com/api';

export const resumeAPI = {
  saveResume: async (formData, userId = 'user123') => {
    try {
      const response = await fetch(`${API_BASE}/resume/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...formData })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Save resume error:', error);
      throw error;
    }
  },

  getResume: async (userId = 'user123') => {
    try {
      const response = await fetch(`${API_BASE}/resume/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get resume error:', error);
      throw error;
    }
  }
};