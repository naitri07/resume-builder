const API_BASE = 'http://localhost:5000/api';

export const resumeAPI = {
  saveResume: async (formData, userId = 'user123') => {
    try {
      const response = await fetch(`${API_BASE}/resume/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...formData })
      });
      return response.json();
    } catch (error) {
      console.warn("Backend not connected. Running in frontend-only mode.");
      return { success: true, message: "Saved locally (Backend offline)" };
    }
  },

  getResume: async (userId = 'user123') => {
    try {
      const response = await fetch(`${API_BASE}/resume/${userId}`);
      return response.json();
    } catch (error) {
      console.warn("Backend not connected.");
      return { success: true, data: {} };
    }
  }
};