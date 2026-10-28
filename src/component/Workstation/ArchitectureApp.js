import React, { useState } from "react";
import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscClose,
} from "react-icons/vsc";
import { FiLayers, FiShield, FiCheckCircle } from "react-icons/fi";
import { fonts } from "../../utils/palette";

const ArchFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #14171d;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  border-radius: ${(props) => (props.$isMaximized ? "0" : "8px")};
  box-shadow: ${(props) =>
    props.$isMaximized ? "none" : "0 20px 60px rgba(0, 0, 0, 0.75)"};
  border: ${(props) =>
    props.$isMaximized ? "none" : "1px solid rgba(255, 255, 255, 0.12)"};
`;

const TitleBar = styled.div`
  height: 34px;
  background: #1f232a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  user-select: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    color: #e2e8f0;

    .icon {
      color: #38bdf8;
      font-size: 14px;
    }
  }

  .window-controls {
    display: flex;
    align-items: center;
    height: 100%;

    button {
      background: transparent;
      border: none;
      color: #9da5b4;
      width: 38px;
      height: 100%;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 13px;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }

      &.close:hover {
        background: #e81123;
        color: #ffffff;
      }
    }
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 340px;
  overflow: hidden;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

const DiagramCanvas = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #1b2029 0%, #101217 100%);
  position: relative;
  overflow: auto;

  .layers-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 440px;
  }
`;

const LayerCard = styled.div`
  padding: 14px 18px;
  border-radius: 8px;
  background: ${(props) =>
    props.$active ? "rgba(81, 43, 212, 0.25)" : "rgba(255, 255, 255, 0.04)"};
  border: 1px solid
    ${(props) => (props.$active ? "#512bd4" : "rgba(255, 255, 255, 0.1)")};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active ? "0 4px 20px rgba(81, 43, 212, 0.3)" : "none"};

  &:hover {
    border-color: #512bd4;
    background: rgba(81, 43, 212, 0.15);
    transform: translateX(4px);
  }

  .layer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 13px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span.badge {
      font-size: 10.5px;
      padding: 2px 8px;
      border-radius: 4px;
      background: ${(props) => props.$badgeBg || "rgba(255, 255, 255, 0.1)"};
      color: ${(props) => props.$badgeColor || "#cbd5e1"};
      font-family: ${fonts.mono};
      font-weight: 600;
    }
  }

  p.desc {
    font-size: 11.5px;
    color: #94a3b8;
    margin: 6px 0 0;
  }
`;

const DetailsSidebar = styled.div`
  background: #181b22;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .meta-tag {
    font-size: 11px;
    color: #a855f7;
    font-family: ${fonts.mono};
  }

  .detail-section {
    font-size: 12px;
    line-height: 1.6;
    color: #cbd5e1;

    strong {
      color: #ffffff;
    }

    ul {
      margin: 8px 0 0;
      padding-left: 16px;
      li {
        margin-bottom: 6px;
        color: #94a3b8;
      }
    }
  }
