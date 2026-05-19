import { useState } from 'react';

export default function Skills({ data, onChange }) {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim()) {
      onChange([...data, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow border">
      <h2 className="text-2xl font-semibold mb-6">Skills</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add a skill (e.g. React, Python)"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
        />
        <button onClick={addSkill} className="bg-blue-600 text-white px-6 rounded-lg">Add</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <div key={index} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full flex items-center gap-2">
            {skill}
            <button onClick={() => removeSkill(index)} className="text-blue-600 hover:text-red-600">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}