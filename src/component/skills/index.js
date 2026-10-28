import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiCsharp,
  SiDotnet,
  SiAngular,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMicrosoftsqlserver,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiMicrosoftazure,
  SiDocker,
  SiGit,
  SiPostman,
  SiVisualstudio,
  SiAndroidstudio,
  SiPhp,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FiSearch, FiCode, FiServer, FiDatabase, FiCpu, FiMonitor } from "react-icons/fi";
import { palette as p, fonts, ui } from "../../utils/palette";

/* ------------------------------------------------------------------ */
/*  Custom Vector Brand Logos                                         */
/* ------------------------------------------------------------------ */
const N8NIcon = ({ size = 22, color = "#EA4B71" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="12" r="3.5" fill={color} />
    <circle cx="18" cy="7" r="3.5" fill={color} />
    <circle cx="18" cy="17" r="3.5" fill={color} />
    <path d="M9 11L15 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M9 13L15 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const VSCodeIcon = ({ size = 22, color = "#007ACC" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.5 1.5L8.5 8.5L3.5 4.5L1.5 5.5V18.5L3.5 19.5L8.5 15.5L17.5 22.5L22.5 20V4L17.5 1.5ZM17.5 17.5L10.5 12L17.5 6.5V17.5ZM4.5 15.5V8.5L7.5 11L4.5 15.5Z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Skill Categories (Separated: Frontend, Backend, DB, Automation, IDE) */
/* ------------------------------------------------------------------ */
const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    desc: "Interactive web applications, component architecture, and responsive styling",
    icon: FiCode,
    accent: "#00B4D8",
  },
  {
    id: "backend",
    label: "Backend",
    desc: "Server runtimes, REST APIs, business logic, and enterprise services",
    icon: FiServer,
    accent: "#512BD4",
  },
  {
    id: "database",
    label: "Database & Cloud",
    desc: "Document & relational storage, schemas, and cloud deployment infrastructure",
    icon: FiDatabase,
    accent: "#47A248",
  },
  {
    id: "automation",
    label: "Automation & Tools",
    desc: "Workflow automation, webhooks, containerization, and API verification",
    icon: FiCpu,
    accent: "#EA4B71",
  },
  {
    id: "ides",
    label: "IDEs & Environments",
    desc: "Integrated developer environments, debugging, and mobile SDKs",
    icon: FiMonitor,
    accent: "#007ACC",
  },
];

