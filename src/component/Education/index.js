import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookOpen,
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiLayers,
  FiCpu,
  FiDatabase,
  FiSmartphone,
  FiCloud,
  FiChevronRight,
  FiCompass,
} from "react-icons/fi";
import { palette as p, fonts, ui } from "../../utils/palette";

/* ------------------------------------------------------------------ */
/*  Academic Data                                                     */
/* ------------------------------------------------------------------ */
const ACADEMIC_TRACK = [
  { year: "Year 1", label: "Foundations", status: "completed", desc: "Algorithms, OOP, Web Basics" },
  { year: "Year 2", label: "Core Systems", status: "completed", desc: "Data Structures, Database Systems, Networks" },
  { year: "Year 3", label: "Enterprise & Mobile", status: "completed", desc: "Full-Stack Dev, Mobile Apps, Cloud Services" },
  { year: "Year 4", label: "Final Year (2nd Sem)", status: "active", desc: "Enterprise Architecture, Distributed Systems, Capstone" },
];

const SPECIALIZATION_PILLARS = [
  {
    icon: FiCpu,
    accent: "#512BD4",
    title: "Enterprise Software Engineering",
    desc: "C#, ASP.NET Core Web APIs, object-oriented software architecture, and design patterns.",
  },
  {
    icon: FiSmartphone,
    accent: "#00B4D8",
    title: "Web & Mobile Applications",
    desc: "Single-page responsive web applications (Angular, React) and native Android development.",
  },
  {
    icon: FiDatabase,
    accent: "#10B981",
    title: "Database Systems & Storage",
    desc: "Relational database modeling with Microsoft SQL Server, MySQL, and NoSQL document stores (MongoDB).",
  },
  {
    icon: FiCloud,
    accent: "#F59E0B",
    title: "Cloud Services & Modern Tooling",
    desc: "Cloud hosting on Microsoft Azure, containerized deployments with Docker, and workflow automation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Styled Components — Prestigious Academic Canvas                   */
/* ------------------------------------------------------------------ */
const Section = styled.section`
  position: relative;
  background: ${ui.side};
  color: ${ui.text};
  font-family: ${fonts.sans};
  padding: 68px 24px 96px;
  border-top: 1px solid ${ui.border};
  overflow: hidden;

  /* Ambient soft background lighting */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 380px;
    background: radial-gradient(ellipse at top, rgba(81, 43, 212, 0.06) 0%, rgba(0, 180, 216, 0.03) 40%, transparent 70%);
    pointer-events: none;
  }

  & * {
    font-family: inherit;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  margin-bottom: 22px;
  border-radius: 8px;
  background: #ffffff;
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
      box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
    }
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 34px;

  .label {
    font-family: ${fonts.mono} !important;
    font-size: 13px;
    color: #6a8a5a;
    margin-bottom: 6px;
  }

  h2 {
    margin: 0 0 8px;
    font-size: clamp(28px, 4vw, 42px);
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
    max-width: 620px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Featured Degree Card (SLIIT Showcase)                             */
/* ------------------------------------------------------------------ */
const FeaturedDegreeCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid ${ui.border};
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(20, 20, 19, 0.03);
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${ui.dotnet} 0%, #00b4d8 100%);
  }

  &:hover {
    border-color: ${ui.dotnet};
    box-shadow: 0 12px 32px -8px rgba(81, 43, 212, 0.1);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DegreeHero = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 22px;
  border-bottom: 1px solid ${ui.border};

  .crest-and-title {
    display: flex;
    align-items: center;
    gap: 16px;

    .crest {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      display: grid;
      place-items: center;
      flex-shrink: 0;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      h3 {
        margin: 0 0 4px;
        font-size: 21px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: ${p.ink};

        @media (max-width: 640px) {
          font-size: 18px;
        }
      }

      .inst-name {
        font-size: 14px;
        font-weight: 600;
        color: ${ui.dotnet};
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .location {
        font-size: 12.5px;
        color: ${ui.sub};
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 3px;
      }
    }
  }

  .badges {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;

    @media (max-width: 768px) {
      align-items: flex-start;
      width: 100%;
    }

    .active-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: ${fonts.mono} !important;
      font-size: 12px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 6px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: ${ui.ok};

      i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${ui.ok};
        box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
      }
    }

    .date-badge {
      font-family: ${fonts.mono} !important;
      font-size: 12px;
      color: ${ui.sub};
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  4-Year Progression Ribbon                                         */
/* ------------------------------------------------------------------ */
const TrackRibbon = styled.div`
  margin: 22px 0;
  padding: 16px;
  background: ${ui.side};
  border: 1px solid ${ui.border};
  border-radius: 10px;

  .track-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${fonts.mono} !important;
    font-size: 11px;
    font-weight: 600;
    color: ${ui.sub};
    margin-bottom: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;

    span.live {
      color: ${ui.dotnet};
      font-weight: 700;
    }
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .step-node {
    background: #ffffff;
    border: 1px solid ${ui.border};
    border-radius: 6px;
    padding: 10px 12px;
    position: relative;
    transition: all 0.16s ease;

    &.completed {
      border-color: #d1fae5;
      background: #fcfdfd;

      .year-name {
        color: ${p.ink};
      }
      .badge-check {
        color: ${ui.ok};
      }
    }

    &.active {
      border-color: ${ui.dotnet};
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(81, 43, 212, 0.12);

      .year-name {
        color: ${ui.dotnet};
        font-weight: 700;
      }
      .badge-check {
        color: ${ui.dotnet};
      }
    }

    .node-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3px;

      .year-name {
        font-family: ${fonts.mono} !important;
        font-size: 11.5px;
        font-weight: 600;
      }
    }

    .node-desc {
      font-size: 11px;
      color: ${ui.sub};
      line-height: 1.35;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Specialization Pillars Grid                                       */
/* ------------------------------------------------------------------ */
const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pillar-box {
    background: #ffffff;
    border: 1px solid ${ui.border};
    border-radius: 8px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: all 0.16s ease;

    &:hover {
      border-color: ${({ $accent }) => $accent || ui.dotnet};
      transform: translateY(-1px);
    }

    .pillar-icon {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      display: grid;
      place-items: center;
      flex-shrink: 0;
      color: ${({ $accent }) => $accent || ui.dotnet};
    }

    .pillar-text {
      h4 {
        margin: 0 0 3px;
        font-size: 13.5px;
        font-weight: 700;
        color: ${p.ink};
      }

      p {
        margin: 0;
        font-size: 12px;
        line-height: 1.45;
        color: ${ui.sub};
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Secondary School Card (Dharmaloka College)                        */
/* ------------------------------------------------------------------ */
const SecondaryCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid ${ui.border};
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(20, 20, 19, 0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #00b4d8;
    opacity: 0;
    transition: opacity 0.18s ease;
  }

  &:hover {
    border-color: #00b4d8;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -4px rgba(0, 180, 216, 0.09);

    &::before {
      opacity: 1;
    }
  }

  .left-group {
    display: flex;
    align-items: center;
    gap: 14px;

    .crest {
      width: 46px;
      height: 46px;
      border-radius: 10px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      display: grid;
      place-items: center;
      flex-shrink: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .text {
      h3 {
        margin: 0 0 3px;
        font-size: 16px;
        font-weight: 700;
        color: ${p.ink};
      }

      .cred {
        font-size: 13.5px;
        font-weight: 600;
        color: #00b4d8;
      }

      .stream {
        font-size: 12px;
        color: ${ui.sub};
        margin-top: 2px;
      }
    }
  }

  .right-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    .date-pill {
      font-family: ${fonts.mono} !important;
      font-size: 11.5px;
      padding: 4px 10px;
      border-radius: 5px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      color: ${ui.sub};
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .done-pill {
      font-family: ${fonts.mono} !important;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: 5px;
      background: ${ui.side};
      border: 1px solid ${ui.border};
      color: ${ui.sub};
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
const Education = () => {
  return (
    <Section id="education">
      <Container>
        {/* Breadcrumb line */}
        <Breadcrumbs>
          <div className="path">
            <span>Portfolio.sln</span>
            <span>Background</span>
            <span>
              <b>Academic Credentials & Milestones</b>
            </span>
          </div>
          <span className="status">
            <i /> 4th Year (2nd Sem) Active
          </span>
        </Breadcrumbs>

        {/* Section Header */}
        <SectionHeader>
          <div className="label">{"// academic foundation & degree track"}</div>
          <h2>
            Academic <span className="accent">Education</span>
          </h2>
          <p>
            Higher education in Information Technology and computer systems, backed by strong analytical and commerce foundations.
          </p>
        </SectionHeader>

        {/* 1. SLIIT Featured Degree Showcase */}
        <FeaturedDegreeCard
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.22 }}
        >
          <DegreeHero>
            <div className="crest-and-title">
              <div className="crest">
                <img
                  src="https://res.cloudinary.com/dyxpeyv1n/image/upload/v1734118132/portfolio/xmulkp6h6l1vshmx8g5b.png"
                  alt="SLIIT Crest"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              <div className="info">
                <h3>Bachelor of Science (Hons) in Information Technology</h3>
                <div className="inst-name">
                  Sri Lanka Institute of Information Technology (SLIIT)
                </div>
                <div className="location">
                  <FiMapPin size={12} />
                  Faculty of Computing · Malabe, Sri Lanka
                </div>
              </div>
            </div>

            <div className="badges">
              <span className="active-badge">
                <i /> 4th Year (2nd Sem) · Final Year
              </span>
              <span className="date-badge">
                <FiCalendar size={13} />
                Jun 2022 — Dec 2026 (Expected)
              </span>
            </div>
          </DegreeHero>

          {/* 4-Year Academic Progression Ribbon */}
          <TrackRibbon>
            <div className="track-label">
              <span>Degree Progression</span>
              <span className="live">Semester 8 of 8 (Final Semester)</span>
            </div>

            <div className="steps-grid">
              {ACADEMIC_TRACK.map((step) => (
                <div
                  key={step.year}
                  className={`step-node ${step.status}`}
                >
                  <div className="node-top">
                    <span className="year-name">{step.year}</span>
                    <span className="badge-check">
                      {step.status === "completed" ? (
                        <FiCheckCircle size={13} />
                      ) : (
                        <FiCompass size={13} />
                      )}
                    </span>
                  </div>
                  <div className="node-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </TrackRibbon>

          {/* Core Specialization Pillars */}
          <PillarsGrid>
            {SPECIALIZATION_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  className="pillar-box"
                  key={pillar.title}
                  $accent={pillar.accent}
                >
                  <div className="pillar-icon">
                    <Icon size={16} />
                  </div>
                  <div className="pillar-text">
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </PillarsGrid>
        </FeaturedDegreeCard>

        {/* 2. Secondary Education Card */}
        <SecondaryCard
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.22, delay: 0.08 }}
        >
          <div className="left-group">
            <div className="crest">
              <img
                src="https://res.cloudinary.com/dyxpeyv1n/image/upload/v1734118132/portfolio/m4mwxjfp5j1r9oxggwa9.jpg"
                alt="Dharmaloka College"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            <div className="text">
              <h3>R/Dharmaloka Navodya College</h3>
              <div className="cred">GCE Advanced Level (A/L)</div>
              <div className="stream">
                Stream: Commerce & Information Technology (IT, Accounting, Economics)
              </div>
            </div>
          </div>

          <div className="right-group">
            <span className="date-pill">
              <FiCalendar size={12} />
              Apr 2019 — Aug 2021
            </span>
            <span className="done-pill">
              <FiCheckCircle size={12} />
              Completed
            </span>
          </div>
        </SecondaryCard>
      </Container>
    </Section>
  );
};

export default Education;