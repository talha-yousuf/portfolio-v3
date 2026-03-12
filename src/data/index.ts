export interface PortfolioDataType {
  webpageTitle: string;

  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
    bio: string;
    profileImageUrl: string;
  };

  stats: {
    careerStartYear: number;
    projectsWorkedOn: string;
  };

  clientCompanies: {
    title: string;
    thumbnailUrl: string;
    websiteUrl: string;
  }[];

  skills: {
    category: string;
    items: string[];
  }[];

  skillsAndTechForWebpage: {
    title: string;
    thumbnailUrl: string;
  }[];

  experience: {
    title: string;
    company: string;
    companyUrl: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }[];

  education: {
    degree: string;
    institution: string;
    institutionUrl: string;
    location: string;
    graduationYear: string;
    description: string;
  }[];

  projects: {
    order: number;
    featured: boolean;
    hidden: boolean;
    githubUrl: string;
    demoUrl: string;
    productPageUrl: string;
    folderName: string;
    docUrl: string;
    thumbnailUrl: string;
    assetsUrls: string[];
    name: string;
    shortDescription: string;
    description: string[];
    architectureNotes: string[];
    stack: string[];
    domains: string[];
    contribution: string[];
  }[];

  certifications: never[];

  socialLinks: {
    twitter: string;
    instagram: string;
    medium: string;
    stackoverflow: string;
  };

  service: {
    title: string;
    bullets: string[];
  }[];
}

const ROOT_URL_RAW =
  "https://raw.githubusercontent.com/talha-yousuf/portfolio-data/refs/heads/main";

export const getProjectUrls = async (
  folder: string,
): Promise<{
  doc: string;
  thumb: string;
  assets: string[];
}> => {
  try {
    const assetsNames: string[] = await (
      await fetch(ROOT_URL_RAW + `/projects/${folder}/assets/manifest.json`)
    ).json();

    return {
      doc: ROOT_URL_RAW + `/projects/${folder}/documentation.md`,
      thumb: ROOT_URL_RAW + `/projects/${folder}/assets/thumb.png`,
      assets: assetsNames
        .filter((x) => x !== "thumb.png")
        .map((x) => ROOT_URL_RAW + `/projects/${folder}/assets/${x}`)
        .filter((x) => x),
    };
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _error: unknown
  ) {
    return {
      doc: "",
      thumb: "",
      assets: [],
    };
  }
};