/* ------------------------------------------------------------------ */
/*  Categorized Technical Skills (Zero Versions · No Architecture)    */
/* ------------------------------------------------------------------ */
const SKILLS = [
  // --- FRONTEND ---
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    tag: "MERN Stack · Hooks & Context",
    accent: "#00B4D8",
    renderIcon: (s) => <SiReact size={s} color="#00B4D8" />,
  },
  {
    id: "angular",
    name: "Angular",
    category: "frontend",
    tag: "Reactive UI · Signals · Components",
    accent: "#DD0031",
    renderIcon: (s) => <SiAngular size={s} color="#DD0031" />,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    tag: "Strict Typing · Generics · Interfaces",
    accent: "#3178C6",
    renderIcon: (s) => <SiTypescript size={s} color="#3178C6" />,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    tag: "ES6+ · Asynchronous Logic · DOM",
    accent: "#D4A700",
    renderIcon: (s) => <SiJavascript size={s} color="#D4A700" />,
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "frontend",
    tag: "Responsive UI · Flexbox · CSS Grid",
    accent: "#E34F26",
    renderIcon: (s) => <SiHtml5 size={s} color="#E34F26" />,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    tag: "Utility-First Responsive Styling",
    accent: "#06B6D4",
    renderIcon: (s) => <SiTailwindcss size={s} color="#06B6D4" />,
  },

  // --- BACKEND ---
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    tag: "MERN Stack · Event-Driven Runtime",
    accent: "#339933",
    renderIcon: (s) => <SiNodedotjs size={s} color="#339933" />,
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    tag: "MERN Stack · RESTful Routing",
    accent: "#334155",
    renderIcon: (s) => <SiExpress size={s} color="#334155" />,
  },
  {
    id: "aspnet-core",
    name: "ASP.NET Core",
    category: "backend",
    tag: "Web APIs · Middleware · Security",
    accent: "#512BD4",
    renderIcon: (s) => <SiDotnet size={s} color="#512BD4" />,
  },
  {
    id: "csharp",
    name: "C#",
    category: "backend",
    tag: "OOP · LINQ · Asynchronous Tasks",
    accent: "#512BD4",
    renderIcon: (s) => <SiCsharp size={s} color="#512BD4" />,
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    tag: "Server-side Web Development",
    accent: "#777BB4",
    renderIcon: (s) => <SiPhp size={s} color="#777BB4" />,
  },
  {
    id: "java",
    name: "Java",
    category: "backend",
    tag: "Object-Oriented Programming",
    accent: "#E76F00",
    renderIcon: (s) => <FaJava size={s} color="#E76F00" />,
  },

  // --- DATABASE & CLOUD ---
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    tag: "MERN Stack · NoSQL Documents",
    accent: "#47A248",
    renderIcon: (s) => <SiMongodb size={s} color="#47A248" />,
  },
  {
    id: "sql-server",
    name: "Microsoft SQL Server",
    category: "database",
    tag: "T-SQL · Relational Schema & ACID",
    accent: "#CC2927",
    renderIcon: (s) => <SiMicrosoftsqlserver size={s} color="#CC2927" />,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    tag: "Relational Queries & Tables",
    accent: "#00758F",
    renderIcon: (s) => <SiMysql size={s} color="#00758F" />,
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "database",
    tag: "Cloud Firestore · Realtime Sync",
    accent: "#E5A700",
    renderIcon: (s) => <SiFirebase size={s} color="#E5A700" />,
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "database",
    tag: "Cloud Hosting & Services",
    accent: "#0078D4",
    renderIcon: (s) => <SiMicrosoftazure size={s} color="#0078D4" />,
  },

  // --- AUTOMATION & TOOLS ---
  {
    id: "n8n",
    name: "n8n",
    category: "automation",
    tag: "Workflow Automation & Webhooks",
    accent: "#EA4B71",
    renderIcon: (s) => <N8NIcon size={s} color="#EA4B71" />,
  },
  {
    id: "docker",
    name: "Docker",
    category: "automation",
    tag: "Containers & Deployment",
    accent: "#2496ED",
    renderIcon: (s) => <SiDocker size={s} color="#2496ED" />,
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "automation",
    tag: "Version Control & Collaboration",
    accent: "#F05032",
    renderIcon: (s) => <SiGit size={s} color="#F05032" />,
  },
  {
    id: "postman",
    name: "Postman",
    category: "automation",
    tag: "API Testing & Automation",
    accent: "#FF6C37",
    renderIcon: (s) => <SiPostman size={s} color="#FF6C37" />,
  },

  // --- IDES ---
  {
    id: "visual-studio",
    name: "Visual Studio",
    category: "ides",
    tag: "Enterprise .NET IDE & Debugging",
    accent: "#5C2D91",
    renderIcon: (s) => <SiVisualstudio size={s} color="#5C2D91" />,
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "ides",
    tag: "Full-Stack Development & Extensions",
    accent: "#007ACC",
    renderIcon: (s) => <VSCodeIcon size={s} color="#007ACC" />,
  },
  {
    id: "android-studio",
    name: "Android Studio",
    category: "ides",
    tag: "Android Mobile App Development",
    accent: "#3DDC84",
    renderIcon: (s) => <SiAndroidstudio size={s} color="#3DDC84" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Styled Components — Clean Editorial Canvas                        */
/* ------------------------------------------------------------------ */
const Section = styled.section`
  position: relative;
  background: ${ui.editor};
  color: ${ui.text};
  font-family: ${fonts.sans};
  padding: 56px 24px 84px;
  border-top: 1px solid ${ui.border};

  & * {
    font-family: inherit;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  margin-bottom: 22px;
  border-radius: 8px;
  background: ${ui.side};
  border: 1px solid ${ui.border};
  font-family: ${fonts.mono} !important;
  font-size: 12px;
  color: ${ui.sub};

  .path {
    display: flex;
    align-items: center;
    gap: 7px;

    span + span::before {
      content: "›";
      margin-right: 7px;
      color: #c4c4bf;
    }

    b {
      color: ${ui.text};
      font-weight: 600;
    }
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: ${ui.ok};
    font-size: 11.5px;
    font-weight: 600;

    i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${ui.ok};
    }
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 28px;

  .label {
    font-family: ${fonts.mono} !important;
    font-size: 13px;
    color: #6a8a5a;
    margin-bottom: 6px;
  }

  h2 {
    margin: 0 0 8px;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${p.ink};

    .accent {
      color: ${ui.dotnet};
    }
  }

  p {
    margin: 0;
    font-size: 15px;
    color: ${ui.sub};
  }
`;

/* ------------------------------------------------------------------ */
/*  Category Filter Tabs & Clean Search                               */
/* ------------------------------------------------------------------ */
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  padding: 8px 12px;
  background: ${ui.side};
  border: 1px solid ${ui.border};
  border-radius: 10px;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  button {
    height: 32px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid ${({ $active }) => ($active ? ui.dotnet : "transparent")};
    background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
    color: ${({ $active }) => ($active ? ui.dotnet : ui.text)};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: ${({ $active }) => ($active ? "0 1px 4px rgba(0,0,0,0.06)" : "none")};
    transition: all 0.15s ease;

    &:hover {
      color: ${ui.dotnet};
      background: #ffffff;
    }
  }
`;

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 220px;

  svg {
    position: absolute;
    left: 10px;
    color: ${ui.sub};
    font-size: 13px;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 32px;
    padding: 0 12px 0 30px;
    border-radius: 6px;
    border: 1px solid ${ui.border};
    background: #ffffff;
    font-family: ${fonts.mono} !important;
    font-size: 12px;
    color: ${ui.text};
    outline: none;
    transition: all 0.15s ease;

    &:focus {
      border-color: ${ui.dotnet};
      box-shadow: 0 0 0 3px rgba(81, 43, 212, 0.08);
    }

    &::placeholder {
      color: #a1a19b;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

/* ------------------------------------------------------------------ */
/*  Category Group & Skills Grid                                      */
/* ------------------------------------------------------------------ */
const CategoryGroup = styled.div`
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px dashed ${ui.border};

  .cat-title {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      color: ${({ $accent }) => $accent || ui.dotnet};
    }

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: ${p.ink};
      letter-spacing: -0.01em;
    }

    .cat-desc {
      font-size: 13px;
      color: ${ui.sub};
      display: inline-block;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .cat-count {
    font-family: ${fonts.mono} !important;
    font-size: 11.5px;
    color: ${ui.sub};
    background: ${ui.side};
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid ${ui.border};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
`;

const SkillCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid ${ui.border};
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 13px;
  box-shadow: 0 1px 3px rgba(20, 20, 19, 0.02);
  transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ $accent }) => $accent || ui.dotnet};
    opacity: 0;
    transition: opacity 0.16s ease;
  }

  &:hover {
    border-color: ${({ $accent }) => $accent};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px -4px rgba(20, 20, 19, 0.08);

    &::before {
      opacity: 1;
    }
  }

  .icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: ${ui.side};
    border: 1px solid ${ui.border};
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .info {
    min-width: 0;
    flex: 1;

    strong {
      display: block;
      font-size: 13.5px;
      font-weight: 700;
      color: ${p.ink};
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span.tag {
      display: block;
      font-family: ${fonts.mono} !important;
      font-size: 11px;
      color: ${ui.sub};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }
  }
`;

const EmptyState = styled.div`
  padding: 48px 16px;
  text-align: center;
  color: ${ui.sub};
  font-family: ${fonts.mono};
  font-size: 13px;
  background: ${ui.side};
  border: 1px dashed ${ui.border};
  border-radius: 8px;
`;

/* ------------------------------------------------------------------ */
/*  Main Skills Component                                             */
/* ------------------------------------------------------------------ */
const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const tabOptions = useMemo(
    () => [{ id: "all", label: "All Categories" }, ...SKILL_CATEGORIES],
    []
  );

  const activeCategories = useMemo(() => {
    if (activeTab === "all") return SKILL_CATEGORIES;
    return SKILL_CATEGORIES.filter((c) => c.id === activeTab);
  }, [activeTab]);

  const query = search.trim().toLowerCase();

  const groupedSkills = useMemo(() => {
    const map = {};
    SKILL_CATEGORIES.forEach((cat) => {
      map[cat.id] = SKILLS.filter((s) => {
        if (s.category !== cat.id) return false;
        if (!query) return true;
        return (
          s.name.toLowerCase().includes(query) ||
          s.tag.toLowerCase().includes(query)
        );
      });
    });
    return map;
  }, [query]);

  const totalFilteredCount = useMemo(() => {
    let count = 0;
    activeCategories.forEach((cat) => {
      count += (groupedSkills[cat.id] || []).length;
    });
    return count;
  }, [activeCategories, groupedSkills]);

  return (
    <Section id="skills">
      <Container>
        {/* Breadcrumb line */}
        <Breadcrumbs>
          <div className="path">
            <span>Portfolio.sln</span>
            <span>Dependencies</span>
            <span>
              <b>Technical Skills</b>
            </span>
          </div>
          <span className="status">
            <i /> {SKILLS.length} Technologies
          </span>
        </Breadcrumbs>

        {/* Section Header */}
        <SectionHeader>
          <div className="label">{"// technical stack"}</div>
          <h2>
            Technical <span className="accent">Skills</span>
          </h2>
          <p>
            Frontend, backend, databases, workflow automation, and developer IDEs.
          </p>
        </SectionHeader>

        {/* Category Tabs & Search Bar */}
        <Controls>
          <Tabs>
            {tabOptions.map((cat) => (
              <button
                key={cat.id}
                type="button"
                $active={activeTab === cat.id}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </Tabs>

          <Search>
            <FiSearch />
            <input
              type="text"
              placeholder="Search technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
        </Controls>

        {/* Category Sections */}
        {totalFilteredCount === 0 ? (
          <EmptyState>
            No technologies match "{search}". Try searching for React, n8n, MongoDB, C#, or Azure.
          </EmptyState>
        ) : (
          activeCategories.map((cat) => {
            const list = groupedSkills[cat.id] || [];
            if (list.length === 0) return null;
            const Icon = cat.icon;

            return (
              <CategoryGroup key={cat.id}>
                <CategoryHeader $accent={cat.accent}>
                  <div className="cat-title">
                    <span className="icon-pill">
                      <Icon size={14} />
                    </span>
                    <h3>{cat.label}</h3>
                    <span className="cat-desc">— {cat.desc}</span>
                  </div>
                  <span className="cat-count">{list.length}</span>
                </CategoryHeader>

                <SkillsGrid>
                  <AnimatePresence>
                    {list.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        $accent={skill.accent}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.14 }}
                      >
                        <div className="icon-wrap">
                          {skill.renderIcon(20)}
                        </div>
                        <div className="info">
                          <strong>{skill.name}</strong>
                          <span className="tag">{skill.tag}</span>
                        </div>
                      </SkillCard>
                    ))}
                  </AnimatePresence>
                </SkillsGrid>
              </CategoryGroup>
            );
          })
        )}
      </Container>
    </Section>
  );
};

export default Skills;
