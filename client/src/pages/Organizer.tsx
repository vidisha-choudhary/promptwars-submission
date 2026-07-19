import React from 'react';
import TelemetryPanel from '../components/TelemetryPanel';
import DecisionSupportPanel from '../components/DecisionSupportPanel';
import CopilotPanel from '../components/CopilotPanel';
import useCommandCenter from '../hooks/useCommandCenter';

export const Organizer: React.FC = () => {
  const {
    gates,
    incidents,
    sentiment,
    latestResponse,
    getTelemetryData,
    handleResponseReceived
  } = useCommandCenter();

  return (
    <div className="organizer-portal-layout fade-in">
      {/* 1. LEFT COLUMN: Live Operational Telemetry (What is happening?) */}
      <TelemetryPanel 
        gates={gates} 
        incidents={incidents} 
        sentiment={sentiment} 
      />

      {/* 2. CENTER COLUMN: AI Decision Support (Reasoning Chain & Traceability) */}
      <DecisionSupportPanel 
        latestResponse={latestResponse}
        gates={gates}
        incidents={incidents}
      />

      {/* 3. RIGHT COLUMN: AI Copilot Assistant (Interactive Simulator Controls) */}
      <div className="copilot-side-pane">
        <CopilotPanel 
          getTelemetryData={getTelemetryData}
          onResponseReceived={handleResponseReceived}
        />
      </div>
    </div>
  );
};

export default Organizer;
