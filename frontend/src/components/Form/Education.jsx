import { useState } from 'react';
import InputField from '../UI/InputField';

export default function Education({ data, onChange }) {
  const [newEdu, setNewEdu] = useState({
    degree: '', institution: '', startDate: '', endDate: ''
  });

  const addEducation = () => {
    if (newEdu.degree && newEdu.institution) {
      onChange([...data, newEdu]);
      setNewEdu({ degree: '', institution: '', startDate: '', endDate: '' });
    }
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow border">
      <h2 className="text-2xl font-semibold mb-6">Education</h2>

      {data.map((edu, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between">
            <h3 className="font-medium">{edu.degree}</h3>
            <button onClick={() => removeEducation(index)} className="text-red-500 text-sm">Remove</button>
          </div>
          <p className="text-gray-600">{edu.institution}</p>
          <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Degree" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} />
        <InputField label="Institution" value={newEdu.institution} onChange={(e) => setNewEdu({...newEdu, institution: e.target.value})} />
        <InputField label="Start Date" type="month" value={newEdu.startDate} onChange={(e) => setNewEdu({...newEdu, startDate: e.target.value})} />
        <InputField label="End Date" type="month" value={newEdu.endDate} onChange={(e) => setNewEdu({...newEdu, endDate: e.target.value})} />
      </div>

      <button
        onClick={addEducation}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Education
      </button>
    </div>
  );
}