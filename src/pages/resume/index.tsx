/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import data from "../../data";

const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    backgroundColor: "#ffffff",
    color: "#050505",
    // fontFamily: "Helvetica, Arial, sans-serif",
    lineHeight: "1.3",
    fontSize: "9pt",
    margin: "0 auto",
    padding: "48px",
    maxWidth: "75vw",
  },
  header: {
    textAlign: "center",
    marginBottom: "4px",
  },
  name: {
    fontSize: "18pt",
    fontWeight: "bold",
    padding: "3px 0",
  },
  title: {
    fontSize: "12pt",
    fontWeight: "bold",
    padding: "3px 0",
  },
  contacts: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    fontWeight: "bold",
    padding: "4px",
  },
  link: {
    color: "#0e2875",
    textDecoration: "none",
  },
  hr: {
    border: "0",
    borderTop: "0.3px solid #05050580",
    margin: "4px 0",
  },
  sectionHeading: {
    fontSize: "12pt",
    fontWeight: "bold",
    padding: "3px 0",
  },
  list: {
    paddingLeft: "14px",
    marginBottom: "8px",
    lineHeight: "1.2",
  },
  listItem: {
    marginBottom: "0.5px",
  },
  employmentHeading: {
    display: "flex",
    justifyContent: "space-between",
    margin: "4px 8px",
    borderBottom: "dotted 0.3px #050505",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
};

function ResumePage() {
  const { personalInfo, skills, experience, education } = data;

  return (
    <div className="resume-container" style={styles.container}>
      <style>
        {`@media print { 
          body { margin: 0; } 
          @page { size: A4; margin: 0.2in; } 
          
          .resume-container { 
            margin: 0 !important; 
            max-width: none !important; 
            width: 100% !important;
            padding: 0 !important;
          }
        }`}
      </style>

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.name}>{personalInfo.name}</h1>
        <h3 style={styles.title}>{personalInfo.title}</h3>
        <div style={styles.contacts}>
          <a href={`mailto:${personalInfo.email}`} style={styles.link}>
            {personalInfo.email}
          </a>
          <span>|</span>
          <span style={styles.link}>{personalInfo.phone}</span>
          <span>|</span>
          <a href={personalInfo.linkedin} style={styles.link}>
            LinkedIn
          </a>
          <span>|</span>
          <a href={personalInfo.github} style={styles.link}>
            GitHub
          </a>
        </div>
      </header>

      <hr style={styles.hr} />

      {/* Skills */}
      <section>
        <h3 style={styles.sectionHeading}>Skills</h3>
        <ul style={styles.list}>
          {skills.map((category: any, idx: number) => (
            <li key={idx} style={styles.listItem}>
              <strong style={styles.bold}>{category.category}:</strong>
              <span>{category.items.join(", ")}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr style={styles.hr} />

      {/* Experience */}
      <section>
        <h3 style={styles.sectionHeading}>Experience</h3>
        {experience.map((job: any, idx: number) => (
          <div key={idx}>
            <div style={styles.employmentHeading}>
              <span style={styles.bold}>
                {job.title + " | "}
                <a
                  href={job.companyUrl}
                  style={{ ...styles.link, ...styles.italic }}
                >
                  {job.company}
                </a>
              </span>
              <span style={styles.bold}>
                {job.startDate}–{job.endDate}
              </span>
            </div>
            <ul style={styles.list}>
              {job.achievements.map((achievement: any, achIdx: number) => (
                <li key={achIdx} style={styles.listItem}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <hr style={styles.hr} />

      {/* Education */}
      <section>
        <h3 style={styles.sectionHeading}>Education</h3>
        {education.map((edu: any, idx: number) => (
          <div key={idx} style={styles.employmentHeading}>
            <span style={styles.bold}>
              {edu.degree + " | "}
              <a
                href={edu.institutionUrl}
                style={{ ...styles.link, ...styles.italic }}
              >
                {edu.institution}
              </a>
            </span>
            <span style={styles.bold}>Class of {edu.graduationYear}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ResumePage;
