/* eslint-disable @typescript-eslint/no-explicit-any */
function ResumePage({ data }: { data: any }) {
  const { personalInfo, skills, experience, education } = data;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="no-print mb-6 text-right">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          🖨️ Print Resume
        </button>
      </div>

      <div className="bg-white text-gray-900 p-12 rounded-lg shadow-lg print:shadow-none">
        <header className="text-center border-b-2 border-gray-300 pb-6 mb-8">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{personalInfo.title}</h2>
          <div className="flex justify-center gap-4 flex-wrap text-sm text-gray-600">
            <span>{personalInfo.email}</span>
            <span>|</span>
            <span>{personalInfo.phone}</span>
            <span>|</span>
            <a href={personalInfo.linkedin} className="hover:text-purple-600">
              LinkedIn
            </a>
            <span>|</span>
            <a href={personalInfo.github} className="hover:text-purple-600">
              GitHub
            </a>
          </div>
        </header>

        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Skills</h3>
          <div className="space-y-2">
            {skills.map((category: any, idx: any) => (
              <div key={idx}>
                <span className="font-semibold">{category.category}: </span>
                <span className="text-gray-700">
                  {category.items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-6 border-gray-300" />

        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Experience</h3>
          <div className="space-y-6">
            {experience.map((job: any, idx: any) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <strong className="text-lg">{job.title}</strong>
                    {" | "}
                    <a
                      href={job.companyUrl}
                      className="text-purple-600 hover:underline"
                    >
                      <em>{job.company}</em>
                    </a>
                  </div>
                  <strong className="text-sm">
                    {job.startDate} - {job.endDate}
                  </strong>
                </div>
                <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
                  {job.achievements.map((achievement: any, achIdx: any) => (
                    <li key={achIdx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-6 border-gray-300" />

        <section>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Education</h3>
          {education.map((edu: any, idx: any) => (
            <div key={idx} className="flex justify-between items-baseline">
              <div>
                <strong className="text-lg">{edu.degree}</strong>
                {" | "}
                <a
                  href={edu.institutionUrl}
                  className="text-purple-600 hover:underline"
                >
                  <em>{edu.institution}</em>
                </a>
              </div>
              <strong className="text-sm">Class of {edu.graduationYear}</strong>
            </div>
          ))}
        </section>
      </div>

      <style>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
          .bg-white {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}

export default ResumePage;
