import { useState } from 'react';
import InputField from '../UI/InputField';

export default function Projects({ data, onChange }) {
  const [newProject, setNewProject] = useState({ name: '', description: '', link: '' });

  const addProject = () => {
    if (newProject.name) {
      onChange([...data, newProject]);
      setNewProject({ name: '', description: '', link: '' });
    }
  };

  const removeProject = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="bg-white p-8 rounded-2xl shadow border">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>

      {data.map((proj, i) => (
        <div key={i} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between">
            <h3>{proj.name}</h3>
            <button onClick={() => removeProject(i)} className="text-red-500">Remove</button>
          </div>
          <p className="text-gray-600 mt-1">{proj.description}</p>
          {proj.link && <a href={proj.link} className="text-blue-600 text-sm">View Project</a>}
        </div>
      ))}

      <div className="space-y-4">
        <InputField label="Project Name" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} />
        <InputField label="Link (optional)" value={newProject.link} onChange={(e) => setNewProject({...newProject, link: e.target.value})} />
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            rows={3}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
      </div>

      <button onClick={addProject} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
        Add Project
      </button>
    </div>
  );
}