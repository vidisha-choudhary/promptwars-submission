import { Incident, GateTelemetry, SentimentMetrics } from '../types/copilot.types';

export interface CampaignData {
  name: string;
  reach: string;
  conversions: string;
  status: 'Active' | 'Completed' | 'Pending';
}

export interface SponsorData {
  sponsor: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  adImpressions: string;
  activationRate: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number; // in thousands of USD
}

export interface MatchAttendance {
  match: string;
  attendance: number;
  capacity: number;
}

export const initialGates: GateTelemetry[] = [
  { id: 'G1', name: 'North Gate A', queueLength: 145, waitTimeMinutes: 42, flowRatePerMin: 12, status: 'active' },
  { id: 'G2', name: 'North Gate B', queueLength: 35, waitTimeMinutes: 12, flowRatePerMin: 18, status: 'active' },
  { id: 'G3', name: 'East Gate C', queueLength: 18, waitTimeMinutes: 5, flowRatePerMin: 22, status: 'active' },
  { id: 'G4', name: 'South Gate D', queueLength: 210, waitTimeMinutes: 58, flowRatePerMin: 8, status: 'restricted' },
  { id: 'G5', name: 'West Gate E', queueLength: 12, waitTimeMinutes: 3, flowRatePerMin: 25, status: 'active' },
];

export const initialIncidents: Incident[] = [
  { id: 'I1', title: 'Turnstile Scanner Offline (Gate D)', severity: 'high', location: 'South Gate D', status: 'investigating', timestamp: '13:10:00' },
  { id: 'I2', title: 'Suspicious Backpack zones (Concourse C)', severity: 'critical', location: 'East Concourse', status: 'reported', timestamp: '13:22:00' },
  { id: 'I3', title: 'Minor Medical Help Request (Block F)', severity: 'low', location: 'Block F Row 12', status: 'resolved', timestamp: '12:45:00' },
  { id: 'I4', title: 'Restroom Water Leakage', severity: 'medium', location: 'West Concourse', status: 'reported', timestamp: '13:05:00' },
];

export const initialSentiment: SentimentMetrics = {
  averageScore: 72,
  positiveCount: 420,
  negativeCount: 160,
  keyThemes: ['Slow Entry Gates', 'Clean Amenities', 'Great Atmosphere', 'Expensive Food'],
};

export const mockCampaigns: CampaignData[] = [
  { name: 'FIFA World Cup Final Early bird', reach: '2.4M', conversions: '89K', status: 'Active' },
  { name: 'Local Fan Food Court Promo', reach: '480K', conversions: '35K', status: 'Active' },
  { name: 'Sponsor Hospitality Suites', reach: '120K', conversions: '4.2K', status: 'Completed' },
  { name: 'Public Transport Route Advisor', reach: '1.2M', conversions: '450K', status: 'Active' },
];

export const mockSponsors: SponsorData[] = [
  { sponsor: 'Qatar Airways', tier: 'Platinum', adImpressions: '42.5M', activationRate: '94%' },
  { sponsor: 'Adidas', tier: 'Platinum', adImpressions: '38.2M', activationRate: '88%' },
  { sponsor: 'Coca-Cola', tier: 'Gold', adImpressions: '29.1M', activationRate: '91%' },
  { sponsor: 'Visa', tier: 'Platinum', adImpressions: '33.8M', activationRate: '95%' },
  { sponsor: 'Kia Motors', tier: 'Silver', adImpressions: '18.4M', activationRate: '82%' },
];

export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 450 },
  { month: 'Feb', revenue: 580 },
  { month: 'Mar', revenue: 720 },
  { month: 'Apr', revenue: 890 },
  { month: 'May', revenue: 1100 },
  { month: 'Jun', revenue: 1450 },
];

export const mockMatchAttendance: MatchAttendance[] = [
  { match: 'ARG vs FRA', attendance: 88966, capacity: 88966 },
  { match: 'BRA vs GER', attendance: 82400, capacity: 85000 },
  { match: 'ENG vs USA', attendance: 78500, capacity: 80000 },
  { match: 'ESP vs MAR', attendance: 65200, capacity: 68000 },
  { match: 'POR vs GHA', attendance: 61900, capacity: 62000 },
];
