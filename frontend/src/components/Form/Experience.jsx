import { useState } from 'react';
import InputField from '../UI/InputField';

export default function Experience({ data, onChange }) {
  const [newExp, setNewExp] = useState({
    jobTitle: '', company: '', startDate: '', endDate: '', description: ''
  });

  const addExperience = () => {
    if (newExp.jobTitle && newExp.company) {
      onChange([...data, newExp]);
      setNewExp({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' });
    }
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow border">
      <h2 className="text-2xl font-semibold mb-6">Experience</h2>

      {data.map((exp, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between">
            <h3 className="font-medium">{exp.jobTitle} at {exp.company}</h3>
            <button onClick={() => removeExperience(index)} className="text-red-500 text-sm">Remove</button>
          </div>
          <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
          <p className="text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
        </div>
      ))}

      <div className="space-y-4">
        <InputField label="Job Title" value={newExp.jobTitle} onChange={(e) => setNewExp({...newExp, jobTitle: e.target.value})} />
        <InputField label="Company" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Start Date" type="month" value={newExp.startDate} onChange={(e) => setNewExp({...newExp, startDate: e.target.value})} />
          <InputField label="End Date" type="month" value={newExp.endDate} onChange={(e) => setNewExp({...newExp, endDate: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (one bullet per line)</label>
          <textarea
            value={newExp.description}
            onChange={(e) => setNewExp({...newExp, description: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="• Developed responsive web applications..."
          />
        </div>
      </div>

      <button onClick={addExperience} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Add Experience
      </button>
    </div>
  );
}