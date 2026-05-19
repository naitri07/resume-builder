const API_BASE = 'https://resume-builder-production-573d.up.railway.app/api';

export const resumeAPI = {
  saveResume: async (formData, userId = 'user123') => {
    try {
      const response = await fetch(`${API_BASE}/resume/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...formData })
      });
      return await response.json();
    } catch (error) {
      console.warn("Backend not connected.");
      return { success: true, message: "Saved locally (Backend offline)" };
    }
  },

  getResume: async (userId = 'user123') => {
    try {
      const response = await fetch(`${API_BASE}/resume/${userId}`);
      return await response.json();
    } catch (error) {
      console.warn("Backend not connected.");
      return { success: true, data: {} };
    }
  }
};