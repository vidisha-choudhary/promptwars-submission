import React from 'react';
import { GateTelemetry, Incident, SentimentMetrics } from '../types/copilot.types';
import { ShieldAlert, Thermometer, Radio } from 'lucide-react';

interface TelemetryPanelProps {
  gates: GateTelemetry[];
  incidents: Incident[];
  sentiment: SentimentMetrics;
}

export const GateStatusFeed: React.FC<{ gates: GateTelemetry[] }> = ({ gates }) => {
  return (
    <div className="panel-card glass-card">
      <h3 className="panel-title">
        <Radio size={16} className="inline-icon text-indigo" />
        Live Gate Ingress Telemetry
      </h3>
      <div className="table-responsive">
        <table className="custom-data-table">
          <thead>
            <tr>
              <th>Gate</th>
              <th>Queue</th>
              <th>Flow</th>
              <th>Wait</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {gates.map((g) => {
              const isWarning = g.waitTimeMinutes >= 30;
              const isCritical = g.waitTimeMinutes >= 50 || g.status === 'restricted';
              let waitClass = 'text-normal';
              if (isCritical) waitClass = 'text-critical font-bold';
              else if (isWarning) waitClass = 'text-warning font-bold';

              return (
                <tr key={g.id}>
                  <td className="font-semibold">{g.name}</td>
                  <td>{g.queueLength} fans</td>
                  <td>{g.flowRatePerMin}/min</td>
                  <td className={waitClass}>
                    {g.waitTimeMinutes}m
                  </td>
                  <td>
                    <span className={`status-pill ${g.status.toLowerCase()}`}>
                      {g.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const IncidentFeed: React.FC<{ incidents: Incident[] }> = ({ incidents }) => {
  return (
    <div className="panel-card glass-card">
      <h3 className="panel-title">
        <ShieldAlert size={16} className="inline-icon text-orange" />
        Live Incident Center
      </h3>
      <div className="incident-feed-list">
        {incidents.map((inc) => {
          let severityClass = 'severity-low';
          if (inc.severity === 'critical') {
            severityClass = 'severity-critical';
          } else if (inc.severity === 'high') {
            severityClass = 'severity-high';
          } else if (inc.severity === 'medium') {
            severityClass = 'severity-medium';
          }

          const statusClass = inc.status === 'resolved' ? 'status-resolved' : 'status-pending';

          return (
            <div key={inc.id} className="incident-card">
              <div>
                <div className="incident-header-meta">
                  <span className={`incident-severity-badge ${severityClass}`}>
                    {inc.severity}
                  </span>
                  <span className="incident-time-meta">{inc.timestamp}</span>
                  <span className="incident-loc-meta">@{inc.location}</span>
                </div>
                <h4 className="incident-title">
                  {inc.title}
                </h4>
              </div>
              <div>
                <span className={`incident-status-badge ${statusClass}`}>
                  {inc.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SentimentFeed: React.FC<{ sentiment: SentimentMetrics }> = ({ sentiment }) => {
  return (
    <div className="panel-card glass-card text-center">
      <h3 className="panel-title text-left">
        <Thermometer size={16} className="inline-icon text-teal" />
        Live Fan Sentiment
      </h3>
      <div className="sentiment-gauge-wrapper">
        <div className="semi-circle-gauge" style={{ '--sentiment-val': sentiment.averageScore } as React.CSSProperties}>
          <div className="gauge-needle"></div>
          <div className="gauge-center">
            <div className="gauge-score-val">{sentiment.averageScore}%</div>
            <div className="gauge-score-label">Positive</div>
          </div>
        </div>
      </div>
      <div className="sentiment-metadata-row">
        <span>Positives: <strong>{sentiment.positiveCount}</strong></span>
        <span className="divider">|</span>
        <span>Negatives: <strong>{sentiment.negativeCount}</strong></span>
      </div>
      <div className="themes-pills">
        {sentiment.keyThemes.map((theme, i) => (
          <span key={i} className="sentiment-theme-pill">
            {theme}
          </span>
        ))}
      </div>
    </div>
  );
};

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({ gates, incidents, sentiment }) => {
  return (
    <div className="telemetry-pane" role="region" aria-label="Live Telemetry Panel">
      <div className="telemetry-stream-header">
        <Radio size={14} className="inline-icon pulsing-icon" />
        <span>LIVE DATA STREAMING</span>
      </div>
      <GateStatusFeed gates={gates} />
      <IncidentFeed incidents={incidents} />
      <SentimentFeed sentiment={sentiment} />
    </div>
  );
};

export default TelemetryPanel;
