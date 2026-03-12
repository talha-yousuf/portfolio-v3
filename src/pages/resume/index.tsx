import React from "react";
import portFolioData from "../../data";

const styles = {
  backdrop: {
    backgroundColor: "#313131",
  },
  page: {
    backgroundColor: "#ffffff",
    color: "#050505",
    fontFamily: "Helvetica",
    width: "210mm",
    height: "297mm",
    margin: 0,
    padding: "4.5mm 3.5mm",
    overflow: "hidden",
    fontSize: "3.3mm",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "0.5mm",
  },
  name: {
    fontSize: "7mm",
    fontWeight: "bold",
  },
  subHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2mm",
  },
  link: {
    color: "#0e2875",
    textDecoration: "none",
  },
  hr: {
    border: "0",
    borderTop: "0.3mm solid #05050580",
    margin: "1mm",
  },
  sectionHeading: {
    fontWeight: "bold",
    marginTop: "1.8mm",
  },
  subSectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1mm",
    marginBottom: "1mm",
    marginLeft: "2mm",
    marginRight: "2mm",
    paddingTop: "1.4mm",
    borderBottom: "0.3mm dotted #050505",
    paddingBottom: "0.1mm",
  },
  list: {
    marginBottom: "1mm",
    lineHeight: "4.2mm",
  },
  listItem: {
    marginBottom: "0.3mm",
    display: "flex",
    gap: "1mm",
  },
} satisfies Record<string, React.CSSProperties>;

function ResumePage() {
  return (
    <div style={styles.backdrop}>
      <style>
        {`@media print { body { margin: 0; } @page { size: A4; margin: 0; } }`}
      </style>

      <div id="resume-a4" style={styles.page}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.name}>{portFolioData.personalInfo.name}</h1>

          <div style={styles.subHeader}>
            {/* Title */}
            <strong>{portFolioData.personalInfo.title}</strong>
            <span>/</span>

            {/* Email */}
            <a
              href={`mailto:${portFolioData.personalInfo.email}`}
              style={styles.link}
            >
              {portFolioData.personalInfo.email}
            </a>
            <span>/</span>

            {/* Phone */}
            <span>{portFolioData.personalInfo.phone}</span>
            <span>/</span>

            {/* LinkedIn */}
            <a href={portFolioData.personalInfo.linkedin} style={styles.link}>
              LinkedIn
            </a>
            <span>/</span>

            {/* Github */}
            <a href={portFolioData.personalInfo.github} style={styles.link}>
              GitHub
            </a>
          </div>
        </header>

        <hr style={styles.hr} />

        {/* Skills */}
        <section>
          <h3 style={styles.sectionHeading}>Skills:</h3>

          <div style={styles.list}>
            {portFolioData.skills.map((category, idx: number) => (
              <div key={idx} style={styles.listItem}>
                <div>&#9679;</div>

                <em style={{ width: "40mm" }}>{category.category}:</em>

                <div>{category.items.join(", ")}</div>
              </div>
            ))}
          </div>
        </section>

        <hr style={styles.hr} />

        {/* Experience */}
        <section>
          <h3 style={styles.sectionHeading}>Experience:</h3>

          {portFolioData.experience.map((job, idx: number) => (
            <div key={idx}>
              <div
                style={{
                  ...styles.subSectionHeading,
                  ...(job.achievements.length > 0 ? {} : { border: "none" }),
                }}
              >
                <div>
                  <strong>{job.title + " | "}</strong>

                  <a href={job.companyUrl} style={styles.link}>
                    <strong>
                      <em>{job.company}</em>
                    </strong>
                  </a>
                </div>

                <strong style={styles.link}>
                  {job.startDate}
                  {" - "}
                  {job.endDate}
                </strong>
              </div>

              {job.achievements.length > 0 && (
                <div style={styles.list}>
                  {job.achievements.map((achievement, achIdx: number) => (
                    <div key={achIdx} style={styles.listItem}>
                      <div>&#9679; </div>
                      <div>{achievement}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <hr style={styles.hr} />

        {/* Education */}
        <section>
          <h3 style={styles.sectionHeading}>Education:</h3>

          {portFolioData.education.map((edu, idx: number) => (
            <div key={idx} style={styles.subSectionHeading}>
              <div>
                <strong>{edu.degree + " | "}</strong>

                <a href={edu.institutionUrl} style={styles.link}>
                  <strong>
                    <em>{edu.institution}</em>
                  </strong>
                </a>
              </div>

              <strong style={styles.link}>Class of {edu.graduationYear}</strong>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ResumePage;
