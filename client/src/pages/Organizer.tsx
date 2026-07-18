import React, { useState } from 'react';
import CopilotPanel from '../components/CopilotPanel';
import { 
  initialGates, initialIncidents, initialSentiment, 
  mockCampaigns, mockSponsors, mockMonthlyRevenue, mockMatchAttendance 
} from '../data/mockData';
import { GateTelemetry, Incident, SentimentMetrics } from '../types/copilot.types';
import { 
  TrendingUp, Users, DollarSign, Target, Award, ShieldAlert, Thermometer
} from 'lucide-react';

export const Organizer: React.FC = () => {
  // Organizer states holding the local telemetry
  const [gates] = useState<GateTelemetry[]>(initialGates);
  const [incidents] = useState<Incident[]>(initialIncidents);
  const [sentiment] = useState<SentimentMetrics>(initialSentiment);

  // Lazy telemetry getter function for Copilot: Telemetry is ONLY fetched at trigger times
  const getTelemetryData = () => {
    return {
      gates,
      incidents,
      sentiment
    };
  };

  // Helper calculation
  const totalRevenue = mockMonthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <div className="organizer-portal-layout fade-in">
      {/* Left Pane: Main Organizer Dashboard */}
      <div className="main-dashboard-pane">
        <header className="dashboard-header-card glass-card">
          <div className="title-area">
            <span className="subtitle">EXECUTIVE MANAGEMENT</span>
            <h1 className="dashboard-title">Stadium Organizer Portal</h1>
          </div>
          <div className="system-sync-status">
            <span className="sync-dot"></span>
            <span>Real-time Dashboard Synced</span>
          </div>
        </header>

        {/* Executive Quick Stats Cards */}
        <section className="dashboard-kpi-grid">
          <div className="kpi-card glass-card">
            <div className="kpi-header">
              <Users className="kpi-icon text-indigo" />
              <span className="kpi-label">Average Match Attendance</span>
            </div>
            <div className="kpi-value">75,393</div>
            <p className="kpi-trend text-green">+4.2% since group stage</p>
          </div>

          <div className="kpi-card glass-card">
            <div className="kpi-header">
              <DollarSign className="kpi-icon text-teal" />
              <span className="kpi-label">Cumulative Portal Revenue</span>
            </div>
            <div className="kpi-value">${totalRevenue.toLocaleString()}K</div>
            <p className="kpi-trend text-green">&uarr; On track for targets</p>
          </div>

          <div className="kpi-card glass-card">
            <div className="kpi-header">
              <ShieldAlert className="kpi-icon text-orange" />
              <span className="kpi-label">Active Security Incidents</span>
            </div>
            <div className="kpi-value">{incidents.filter(i => i.status !== 'resolved').length}</div>
            <p className="kpi-trend text-orange">{incidents.filter(i => i.severity === 'critical').length} Critical alerts pending</p>
          </div>
        </section>

        {/* CSS-Only Charts Section */}
        <section className="charts-grid-layout">
          {/* Monthly Revenue Chart */}
          <div className="chart-card glass-card">
            <h2 className="chart-card-title"><TrendingUp size={16} className="inline-icon text-indigo" /> Monthly Ticket Revenue ($K)</h2>
            <div className="css-bar-chart-container">
              <div className="chart-bars-wrapper">
                {mockMonthlyRevenue.map((data, idx) => {
                  const percentHeight = Math.round((data.revenue / 1500) * 100);
                  return (
                    <div key={idx} className="chart-bar-col">
                      <div className="chart-bar-value">${data.revenue}K</div>
                      <div 
                        className="chart-bar-fill indigo-fill" 
                        style={{ height: `${percentHeight}%` }}
                      ></div>
                      <div className="chart-bar-label">{data.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Match Attendance Chart */}
          <div className="chart-card glass-card">
            <h2 className="chart-card-title"><Users size={16} className="inline-icon text-teal" /> Match Attendance & Capacity</h2>
            <div className="css-bar-chart-container">
              <div className="chart-bars-wrapper">
                {mockMatchAttendance.map((data, idx) => {
                  const percentHeight = Math.round((data.attendance / 90000) * 100);
                  return (
                    <div key={idx} className="chart-bar-col">
                      <div className="chart-bar-value">{Math.round(data.attendance / 100) / 10}K</div>
                      <div 
                        className="chart-bar-fill teal-fill" 
                        style={{ height: `${percentHeight}%` }}
                      ></div>
                      <div className="chart-bar-label truncate-text">{data.match}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Progress & Sentiment Row */}
        <section className="insights-row-grid">
          {/* Ticket Sales progress bar */}
          <div className="insight-item-card glass-card">
            <h2 className="insight-title"><Target size={16} className="inline-icon text-indigo" /> Cumulative Ticket Sales Progress</h2>
            <div className="progress-details">
              <div className="progress-text-row">
                <span className="value-label">VIP Suites (98% Sold)</span>
                <span className="value-percent">4,900 / 5,000</span>
              </div>
              <div className="custom-progress-bar">
                <div className="progress-fill" style={{ width: '98%' }}></div>
              </div>

              <div className="progress-text-row margin-top-sm">
                <span className="value-label">General Admission (91% Sold)</span>
                <span className="value-percent">682,500 / 750,000</span>
              </div>
              <div className="custom-progress-bar">
                <div className="progress-fill bg-teal" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>

          {/* Fan Sentiment Custom Gauge */}
          <div className="insight-item-card glass-card text-center">
            <h2 className="insight-title text-left"><Thermometer size={16} className="inline-icon text-teal" /> Live Fan Sentiment</h2>
            <div className="sentiment-gauge-wrapper">
              <div className="semi-circle-gauge" style={{ '--sentiment-val': sentiment.averageScore } as React.CSSProperties}>
                <div className="gauge-needle"></div>
                <div className="gauge-center">
                  <div className="gauge-score-val">{sentiment.averageScore}%</div>
                  <div className="gauge-score-label">Positive Index</div>
                </div>
              </div>
            </div>
            <div className="sentiment-metadata">
              <span>Positives: <strong>{sentiment.positiveCount}</strong></span>
              <span className="divider">|</span>
              <span>Negatives: <strong>{sentiment.negativeCount}</strong></span>
            </div>
            <div className="themes-pills">
              {sentiment.keyThemes.slice(0, 3).map((theme, i) => (
                <span key={i} className="theme-pill">{theme}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsor Statistics & Marketing campaigns panels */}
        <section className="sponsor-campaign-layout">
          {/* Marketing Campaigns Panel */}
          <div className="panel-card glass-card">
            <h2 className="panel-title"><Award size={16} className="inline-icon text-indigo" /> Marketing Campaigns</h2>
            <div className="table-responsive">
              <table className="custom-data-table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Audience Reach</th>
                    <th>Conversions</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((camp, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold">{camp.name}</td>
                      <td>{camp.reach}</td>
                      <td>{camp.conversions}</td>
                      <td>
                        <span className={`status-pill ${camp.status.toLowerCase()}`}>
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sponsor Statistics Panel */}
          <div className="panel-card glass-card">
            <h2 className="panel-title"><Award size={16} className="inline-icon text-teal" /> Brand Sponsors</h2>
            <div className="table-responsive">
              <table className="custom-data-table">
                <thead>
                  <tr>
                    <th>Sponsor Name</th>
                    <th>Tier</th>
                    <th>Ad Impressions</th>
                    <th>Activation Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSponsors.map((sp, idx) => (
                    <tr key={idx}>
                      <td className="font-semibold">{sp.sponsor}</td>
                      <td>
                        <span className={`tier-badge ${sp.tier.toLowerCase()}`}>
                          {sp.tier}
                        </span>
                      </td>
                      <td>{sp.adImpressions}</td>
                      <td className="text-accent font-semibold">{sp.activationRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Right Pane: AI Copilot Assistant */}
      <div className="copilot-side-pane">
        <CopilotPanel getTelemetryData={getTelemetryData} />
      </div>
    </div>
  );
};
export default Organizer;