`;

const layersData = [
  {
    id: "domain",
    name: "01. Domain Layer (Core)",
    badge: "Zero Dependencies",
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeColor: "#34d399",
    desc: "Enterprise Entities, Aggregate Roots, Value Objects, Domain Events & Enums.",
    details:
      "The absolute heart of Yohan's software architecture. Encapsulates pure business logic with no reliance on external packages, UI frameworks, or database providers.",
    components: [
      "User & Project Aggregate Roots",
      "Domain Rules & Invariants",
      "Domain Events for decoupled communication",
      "Strongly-typed IDs & Value Objects",
    ],
  },
  {
    id: "application",
    name: "02. Application Layer",
    badge: "CQRS / MediatR",
    badgeBg: "rgba(56, 189, 248, 0.15)",
    badgeColor: "#38bdf8",
    desc: "Commands, Queries, DTOs, FluentValidation pipelines, and Service Interfaces.",
    details:
      "Orchestrates business workflows using CQRS (Command Query Responsibility Segregation). Every request is processed via pipeline behaviors (validation, logging, performance monitoring).",
    components: [
      "MediatR Command & Query Handlers",
      "FluentValidation Pipeline Behaviors",
      "AutoMapper / Mapster DTO mappings",
      "Repository & UnitOfWork abstractions",
    ],
  },
  {
    id: "infrastructure",
    name: "03. Infrastructure Layer",
    badge: "EF Core & SQL Server",
    badgeBg: "rgba(168, 85, 247, 0.15)",
    badgeColor: "#c084fc",
    desc: "Entity Framework Core, SQL Server migrations, Redis cache, JWT authentication.",
    details:
      "Concrete technical implementations of interfaces defined in Application. Connects to Microsoft SQL Server with Code-First migrations and provides caching and security providers.",
    components: [
      "ApplicationDbContext & Fluent API configurations",
      "Redis Distributed Caching implementation",
      "JWT Token Provider & Refresh Token rotation",
      "SendGrid / SMTP Email notifications",
    ],
  },
  {
    id: "presentation",
    name: "04. Web API & Angular Client",
    badge: "ASP.NET Core + Angular 17",
    badgeBg: "rgba(239, 68, 68, 0.15)",
    badgeColor: "#f87171",
    desc: "RESTful HTTP endpoints, OpenAPI Swagger docs, Angular Standalone Signals frontend.",
    details:
      "The consumer layer exposing high-performance HTTP endpoints. Controllers are thin, merely delegating calls to MediatR and returning standard HTTP status codes.",
    components: [
      "ASP.NET Core Web API Controllers",
      "Global Exception Handling Middleware",
      "Swagger / OpenAPI 3.0 documentation",
      "Angular 17 Standalone client with Signals",
    ],
  },
];

const ArchitectureApp = ({
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
}) => {
  const [selectedLayer, setSelectedLayer] = useState(layersData[0]);

  return (
    <ArchFrame $isMaximized={isMaximized}>
      <TitleBar
        className="window-titlebar"
        data-titlebar="true"
        style={{ cursor: isMaximized ? "default" : "grab" }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onToggleMaximize();
        }}
      >
        <div className="title">
          <FiLayers className="icon" />
          <span>
            CleanArchitecture_Specification.drawio — Architecture Viewer
          </span>
        </div>
        <div className="window-controls">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize"
          >
            <VscChromeMinimize />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            title={isMaximized ? "Restore Down" : "Maximize"}
          >
            <VscChromeMaximize />
          </button>
          <button
            type="button"
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
          >
            <VscClose />
          </button>
        </div>
      </TitleBar>

      <ContentArea>
        <DiagramCanvas>
          <div className="layers-stack">
            {layersData.map((layer) => (
              <LayerCard
                key={layer.id}
                $active={selectedLayer.id === layer.id}
                $badgeBg={layer.badgeBg}
                $badgeColor={layer.badgeColor}
                onClick={() => setSelectedLayer(layer)}
              >
                <div className="layer-top">
                  <strong>
                    <FiShield /> {layer.name}
                  </strong>
                  <span className="badge">{layer.badge}</span>
                </div>
                <p className="desc">{layer.desc}</p>
              </LayerCard>
            ))}
          </div>
        </DiagramCanvas>

        <DetailsSidebar>
          <div>
            <h3>
              <FiCheckCircle style={{ color: "#10b981" }} />{" "}
              {selectedLayer.name}
            </h3>
            <div className="meta-tag">{selectedLayer.badge}</div>
          </div>

          <div className="detail-section">
            <p>{selectedLayer.details}</p>
          </div>

          <div className="detail-section">
            <strong>Key Building Blocks:</strong>
            <ul>
              {selectedLayer.components.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </DetailsSidebar>
      </ContentArea>
    </ArchFrame>
  );
};

export default ArchitectureApp;
