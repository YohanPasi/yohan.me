import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTarget,
  FiCompass,
  FiClock,
  FiMessageSquare,
  FiAward,
} from "react-icons/fi";
import { palette as p, fonts, ui } from "../../utils/palette";

/* ------------------------------------------------------------------ */
/*  Soft Skills — Concise, Punchy, High-Impact Data                   */
/* ------------------------------------------------------------------ */
const SOFT_SKILLS = [
  {
    id: "teamwork",
    index: "01",
    name: "Teamwork & Collaboration",
    accent: "#00B4D8",
    icon: FiUsers,
    summary: "Active sprint collaboration, constructive peer reviews, and cross-functional team alignment.",
    tags: ["Agile / Scrum", "Code Reviews", "Pair Programming"],
  },
  {
    id: "problem-solving",
    index: "02",
    name: "Problem Solving",
    accent: "#512BD4",
    icon: FiTarget,
    summary: "Root-cause debugging, structured isolation, and clean, resilient architectural solutions.",
    tags: ["Root-Cause First", "Clean Logic", "Debugging"],
  },
  {
    id: "adaptability",
    index: "03",
    name: "Adaptability & Fast Learning",
    accent: "#10B981",
    icon: FiCompass,
    summary: "Rapid ramp-up across new programming languages, frameworks, and evolving product workflows.",
    tags: ["Fast Onboarding", "Polyglot", "Continuous Growth"],
  },
  {
    id: "time-management",
    index: "04",
    name: "Time Management & Delivery",
    accent: "#F59E0B",
    icon: FiClock,
    summary: "Accurate task estimation, milestone tracking, and dependable on-time feature delivery.",
    tags: ["Sprint Planning", "Milestones", "Prioritization"],
  },
  {
    id: "communication",
    index: "05",
    name: "Technical Communication",
    accent: "#6366F1",
    icon: FiMessageSquare,
    summary: "Clear technical specs, concise pull request context, API contracts, and stakeholder demos.",
    tags: ["API Contracts", "Documentation", "Stakeholder Demos"],
  },
  {
    id: "leadership",
    index: "06",
    name: "Ownership & Leadership",
    accent: "#EC4899",
    icon: FiAward,
    summary: "End-to-end feature accountability, high code quality standards, and proactive peer mentoring.",
    tags: ["End-to-End Ownership", "Code Quality", "Mentorship"],
  },
];

/* ------------------------------------------------------------------ */
/*  Styled Components — Aligned with Technical Skills & Hero Section  */
/* ------------------------------------------------------------------ */
const Section = styled.section`
  position: relative;
  background: ${ui.editor};
  color: ${ui.text};
  font-family: ${fonts.sans};
  padding: 56px 24px 80px;
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
    max-width: 600px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border: 1px solid ${ui.border};
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(20, 20, 19, 0.02);
  position: relative;
  overflow: hidden;
  transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);

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

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      display: grid;
      place-items: center;
      color: ${({ $accent }) => $accent || ui.dotnet};
      transition: all 0.16s ease;
    }

    .index {
      font-family: ${fonts.mono} !important;
      font-size: 11px;
      font-weight: 600;
      color: ${ui.sub};
      background: ${ui.side};
      border: 1px solid ${ui.border};
      padding: 2px 7px;
      border-radius: 4px;
    }
  }

  &:hover .icon-wrap {
    background: ${({ $accent }) => $accent};
    color: #ffffff;
    border-color: transparent;
  }

  .card-body {
    flex: 1;

    h3 {
      margin: 0 0 6px;
      font-size: 15px;
      font-weight: 700;
      color: ${p.ink};
      letter-spacing: -0.01em;
    }

    p {
      margin: 0 0 12px;
      font-size: 13px;
      line-height: 1.5;
      color: ${ui.sub};
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-top: 10px;
    border-top: 1px dashed ${ui.border};

    span {
      font-family: ${fonts.mono} !important;
      font-size: 10.5px;
      padding: 2px 6px;
      border-radius: 4px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      color: ${ui.text};
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
const SoftSkills = () => {
  return (
    <Section id="soft-skills">
      <Container>
        {/* Breadcrumb line */}
        <Breadcrumbs>
          <div className="path">
            <span>Portfolio.sln</span>
            <span>Competencies</span>
            <span>
              <b>Soft Skills</b>
            </span>
          </div>
          <span className="status">
            <i /> 6 Practices
          </span>
        </Breadcrumbs>

        {/* Section Header */}
        <SectionHeader>
          <div className="label">{"// interpersonal competencies"}</div>
          <h2>
            Soft <span className="accent">Skills</span>
          </h2>
          <p>
            Collaboration, communication, and engineering practices developed through agile teamwork and software delivery.
          </p>
        </SectionHeader>

        {/* Skills Grid */}
        <Grid>
          {SOFT_SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.id}
                $accent={skill.accent}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.16, delay: index * 0.03 }}
              >
                <div>
                  <div className="card-top">
                    <div className="icon-wrap">
                      <Icon size={18} />
                    </div>
                    <span className="index">{skill.index}</span>
                  </div>

                  <div className="card-body">
                    <h3>{skill.name}</h3>
                    <p>{skill.summary}</p>
                  </div>
                </div>

                <div className="tags">
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default SoftSkills;