const portFolioData: PortfolioDataType = {
  webpageTitle: "Talha Yousuf - Software Engineer",
  //
  personalInfo: {
    name: "Talha Yousuf",
    title: "Software Engineer",
    //
    email: "talhayousuf.work@gmail.com",
    phone: "+92-307-6003927",
    //
    linkedin: "https://linkedin.com/in/talha-yousuf",
    github: "https://github.com/talha-yousuf",
    //
    location: "Pakistan",
    bio: "Full Stack Software Engineer with 6+ years of experience, across diverse projects ranging from IoT, e-commerce, fintech to enterprise applications.",
    //
    profileImageUrl: ROOT_URL_RAW + "/personal/profile-pic.png",
  },
  //
  stats: {
    careerStartYear: 2019,
    projectsWorkedOn: "20+",
  },
  //
  clientCompanies: [
    {
      title: "Genes and Machines",
      thumbnailUrl: ROOT_URL_RAW + "/clients/genesandmachines.png",
      websiteUrl: "",
    },
    {
      title: "CARE",
      thumbnailUrl: ROOT_URL_RAW + "/clients/care.png",
      websiteUrl: "https://carepvtltd.com/",
    },
    {
      title: "WiserMachines",
      thumbnailUrl: ROOT_URL_RAW + "/clients/wisermachines.png",
      websiteUrl: "https://www.linkedin.com/company/wisermachines/",
    },
    {
      title: "UET",
      thumbnailUrl: ROOT_URL_RAW + "/clients/uet.png",
      websiteUrl: "https://www.uettaxila.edu.pk/",
    },
    {
      title: "Shifa Intl. Hospital",
      thumbnailUrl: ROOT_URL_RAW + "/clients/shifa.png",
      websiteUrl: "https://www.shifa.com.pk/",
    },
    {
      title: "Lotte Kolson",
      thumbnailUrl: ROOT_URL_RAW + "/clients/kolson.png",
      websiteUrl: "https://www.lottekolson.com/",
    },
    {
      title: "Crescent-Bahuman",
      thumbnailUrl: ROOT_URL_RAW + "/clients/cbl.png",
      websiteUrl: "https://www.crescentbahuman.com/",
    },
    {
      title: "Sedenius Engineering",
      thumbnailUrl: ROOT_URL_RAW + "/clients/sedeniuseng.png",
      websiteUrl: "https://www.linkedin.com/company/sedenius-engineering-gmbh/",
    },
    {
      title: "Sedenius Technologies",
      thumbnailUrl: ROOT_URL_RAW + "/clients/sedeniustech.png",
      websiteUrl: "https://www.linkedin.com/company/sedenius-technologies/",
    },
    {
      title: "Neoteric Softwares",
      thumbnailUrl: ROOT_URL_RAW + "/clients/neoteric.png",
      websiteUrl: "",
    },
    {
      title: "Frameless",
      thumbnailUrl: ROOT_URL_RAW + "/clients/frameless.png",
      websiteUrl: "",
    },
    {
      title: "DPL",
      thumbnailUrl: ROOT_URL_RAW + "/clients/dpl.png",
      websiteUrl: "https://www.dplit.com/",
    },
    {
      title: "Concora",
      thumbnailUrl: ROOT_URL_RAW + "/clients/concora.png",
      websiteUrl: "https://www.linkedin.com/company/archbase-concora/",
    },
    {
      title: "nGAGE",
      thumbnailUrl: ROOT_URL_RAW + "/clients/nagage.png",
      websiteUrl: "https://ngageatwork.com/",
    },
    {
      title: "nuSoft",
      thumbnailUrl: ROOT_URL_RAW + "/clients/nusoft.png",
      websiteUrl: "https://www.nusoft.co/",
    },
    {
      title: "Zyprova",
      thumbnailUrl: ROOT_URL_RAW + "/clients/zyprova.png",
      websiteUrl: "https://www.zyprova.com/",
    },
  ],
  //
  skills: [
    {
      category: "Frontend",
      items: [
        //
        "React",
        "Next.js",
        "Redux",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Material UI",
        "Angular",
      ],
    },
    {
      category: "Backend & Databases",
      items: [
        //
        "Node.js",
        "Python",
        "Express.js",
        "Nest.js",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "System Design",
      ],
    },
    {
      category: "Cloud & DevOps",
      items: [
        //
        "AWS",
        "Docker",
        "Git",
        "Serverless",
        "Infrastructure as Code",
      ],
    },
    {
      category: "Data & AI/ML",
      items: [
        //
        "Pandas",
        "NumPy",
        "PyTorch",
        "LangChain",
      ],
    },
  ],
  skillsAndTechForWebpage: [
    {
      title: "JavaScript",
      thumbnailUrl:
        "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
    },
    {
      title: "TypeScript",
      thumbnailUrl:
        "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    },
    {
      title: "React",
      thumbnailUrl:
        "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    },
    {
      title: "Next.js",
      thumbnailUrl:
        "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
    },
    {
      title: "Redux",
      thumbnailUrl:
        "https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white",
    },
    {
      title: "Angular",
      thumbnailUrl:
        "https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white",
    },
    {
      title: "Tailwind CSS",
      thumbnailUrl:
        "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
    },
    {
      title: "Material UI",
      thumbnailUrl:
        "https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white",
    },
    {
      title: "Node.js",
      thumbnailUrl:
        "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",
    },
    {
      title: "Express.js",
      thumbnailUrl:
        "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB",
    },
    {
      title: "NestJS",
      thumbnailUrl:
        "https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white",
    },
    {
      title: "GraphQL",
      thumbnailUrl:
        "https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white",
    },
    {
      title: "REST APIs",
      thumbnailUrl:
        "https://img.shields.io/badge/REST-02569B?style=for-the-badge&logo=rest&logoColor=white",
    },
    {
      title: "PostgreSQL",
      thumbnailUrl:
        "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white",
    },
    {
      title: "MongoDB",
      thumbnailUrl:
        "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
    },
    {
      title: "Redis",
      thumbnailUrl:
        "https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white",
    },
    {
      title: "Firebase",
      thumbnailUrl:
        "https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase",
    },
    {
      title: "Python",
      thumbnailUrl:
        "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
    },
    {
      title: "Pandas",
      thumbnailUrl:
        "https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white",
    },
    {
      title: "NumPy",
      thumbnailUrl:
        "https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white",
    },
    {
      title: "PyTorch",
      thumbnailUrl:
        "https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white",
    },
    {
      title: "LangChain",
      thumbnailUrl:
        "https://img.shields.io/badge/🦜_LangChain-121212?style=for-the-badge",
    },
    {
      title: "AWS",
      thumbnailUrl:
        "https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white",
    },
    {
      title: "AWS Lambda",
      thumbnailUrl:
        "https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white",
    },
    {
      title: "Serverless",
      thumbnailUrl:
        "https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white",
    },
    {
      title: "Docker",
      thumbnailUrl:
        "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
    },
    {
      title: "Infrastructure as Code",
      thumbnailUrl:
        "https://img.shields.io/badge/IaC-844FBA?style=for-the-badge",
    },
    {
      title: "Linux",
      thumbnailUrl:
        "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
    },
    {
      title: "Git",
      thumbnailUrl:
        "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
    },
    {
      title: "CI/CD",
      thumbnailUrl:
        "https://img.shields.io/badge/CI%2FCD-239120?style=for-the-badge",
    },
    {
      title: "Jest",
      thumbnailUrl:
        "https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white",
    },
    {
      title: "ESLint",
      thumbnailUrl:
        "https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white",
    },
    {
      title: "Webpack",
      thumbnailUrl:
        "https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black",
    },
    {
      title: "Yarn",
      thumbnailUrl:
        "https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white",
    },
    {
      title: "System Design",
      thumbnailUrl:
        "https://img.shields.io/badge/System_Design-4285F4?style=for-the-badge",
    },
    {
      title: "Notion",
      thumbnailUrl:
        "https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white",
    },
  ],
  //
  experience: [
    {
      title: "Full Stack Engineer",
      company: "Freelancer/Contractor",
      companyUrl: "",
      startDate: "March 2025",
      endDate: "Present",
      current: true,
      achievements: [
        "Integrated local LLM model and Slack APIs with backend microservices to deploy a proprietary AI assistant within company's Slack, resulting in successful funding round evaluation.",
        "Designed and implemented event-driven workflows in microservices using Kafka and REST APIs, building complex backend services with NestJS and PostgreSQL to deliver core business functionality for a fintech platform.",
        "Delivered employee management system MVP using NestJS, React, and PostgreSQL, providing comprehensive HR functionality.",
        "Built and shipped feature flagging internal tool MVP with NestJS, React, and PostgreSQL stack.",
        "Led architecture and system design decisions, including database schema design, for implementing new product features.",
        "Improved system performance and scalability through database normalization, query optimization, and refactoring backend service.",
      ],
    },
    {
      title: "Software Engineer",
      company: "DPL Pvt. Ltd.",
      companyUrl: "https://www.linkedin.com/company/dpl-it/",
      startDate: "September 2023",
      endDate: "February 2025",
      current: false,
      achievements: [
        "Led migration of multi-tenant B2B e-commerce platform from legacy to modern architecture, maintaining feature consistency across applications and enabling continued migration without disrupting active tenants.",
        "Implemented synchronized user authentication across multiple legacy and modern applications, using redirects and auth-key strategies, ensuring seamless transitions for users without service disruption.",
        "Leveraged Next.js SSR to build dynamic SEO pages, improving search engine rankings and traffic acquisition for the platform.",
        "Built RESTful APIs and AWS Lambda microservices using Node.js and PostgreSQL, supporting core platform functionality across multiple applications within the platform.",
        "Integrated google analytics tracking to capture user engagement and performance metrics, enabling data-driven product decisions.",
        "Debugged and optimized serverless deployments, resolving production issues and improving Lambda function performance.",
        "Built scalable AWS Cloud Infrastructure POC using CloudFormation, with auto-scaling, load-balancing, database/cache management, security, and deployment pipeline, delivering an architectural template for future IaC usage.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Neoteric Softwares Pvt. Ltd.",
      companyUrl: "https://www.linkedin.com/company/neoteric-tech/",
      startDate: "December 2023",
      endDate: "May 2023",
      current: false,
      achievements: [
        "Built frontend for an NFT marketplace with React, Redux, and TailwindCSS, integrating web3-react for wallet connections and blockchain transactions, additionally built the admin CMS for content management and supporting backend services/APIs.",
        "Led project planning including resource allocation, delivery estimations and timelines.",
        "Established teams engineering standards for code quality, design patterns, and development workflows using pre-commit tools.",
      ],
    },
    {
      title: "MERN Stack Developer",
      company: "Sedenius Technologies Pvt. Ltd.",
      companyUrl: "https://www.linkedin.com/company/sedenius-technologies/",
      startDate: "April 2021",
      endDate: "December 2023",
      current: false,
      achievements: [
        "Led the development of a comprehensive asset management PWA using React, Node and Postgres, delivering features like task scheduling and planning, resource allocation, role-based access, and analytics dashboards.",
        "Developed features and resolved critical bugs for React Native smart-home iOS/Android app, unblocking and delivering previously stalled project to market launch.",
        "Built coding assessment platform MVP using React and Firebase for internal technical recruitment and evaluation.",
        "Collaborated in system architecture and database design, wrote supporting APIs, led database normalization effort.",
        "Implemented GDPR-compliance features to meet data protection regulatory requirements.",
        "Maintained Jenkins CI/CD, implementing Bash scripts for managing release on self-hosted servers.",
        "Wrote comprehensive E2E test automation suites using Cypress for cross-browser and cross-device validation, parallel to unit test coverage using Jest, ensuring TDD best practices.",
      ],
    },
    {
      title: "Design Engineer",
      company: "CARE Pvt. Ltd.",
      companyUrl:
        "https://www.linkedin.com/company/center-for-advanced-research-in-engineering-care/",
      startDate: "July 2019",
      endDate: "April 2021",
      current: false,
      achievements: [
        "Developed and deployed custom IoT web dashboards for enterprise clients, owning full frontend development and managing deployments, resulting in successful client demos and production rollouts.",
        "Owned client-facing solutions design by collaborating with stakeholders to collect and translate business requirements into features.",
        "Built Python data pipelines to ingest, clean, and transform raw IoT sensor data, for automated report generation that delivered actionable insights for data-driven decision-making.",
        "Built and maintained Node.js backend services and REST APIs to support multiple projects.",
        "Developed embedded IoT sensor nodes with firmware, PCB design, and on-site deployments resulting in successful field tests.",
      ],
    },
    {
      title: "Co-founder / Embedded Systems Engineer",
      company: "Self-Employed",
      companyUrl: "",
      startDate: "April 2018",
      endDate: "June 2019",
      current: false,
      achievements: [
        // "Developed embedded hardware & software and the web UI for an agri-tech IoT system.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelors of Electrical Engineering",
      institution: "NUST",
      institutionUrl: "https://nust.edu.pk/",
      location: "Pakistan",
      graduationYear: "2018",
      description: "",
    },
  ],
  projects: [
    {
      order: 0,
      featured: true,
      hidden: false,
      githubUrl: "",
      demoUrl: "",
      productPageUrl: "https://www.zyprova.com/",
      folderName: "zyprova",
      docUrl: "",
      thumbnailUrl: "",
      assetsUrls: [""],

      name: "Zyprova",
      shortDescription:
        "AI-powered corporate planning platform replacing spreadsheets with natural language forecasting.",
      description: [
        "Zyprova is a B2B SaaS platform that lets executives and operators run financial, headcount, and equity planning through natural language instead of formulas and disconnected spreadsheets.",
        "The platform supports conversational financial forecasting, scenario modeling (best/base/worst case), headcount and compensation planning, cap table and equity integration, and board-ready reporting. An all in one unified workspace for Finance, HR, and operations teams.",
        "My work spanned across the core business logic services and system design, also contributing to the AI integration layers.",
      ],
      architectureNotes: [
        "Event-driven microservices platform built on NestJS and TypeScript, with Kafka as the messaging backbone connecting all independently deployable services.",
        "Features an AI-powered Slack integration service that implements a full RAG pipeline using LangChain and ChromaDB, acting as middleware between the company Slack workspace and a proprietary LLM.",
        "A central API gateway handles all routing and request validation, abstracting microservice complexity from the Vue.js frontend.",
        "PostgreSQL (RDS Multi-AZ) serves as the primary data store across financial, HR, and user domains. ChromaDB on EBS provides vector storage for conversation context in the RAG pipeline.",
        "All services are containerized and deployed to AWS via a centralized deployment-tools repository. Infrastructure includes ALB, ECS/EKS, MSK (managed Kafka), and CloudFront + S3 for frontend delivery.",
        "A shared common-lib package provides TypeScript types, interfaces, and utilities to ensure consistency across services while maintaining independent deployability.",
      ],
      stack: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "Kafka",
        "Docker",
        "LangChain",
        "ChromaDB",
        "VueJS",
        "REST APIs",
        "AWS",
        "Microservices Architecture",
      ],
      domains: [
        "Financial Planning & Analysis",
        "Corporate Performance Management (CPM)",
        "FinTech",
        "B2B SaaS",
        "Workforce Planning",
        "Equity & Cap Table Management",
        "Strategic Planning & Forecasting",
        "Business Intelligence",
        "Enterprise SaaS",
      ],
      contribution: [
        "Integrated local LLM and Slack APIs with backend microservices to deploy a proprietary AI assistant within the company Slack, contributing to a successful funding round evaluation.",
        "Built an end-to-end microservices pipeline for AI integration, including data preprocessing workflows, RAG capabilities, concurrent request handling, timeout management, and metadata persistence.",
        "Designed and implemented event-driven workflows across microservices using Kafka and REST APIs, delivering core business functionality for the fintech platform.",
        "Led architecture and system design decisions including database schema design, established technical standards for code quality, and drove implementation of new product features.",
        "Improved system performance and scalability through database normalization, query optimization, and backend service refactoring.",
        "Collaborated with frontend developers, designers, and stakeholders to translate business requirements into technical deliverables.",
      ],
    },
    {
      order: 4,
      featured: false,
      hidden: false,
      githubUrl: "",
      demoUrl: "",
      productPageUrl: "https://www.wisermachines.com/",
      folderName: "wisermachines",
      docUrl: "",
      thumbnailUrl: "",
      assetsUrls: [""],

      name: "WiserMachines",
      shortDescription:
        "IoT machine monitoring platform for factory shop-floor digitization.",
      description: [
        "WiserMachines is a versatile IoT machine monitoring platform for the digitization of factory shop-floors. It gives industrial operators real-time visibility into machine performance, environment conditions, and production schedules, all mapped to the physical layout of their facilities.",
        "The platform supports real-time IoT dashboards, factory mapping by workshops and zones, environment monitoring, maintenance and production scheduling, threshold-based alerts with push notifications, role-based access control, and actionable reporting.",
      ],
      architectureNotes: [
        "MERN-stack web application extended with an embedded IoT layer. MQTT over an Eclipse Mosquitto broker handles real-time pub/sub communication between custom sensor nodes and the backend.",
        "Node.js / Express.js backend bridges the MQTT broker and the React frontend, handling data ingestion, alert processing, report generation, and user management.",
        "Dual database strategy: PostgreSQL for structured product and user data (accounts, roles, schedules), and MongoDB for high-volume, append-only sensor data.",
        "Custom-built IoT sensor nodes with in-house firmware and PCBs designed in Altium Designer, deployed and tested in real factory environments.",
        "Each client receives a tailored instance of the platform hosted on their internal on-site servers, ensuring data sovereignty and compatibility with industrial network constraints.",
      ],
      stack: [
        "React",
        "Angular",
        "Redux",
        "Material UI",
        "Highcharts.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "MQTT",
        "Eclipse Mosquitto",
        "Altium Designer",
      ],
      domains: [
        "Industrial Automation",
        "IoT",
        "Enterprise SaaS",
        "Factory Floor Management",
      ],
      contribution: [
        "Built customized, fully-responsive IoT portals using the MERN stack; implemented an early prototype using Angular.",
        "Developed role-based authorization systems and real-time IoT dashboards for machine monitoring.",
        "Built REST APIs using Node.js and Express.js; managed MongoDB and PostgreSQL databases.",
        "Implemented data pipelines for IoT data ingestion, querying, and cleaning; organized sensor data from multiple sources and generated actionable reports for clients.",
        "Contributed to firmware development for IoT sensor nodes, worked on PCB design and fabrication, and conducted hardware deployment and real-world testing in factory environments.",
        "Shipped multiple customized instances to different industrial clients, hosted on their internal servers with tailored configurations.",
        "Engaged with clients for weekly requirement gathering and translated evolving business requirements into technical features with the product team.",
        "Collaborated with designers to align UI/UX designs with business needs.",
      ],
    },
    {
      order: 5,
      featured: false,
      hidden: false,
      githubUrl: "",
      demoUrl: "",
      productPageUrl: "",
      folderName: "mm-iot",
      docUrl: "",
      thumbnailUrl: "",
      assetsUrls: [""],

      name: "Machine Maintenance",
      shortDescription:
        "Comprehensive asset management & rental PWA with IoT tracking, collaborative planning, and role-based access.",
      description: [
        "Machine Maintenance is a comprehensive workspace PWA for management and rentals of physical assets such as electronics, hardware tools, vehicles, and any other equipment that can be monitored via IoT sensors.",
        "Renting agencies, renters, and freelancers can track their rented or owned assets by location and status, and schedule them for rent or maintenance. Rental agency staff can collaboratively work on internal operations such as task planning, resource allocation, and problem reporting.",
        "Users can have roles inside an agency (e.g. admin, manager, employee), each assignable a different level of authorization by the admin.",
      ],
      architectureNotes: [
        "React PWA with Redux for state management, Material UI for components, LeafletJS for interactive GPS-based asset tracking maps, and Recharts for IoT analytics dashboards.",
        "Django REST API backend backed by PostgreSQL, with MQTT for real-time IoT sensor data ingestion from onboard GPS and third-party sensors.",
        "Jenkins CI/CD pipelines with Docker for containerized frontend deployments on self-hosted servers.",
      ],
      stack: [
        "React",
        "TypeScript",
        "Redux",
        "Material UI",
        "LeafletJS",
        "Django",
        "PostgreSQL",
        "MQTT",
        "Docker",
        "Jenkins",
        "Cypress",
        "Jest",
      ],
      domains: [
        "Asset Management",
        "IoT",
        "PWA",
        "B2B SaaS",
        "Field Operations",
      ],
      contribution: [
        "Led frontend development of the asset management PWA from scratch, planning and estimating tasks, implementing features, and transitioning into a frontend team lead role as the team scaled.",
        "Collaborated with backend developers to design entity relationships and REST APIs, and participated in database normalization efforts.",
        "Built an interactive map for live equipment tracking using onboard GPS sensors, and developed IoT analytics dashboards integrating data from multiple sensor sources.",
        "Implemented role-based access control with customizable user authorization levels managed through an admin panel.",
        "Collaborated with the product team, UI/UX designer, and stakeholders to gather business requirements and translate them into technical features.",
        "Established and maintained Jenkins CI/CD pipelines with Docker for frontend deployments on self-hosted servers using Bash scripts.",
        "Wrote comprehensive E2E test suites using Cypress for cross-browser and cross-device validation, alongside unit test coverage using Jest, enforcing TDD best practices.",
        "Implemented GDPR-compliance features to meet data protection regulatory requirements.",
      ],
    },
    {
      order: 3,
      featured: false,
      hidden: false,
      githubUrl: "",
      demoUrl: "",
      productPageUrl: "",
      folderName: "frameless",
      docUrl: "",
      thumbnailUrl: "",
      assetsUrls: [""],

      name: "Frameless",
      shortDescription:
        "A multi-blockchain NFT marketplace where users can mint, buy, and sell NFTs. Built on ZkSync (L2 Ethereum), offering lower gas fees and faster transactions than mainnet.",
      description: [
        "Frameless is a full-featured NFT trading platform built on ZkSync, a Layer 2 Ethereum scaling solution using ZK rollup technology. It allows creators and collectors to mint, list, buy, and sell NFTs with significantly reduced gas fees and faster finality compared to Ethereum mainnet. Users can configure collection parameters, set royalties, and manage their portfolios through a polished, responsive interface.",
        "The platform consists of two applications: a customer-facing marketplace and an internal admin CMS. The marketplace covers the full user journey — from connecting a wallet and minting an NFT, to browsing listings, viewing activity logs, and completing purchases. Blockchain interactions are handled via the web3-react library, which manages wallet connections (e.g. MetaMask) and exposes utilities for signing and submitting transactions to the ZkSync network.",
        "The admin CMS gives internal teams visibility into platform activity. Dashboards surface real-time analytics on listing volume and NFT popularity, while separate views handle user account management and transaction monitoring. Data visualizations are built with Recharts.",
      ],
      architectureNotes: [
        "The frontend is split into two standalone React SPAs — the marketplace app and the admin CMS — each with its own Redux store and routing. Both apps share a common design system built with TailwindCSS, enforcing visual consistency across the platform.",
        "Blockchain interactions follow an async, wallet-first pattern: the user connects their wallet via web3-react, which provides the signer context used to call smart contract functions (minting, transfers, purchases) against the ZkSync network. Transaction state and error handling are managed client-side.",
        "Both applications are containerized with Docker and hosted on self-hosted Linux servers. CI/CD is handled via Jenkins pipelines that run automated tests and deploy on merge.",
      ],
      stack: [
        "React",
        "Redux",
        "TailwindCSS",
        "Formik",
        "web3-react",
        "Recharts",
        "Docker",
        "Jenkins",
        "ZkSync",
        "Ethereum",
      ],
      domains: [
        "Blockchain",
        "Web3",
        "NFT",
        "DeFi",
        "Digital Collectibles",
        "E-Commerce",
      ],
      contribution: [
        "Planned and estimated the full frontend scope of the project as the full-stack developer responsible for all client-side delivery.",
        "Built the design system from scratch — layout, reusable components, and custom styling — ensuring consistent UI/UX across both apps.",
        "Developed the customer-facing marketplace: item and collection creation forms, listing pages, activity logs, user profiles, product detail pages, and the landing page.",
        "Integrated blockchain functionality using web3-react: wallet connection, NFT minting on ZkSync/ETH, and transaction workflows for buying and selling.",
        "Built the admin CMS: dashboards for listing oversight, transaction monitoring, real-time analytics, user account management, and activity tracking.",
        "Implemented data visualizations for admin dashboards using Recharts.",
        "Conducted code reviews and carried out QA processes.",
      ],
    },
    {
      order: 1,
      featured: true,
      hidden: false,
      githubUrl: "",
      demoUrl: "",
      productPageUrl: "https://www.concora.com/",
      folderName: "concora",
      docUrl: "",
      thumbnailUrl: "",
      assetsUrls: [""],

      name: "Concora",
      shortDescription:
        "B2B SaaS platform modernizing how building product manufacturers engage architects, engineers, and contractors online.",
      description: [
        "Concora is a B2B SaaS platform serving building product manufacturers, providing a plug-in product specification experience purpose-built for architects, engineers, contractors, and designers (AECs). The platform has 60,000+ registered users and is the first web experience of its kind built specifically for the AEC industry.",
        "The core product, Concora Spec, centralizes technical product documentation and gives design professionals a single hub for BIM/REVIT files, data sheets, 3-part specs, submittals, and project saves, while simultaneously capturing leads and analytics for manufacturers. Optional extensions add capabilities including custom brochures, project showcases, submittal generation, and category management.",
        "My work spanned both generations of the platform across the full stack: spearheading the new Spec Manager frontend from scratch, contributing to the new Spec Library frontend, developing RESTful APIs on the Concora API monolith, and building NestJS Lambda microservices.",
      ],
      architectureNotes: [
        "The platform consists of 8 repositories across two generations of the core web apps: a customer-facing Library (legacy React / new Next.js), a manufacturer-facing Manager (legacy React / new React), a Node.js/Express monolithic Concora API, a Library API proxy service, and a NestJS Lambda microservices repo.",
        "The Concora API acts as a central monolith and gateway, routing requests to a collection of AWS Lambda microservices (NestJS) handling specific workloads: submittal and brochure PDF generation, CRM integration, product import/export, geocoding, SES email, and analytics transport.",
        "Authentication is handled via Auth0 with JWT tokens carrying custom permission scopes in a namespace:resource:action pattern. A multi-tenancy system supports wildcard global tokens for internal admins and tenant-scoped tokens for manufacturer users, with a token swap flow for tenant selection.",
        "The new Spec Library was rebuilt in Next.js primarily for SSR/SSG to establish a meaningful SEO surface absent from the legacy React SPA. It introduced mobile-responsive design, per-manufacturer visual theming, server-side i18n with Redis caching, and single sign-on shared with the Manager.",
        "An internal feature flag and runtime config system (Launch Lightly) runs as its own frontend and API, driving per-client template selection and gating new features without redeployment.",
        "Infrastructure runs on AWS: ECS (Docker/ECR) for all web apps and APIs, Lambda for all microservices, Amplify for the Next.js frontend, RDS (PostgreSQL) as the primary data store, Elasticsearch on EC2 for product search, RabbitMQ on EC2 for async messaging, Redis for caching, and S3 for assets and exports. Two Windows Server EC2 instances run async Revit/BIM processing workers built on the Autodesk Revit SDK.",
      ],
      stack: [
        "React",
        "Next.js",
        "TypeScript",
        "Redux",
        "Chakra UI",
        "Express.js",
        "NestJS",
        "PostgreSQL",
        "Elasticsearch",
        "Redis",
        "RabbitMQ",
        "Auth0",
        "Docker",
        "AWS",
        "Microservices",
        "Storybook",
      ],
      domains: [
        "B2B SaaS",
        "Building Product Manufacturing",
        "Architecture & Construction",
        "BIM & Revit",
        "Enterprise SaaS",
        "Product Specification",
        "Lead Generation",
        "Multi-Tenancy",
        "CRM Integration",
      ],
      contribution: [
        "Spearheaded the development of the new Spec Manager frontend from scratch using React, Redux, Chakra UI, and Launch Lightly, serving as the primary owner of the app throughout its build.",
        "Led the migration of legacy Manager features into the new Spec Manager, ensuring functional consistency while establishing a modern architecture with feature-flag-gated rollouts.",
        "Designed and implemented a synchronized authentication system between the Manager and Library apps, including a multi-tenancy token swap flow via Auth0 for internal admin tenant selection.",
        "Drove an SEO optimization initiative leveraging Next.js SSR/SSG, building dynamic SEO pages and supporting Lambda microservices to automate metadata management without manual intervention.",
        "Designed and implemented RESTful APIs on the Concora API monolith using Node.js, Express.js, and PostgreSQL, and developed NestJS Lambda microservices integrated with the central API.",
        "Utilized AWS services including ECS, Lambda, S3, RDS, and CloudWatch to build, deploy, and maintain platform infrastructure, including debugging and optimizing serverless Lambda deployments.",
      ],
    },
    {
      order: 2,
      featured: true,
      hidden: false,
      githubUrl: "",
      demoUrl: "",
      productPageUrl: "https://ngageatwork.com",
      folderName: "ngage",
      docUrl: "",
      thumbnailUrl: "",
      assetsUrls: [""],

      name: "nGAGE",
      shortDescription:
        "AI-powered, gamified employee performance management platform for mid-to-large organizations.",
      description: [
        "nGAGE is a B2B SaaS platform that helps mid-to-large organizations manage employee productivity, engagement, and growth in one place, available on iOS, Android, and web.",
        "The platform features a points-and-rewards gamification system tied to task completion and challenges, with a real reward store, leaderboards, and a real-time feedback loop built into the rewards flow.",
        "Productivity tracking covers working hours, break patterns, remote workforce support, leave management, and HRM data export, all without invasive monitoring.",
        "Continuous feedback replaces annual reviews with structured, ongoing performance ratings, feedback history, anonymous mode, self-evaluations, proactive feedback requests, and 360-degree review support.",
        "AI-driven analytics surface performance trends and actionable insights, while MBTI personality integration gives managers visibility into team dynamics and collaboration patterns.",
        "Personalized learning paths are tailored per employee based on role, performance data, and goals, enabling targeted upskilling rather than generic company-wide training.",
      ],
      architectureNotes: [
        "A microservices platform built on NestJS and deployed on AWS, serving a React web app and a cross-platform mobile app via REST and WebSockets.",
        "A single API Gateway acts as the entry point for all client traffic, handling request routing, auth verification, and rate limiting centrally.",
        "Each domain runs as an independent NestJS service: Auth, Feedback/Performance, Productivity/Attendance, Gamification/Engagement, Notifications, and Analytics.",
        "Each service owns its own PostgreSQL database, keeping data concerns isolated by domain, with schemas optimized for both read-heavy analytics and write-heavy feedback collection.",
        "The Notifications service uses WebSockets to push live updates to clients, enabling instant feedback alerts, leaderboard changes, and challenge completions without polling.",
      ],
      stack: ["React", "NestJS", "PostgreSQL", "AWS"],
      domains: [
        "HR Tech",
        "B2B SaaS",
        "Enterprise Software",
        "Employee Performance Management",
        "Gamification",
        "Productivity Tracking",
        "Continuous Feedback",
        "Team Analytics",
        "Leave Management",
      ],
      contribution: [
        "Designed and implemented RESTful APIs and NestJS microservices on AWS across several feature domains.",
        "Built real-time notification pipelines using WebSockets.",
        "Designed PostgreSQL schemas across multiple service domains, optimized for read-heavy analytics and write-heavy feedback collection.",
        "Built out the full React UI across all major feature areas.",
        "Owned features end-to-end from database schema through API to rendered UI.",
      ],
    },
  ],
  certifications: [],
  socialLinks: {
    twitter: "",
    instagram: "",
    medium: "",
    stackoverflow: "",
  },
  service: [
    {
      title: "Development",
      bullets: [
        "Frontend app development",
        "Backend app development",
        "Custom dashboards, admin panels, and internal tools",
        "Data pipelines and reporting systems",
        "SEO-focused SSR web apps",
        "Embedded and system integration",
      ],
    },
    {
      title: "System Design",
      bullets: [
        "System design and architecture",
        "AI and LLM integrations",
        "Legacy to modern stack migrations",
        "Performance optimization and refactoring",
        "Architecture and scalability reviews",
      ],
    },
    {
      title: "Technical Consulting",
      bullets: [
        "Technical roadmap planning",
        "Codebase audits",
        "Feature feasibility and technical estimation",
        "Engineering process setup and CI/CD workflows",
        "Recruitment and interview support for dev teams",
        "Technical support for investors and customer-facing liaison",
      ],
    },
    {
      title: "Documentation & Mentoring",
      bullets: [
        "Technical and architecture documentation",
        "API documentation and developer onboarding",
        "Engineering coaching and technical tutoring",
        "Debugging and production issue resolution",
      ],
    },
  ],
};

export default portFolioData;
