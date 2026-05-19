import InputField from '../UI/InputField';

export default function PersonalInfo({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow border">
      <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Full Name" name="fullName" value={data.fullName} onChange={handleChange} required />
        <InputField label="Job Title" name="title" value={data.title} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={data.email} onChange={handleChange} required />
        <InputField label="Phone" name="phone" value={data.phone} onChange={handleChange} />
        <InputField label="Location" name="location" value={data.location} onChange={handleChange} />
        <InputField label="LinkedIn" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
        <InputField label="Website" name="website" value={data.website} onChange={handleChange} />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write a short professional summary..."
        />
      </div>
    </div>
  );
}