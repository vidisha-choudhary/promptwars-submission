import React, { useState } from 'react';
import TelemetryPanel from '../components/TelemetryPanel';
import DecisionSupportPanel from '../components/DecisionSupportPanel';
import CopilotPanel from '../components/CopilotPanel';
import { initialGates, initialIncidents, initialSentiment } from '../data/mockData';
import { GateTelemetry, Incident, SentimentMetrics, CopilotResponse } from '../types/copilot.types';

export const Organizer: React.FC = () => {
  // Real-time telemetry states
  const [gates] = useState<GateTelemetry[]>(initialGates);
  const [incidents] = useState<Incident[]>(initialIncidents);
  const [sentiment] = useState<SentimentMetrics>(initialSentiment);

  // Latest AI reasoning response received from the Copilot Panel
  const [latestResponse, setLatestResponse] = useState<CopilotResponse | null>(null);

  // Telemetry getter passed to Copilot
  const getTelemetryData = () => {
    return {
      gates,
      incidents,
      sentiment
    };
  };

  // Handler to receive AI response from the Copilot Panel
  const handleResponseReceived = (response: CopilotResponse) => {
    setLatestResponse(response);
  };

  return (
    <div className="organizer-portal-layout fade-in" style={{ padding: '0 var(--spacing-sm) var(--spacing-lg) var(--spacing-sm)' }}>
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
