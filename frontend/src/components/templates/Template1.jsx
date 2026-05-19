export default function Template1({ data }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="bg-white min-h-[1120px] w-full max-w-[800px] mx-auto font-sans text-[10.8pt] leading-relaxed">
      {/* Header */}
      <div className="bg-gray-900 text-white px-10 py-9">
        <h1 className="text-4xl font-bold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-xl mt-1 text-gray-300">{personalInfo.title}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-5 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div className="grid grid-cols-5">
        {/* Left Sidebar */}
        <div className="col-span-2 bg-gray-50 px-10 py-8 border-r">
          {personalInfo.summary && (
            <div className="mb-9">
              <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-3">SUMMARY</h3>
              <p className="text-gray-700 text-[10.2pt] leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-3">SKILLS</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-white px-3 py-1 text-xs border rounded">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-3 px-10 py-8 space-y-9">
          {experience.length > 0 && (
            <div>
              <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-4">EXPERIENCE</h3>
              {experience.map((exp, i) => (
                <div key={i} className="mb-7">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{exp.jobTitle}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <p className="text-xs text-gray-500">{exp.startDate} — {exp.endDate}</p>
                  </div>
                  <p className="mt-3 text-gray-700 whitespace-pre-line text-[10pt]">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-4">EDUCATION</h3>
              {education.map((edu, i) => (
                <div key={i} className="mb-6">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h3 className="uppercase text-xs font-bold tracking-widest text-gray-500 mb-4">PROJECTS</h3>
              {projects.map((proj, i) => (
                <div key={i} className="mb-6">
                  <h4 className="font-semibold">{proj.name}</h4>
                  <p className="text-gray-700">{proj.description}</p>
                  {proj.link && <p className="text-blue-600 text-xs mt-1">{proj.link}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}