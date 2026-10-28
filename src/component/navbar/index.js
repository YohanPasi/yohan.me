import React, { useState } from "react";
import styled from "styled-components";
import {
  FiGithub,
  FiPlay,
  FiGitBranch,
  FiChevronDown,
  FiMail,
} from "react-icons/fi";
import { Bio } from "../../data/constants";
import { fonts, ui } from "../../utils/palette";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border-bottom: 1px solid ${ui.border};
  font-family: ${fonts.sans};
  color: ${ui.text};

  & * {
    font-family: inherit;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: ${ui.text};

  .badge {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: ${ui.dotnet};
    color: #fff;
    font-family: ${fonts.mono} !important;
    font-size: 11px;
    font-weight: 700;
    box-shadow: 0 2px 8px -2px rgba(81, 43, 212, 0.5);
  }

  .title {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .title strong {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .title small {
    font-family: ${fonts.mono} !important;
    font-size: 10px;
    color: ${ui.sub};
  }
`;

const SolutionPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 9px;
  border-radius: 6px;
  background: ${ui.side};
  border: 1px solid ${ui.border};
  font-family: ${fonts.mono} !important;
  font-size: 11px;
  color: ${ui.sub};

  span {
    color: ${ui.text};
    font-weight: 600;
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  border-radius: 8px;
  background: ${ui.hover};

  a {
    padding: 5px 11px;
    border-radius: 6px;
    font-size: 12.5px;
    font-weight: 500;
    color: ${ui.sub};
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  a:hover {
    color: ${ui.text};
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RunBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: ${ui.ok};
  font-family: ${fonts.mono} !important;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    fill: ${ui.ok};
    font-size: 12px;
  }

  &:hover {
    background: #dcfce7;
    border-color: #86efac;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px -3px rgba(26, 127, 55, 0.2);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const GitBranchTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 8px;
  border-radius: 6px;
  background: ${ui.side};
  border: 1px solid ${ui.border};
  font-family: ${fonts.mono} !important;
  font-size: 11px;
  color: ${ui.sub};

  svg {
    font-size: 12px;
  }

  @media (max-width: 780px) {
    display: none;
  }
`;

const IconBtn = styled.a`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 16px;
  color: ${ui.text};
  border: 1px solid ${ui.border};
  background: #fff;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${ui.hover};
    color: ${ui.dotnet};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const ContactCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 13px;
  border-radius: 6px;
  background: ${ui.dotnet};
  color: #fff;
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #4321b8;
    transform: translateY(-1px);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: none;
  position: relative;
  width: 34px;
  height: 34px;
  border: 1px solid ${ui.border};
  border-radius: 7px;
  background: #fff;
  cursor: pointer;

  span {
    position: absolute;
    left: 9px;
    right: 9px;
    height: 1.5px;
    background: ${ui.text};
    transition: transform 0.25s cubic-bezier(0.7, 0, 0.2, 1), top 0.25s ease;
  }

  span:first-child {
    top: ${({ $open }) => ($open ? "16px" : "12px")};
    transform: rotate(${({ $open }) => ($open ? "45deg" : "0")});
  }

  span:last-child {
    top: ${({ $open }) => ($open ? "16px" : "20px")};
    transform: rotate(${({ $open }) => ($open ? "-45deg" : "0")});
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const MobilePanel = styled.div`
  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 8px 16px 20px;
  background: #fff;
  border-bottom: 1px solid ${ui.border};
  box-shadow: 0 20px 40px -20px rgba(20, 20, 19, 0.25);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? "0" : "-10px")});
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.25s ease, transform 0.25s ease;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 4px;
    border-bottom: 1px solid ${ui.border};
    font-size: 15px;
    font-weight: 600;
    color: ${ui.text};
    text-decoration: none;
  }

  a small {
    font-family: ${fonts.mono} !important;
    font-size: 11px;
    color: ${ui.sub};
  }

  a.cta {
    justify-content: center;
    margin-top: 14px;
    border: 0;
    border-radius: 8px;
    background: ${ui.dotnet};
    color: #fff;
    font-size: 14px;
  }
`;

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleRun = () => {
    window.dispatchEvent(new CustomEvent("portfolio:run"));
  };

  return (
    <Bar>
      <Left>
        <Brand href="#about" aria-label="Yohan Pasindu, .NET Full-Stack Developer">
          <span className="badge" aria-hidden="true">C#</span>
          <div className="title">
            <strong>Yohan Pasindu</strong>
            <small>.NET &amp; Angular Full-Stack</small>
          </div>
        </Brand>

        <SolutionPill aria-hidden="true">
          <span>Portfolio.sln</span>
          <FiChevronDown />
        </SolutionPill>
      </Left>

      <NavLinks aria-label="Sections">
        {links.map((l) => (
          <a key={l.id} id={`nav-${l.id}`} href={`#${l.id}`}>
            {l.label}
          </a>
        ))}
      </NavLinks>

      <Right>
        <RunBtn
          id="nav-run-btn"
          type="button"
          onClick={handleRun}
          title="Launch Windows 11 Enterprise Cloud Workstation (VS Code & .NET 8)"
        >
          <FiPlay /> Start
        </RunBtn>

        <GitBranchTag aria-hidden="true">
          <FiGitBranch /> main
        </GitBranchTag>

        <IconBtn
          id="nav-github"
          href={Bio.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub Profile"
        >
          <FiGithub />
        </IconBtn>

        <ContactCta id="nav-contact-cta" href="#contact">
          <FiMail /> Contact
        </ContactCta>

        <Burger
          id="nav-menu-toggle"
          type="button"
          $open={open}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
        </Burger>
      </Right>

      <MobilePanel $open={open}>
        {links.map((l, i) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
            <small>0{i + 1}</small>
            {l.label}
          </a>
        ))}
        <a
          href="#workstation"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            handleRun();
          }}
          style={{ color: "#10b981", fontWeight: 600 }}
        >
          <small>▶</small>
          Launch Cloud Workstation (Win 11)
        </a>
        <a href={Bio.github} target="_blank" rel="noopener noreferrer">
          <small>↗</small>
          GitHub Profile
        </a>
        <a className="cta" href="#contact" onClick={() => setOpen(false)}>
          Contact Me
        </a>
      </MobilePanel>
    </Bar>
  );
};

export default NavBar;
