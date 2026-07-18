export interface Incident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  status: 'reported' | 'investigating' | 'resolved';
  timestamp: string;
}

export interface GateTelemetry {
  id: string;
  name: string;
  queueLength: number;
  waitTimeMinutes: number;
  flowRatePerMin: number;
  status: 'active' | 'inactive' | 'restricted';
}

export interface SentimentMetrics {
  averageScore: number;
  positiveCount: number;
  negativeCount: number;
  keyThemes: string[];
}

export type SimulatedScenario = 'none' | 'gate_closure' | 'heavy_rain' | 'medical_emergency' | 'vip_arrival';

export type AnnouncementLanguage = 'english' | 'hindi' | 'spanish';

export interface TelemetryData {
  gates: GateTelemetry[];
  incidents: Incident[];
  sentiment: SentimentMetrics;
}

export interface CopilotRequest {
  telemetry: TelemetryData;
  scenario: SimulatedScenario;
  targetLanguage: AnnouncementLanguage;
  userMessage?: string;
}

export interface PredictionInsight {
  prediction: string;
  reasoning: string;
  recommendation: string;
  confidence: number;
}

export interface RedirectionPlan {
  sourceGateId: string;
  targetGateId: string;
  reason: string;
  recommendation: string;
}

export interface EmergencyAnnouncement {
  language: AnnouncementLanguage;
  text: string;
}

export interface SimulationImpact {
  scenario: SimulatedScenario;
  prediction: string;
  reasoning: string;
  recommendation: string;
  confidence: number;
}

export interface CopilotResponse {
  success: boolean;
  predictions: PredictionInsight[];
  redirectionPlan?: RedirectionPlan;
  emergencyAnnouncements?: EmergencyAnnouncement;
  simulationImpact?: SimulationImpact;
}
