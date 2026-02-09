/* eslint-disable @typescript-eslint/no-explicit-any */

function LandingPage({ data }: { data: any }) {
  const { personalInfo, stats, skills, experience, projects } = data;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <section className="text-center py-20">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-4xl text-white font-bold">
          {personalInfo.name
            .split(" ")
            .map((n: any) => n[0])
            .join("")}
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {personalInfo.name}
        </h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-400 dim:text-neutral-400 mb-6">
          {personalInfo.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 dim:text-neutral-400 max-w-2xl mx-auto mb-8">
          {personalInfo.bio}
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            Contact Me
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-gray-300 dark:border-slate-600 dim:border-neutral-600 rounded-lg font-medium hover:border-purple-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {stats && (
        <section className="py-12 bg-gray-50 dark:bg-slate-800 dim:bg-neutral-800 rounded-xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-8">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stats.yearsExperience}
              </div>
              <div className="text-gray-600 dark:text-gray-400 dim:text-neutral-400">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stats.projectsCompleted}
              </div>
              <div className="text-gray-600 dark:text-gray-400 dim:text-neutral-400">
                Projects
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stats.technologies}
              </div>
              <div className="text-gray-600 dark:text-gray-400 dim:text-neutral-400">
                Technologies
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stats.companies}
              </div>
              <div className="text-gray-600 dark:text-gray-400 dim:text-neutral-400">
                Companies
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((category: any, idx: any) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-slate-800 dim:bg-neutral-800 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400 dim:text-yellow-500">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill: any, skillIdx: any) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1 bg-white dark:bg-slate-700 dim:bg-neutral-700 rounded-full text-sm border border-gray-200 dark:border-slate-600 dim:border-neutral-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="space-y-6">
          {experience.slice(0, 3).map((job: any, idx: any) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-slate-800 dim:bg-neutral-800 rounded-lg border border-gray-200 dark:border-slate-700 dim:border-neutral-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-purple-600 dark:text-purple-400 dim:text-yellow-500">
                    {job.company}
                  </p>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 dim:text-neutral-400">
                  {job.startDate} - {job.endDate}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 dim:text-neutral-400">
                {job.achievements
                  .slice(0, 2)
                  .map((achievement: any, achIdx: any) => (
                    <li key={achIdx}>{achievement}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project: any, idx: any) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-slate-800 dim:bg-neutral-800 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 dim:border-neutral-700"
            >
              <div className="h-40 bg-gradient-to-br from-purple-400 to-indigo-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dim:text-neutral-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: any, techIdx: any) => (
                    <span
                      key={techIdx}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900 dim:bg-yellow-900 text-purple-600 dark:text-purple-300 dim:text-yellow-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
