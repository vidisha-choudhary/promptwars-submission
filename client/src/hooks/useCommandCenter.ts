import { useState } from 'react';
import { GateTelemetry, Incident, SentimentMetrics, CopilotResponse } from '../types/copilot.types';
import { initialGates, initialIncidents, initialSentiment } from '../data/mockData';

export const useCommandCenter = () => {
  const [gates] = useState<GateTelemetry[]>(initialGates);
  const [incidents] = useState<Incident[]>(initialIncidents);
  const [sentiment] = useState<SentimentMetrics>(initialSentiment);
  const [latestResponse, setLatestResponse] = useState<CopilotResponse | null>(null);

  const getTelemetryData = () => {
    return {
      gates,
      incidents,
      sentiment
    };
  };

  const handleResponseReceived = (response: CopilotResponse) => {
    setLatestResponse(response);
  };

  return {
    gates,
    incidents,
    sentiment,
    latestResponse,
    getTelemetryData,
    handleResponseReceived
  };
};

export default useCommandCenter;
