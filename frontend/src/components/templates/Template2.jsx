export default function Template2({ data }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="bg-white min-h-[1120px] w-full max-w-[800px] mx-auto p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-2xl text-gray-600 mt-2">{personalInfo.title}</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">PROFESSIONAL SUMMARY</h3>
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">EXPERIENCE</h3>
            {experience.map((exp, i) => (
              <div key={i} className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{exp.jobTitle}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="mt-4 text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">EDUCATION</h3>
            {education.map((edu, i) => (
              <div key={i} className="mb-6">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">SKILLS</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span key={i} className="bg-gray-100 px-5 py-2 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">PROJECTS</h3>
            {projects.map((proj, i) => (
              <div key={i} className="mb-8">
                <h4 className="font-semibold">{proj.name}</h4>
                <p className="text-gray-600 mt-1">{proj.description}</p>
                {proj.link && <p className="text-blue-600 text-sm">→ {proj.link}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}