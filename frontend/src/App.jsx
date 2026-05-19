import { useState, useEffect } from 'react';
import PersonalInfo from './components/Form/PersonalInfo';
import Education from './components/Form/Education';
import Experience from './components/Form/Experience';
import Skills from './components/Form/Skills';
import Projects from './components/Form/Projects';
import ResumePreview from './components/Preview/ResumePreview';
import { generatePDF } from './utils/generatePDF';
import { resumeAPI } from './services/api';

function App() {
  const [activeTemplate, setActiveTemplate] = useState('template1');
  const [isSaving, setIsSaving] = useState(false);
  const [userId] = useState(`user_${Date.now()}`);

  const [formData, setFormData] = useState({
    personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', website: '', summary: '' },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await resumeAPI.getResume(userId);
        if (res.success && res.data?.personalInfo) {
          setFormData(res.data);
        }
      } catch (e) {}
    };
    loadData();
  }, [userId]);

  const updateSection = (section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await resumeAPI.saveResume(formData, userId);
    if (res.success) {
      alert(`✅ Saved Successfully!\nUser ID: ${res.userId}`);
    } else {
      alert("Save failed");
    }
    setIsSaving(false);
  };

  const handleDownload = () => generatePDF(formData, activeTemplate);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setActiveTemplate('template1')} className={`px-5 py-2 rounded-md ${activeTemplate === 'template1' ? 'bg-white shadow' : ''}`}>ATS</button>
              <button onClick={() => setActiveTemplate('template2')} className={`px-5 py-2 rounded-md ${activeTemplate === 'template2' ? 'bg-white shadow' : ''}`}>Modern</button>
            </div>

            <button onClick={handleSave} disabled={isSaving} className="bg-green-600 text-white px-6 py-3 rounded-lg">
              {isSaving ? "Saving..." : "Save to DB"}
            </button>

            <button onClick={handleDownload} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Download PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <PersonalInfo data={formData.personalInfo} onChange={d => updateSection('personalInfo', d)} />
          <Experience data={formData.experience} onChange={d => updateSection('experience', d)} />
          <Education data={formData.education} onChange={d => updateSection('education', d)} />
          <Skills data={formData.skills} onChange={d => updateSection('skills', d)} />
          <Projects data={formData.projects} onChange={d => updateSection('projects', d)} />
        </div>

        <div className="lg:sticky lg:top-8">
          <ResumePreview data={formData} template={activeTemplate} />
        </div>
      </div>
    </div>
  );
}

export default App;