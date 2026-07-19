import React from 'react';
import { GateTelemetry, Incident, SentimentMetrics } from '../types/copilot.types';
import { ShieldAlert, Thermometer, Radio } from 'lucide-react';

interface TelemetryPanelProps {
  gates: GateTelemetry[];
  incidents: Incident[];
  sentiment: SentimentMetrics;
}

// 1. GateStatusFeed: Shows gate queues, wait times, flow rates, and status
export const GateStatusFeed: React.FC<{ gates: GateTelemetry[] }> = ({ gates }) => {
  return (
    <div className="panel-card glass-card" style={{ padding: 'var(--spacing-md)' }}>
      <h3 className="panel-title" style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <Radio size={16} className="inline-icon text-indigo" style={{ color: 'var(--primary-accent)' }} />
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
              let waitColor = 'var(--text-primary)';
              if (isCritical) waitColor = 'var(--error)';
              else if (isWarning) waitColor = 'var(--warning)';

              return (
                <tr key={g.id}>
                  <td className="font-semibold">{g.name}</td>
                  <td>{g.queueLength} fans</td>
                  <td>{g.flowRatePerMin}/min</td>
                  <td style={{ color: waitColor, fontWeight: isWarning || isCritical ? 'bold' : 'normal' }}>
                    {g.waitTimeMinutes}m
                  </td>
                  <td>
                    <span 
                      className={`status-pill ${g.status.toLowerCase()}`}
                      style={{
                        fontSize: '9px',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        backgroundColor: g.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: g.status === 'active' ? 'var(--success)' : 'var(--error)'
                      }}
                    >
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

// 2. IncidentFeed: Tracks live incidents and dispatch states
export const IncidentFeed: React.FC<{ incidents: Incident[] }> = ({ incidents }) => {
  return (
    <div className="panel-card glass-card" style={{ padding: 'var(--spacing-md)' }}>
      <h3 className="panel-title" style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <ShieldAlert size={16} className="inline-icon text-orange" style={{ color: 'var(--warning)' }} />
        Live Incident Center
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {incidents.map((inc) => {
          let severityColor = 'rgba(255, 255, 255, 0.1)';
          let severityText = 'var(--text-secondary)';
          if (inc.severity === 'critical') {
            severityColor = 'rgba(239, 68, 68, 0.2)';
            severityText = 'var(--error)';
          } else if (inc.severity === 'high') {
            severityColor = 'rgba(245, 158, 11, 0.2)';
            severityText = 'var(--warning)';
          } else if (inc.severity === 'medium') {
            severityColor = 'rgba(99, 102, 241, 0.2)';
            severityText = 'var(--primary-accent)';
          }

          return (
            <div 
              key={inc.id} 
              style={{
                border: '1px solid var(--bg-card-border)',
                borderRadius: 'var(--border-radius-sm)',
                padding: 'var(--spacing-sm)',
                background: 'rgba(255,255,255,0.01)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
                  <span 
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      backgroundColor: severityColor,
                      color: severityText,
                      padding: '1px 5px',
                      borderRadius: '3px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {inc.severity}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{inc.timestamp}</span>
                  <span style={{ fontSize: '11px', color: 'var(--secondary-accent)' }}>@{inc.location}</span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                  {inc.title}
                </h4>
              </div>
              <div>
                <span 
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: inc.status === 'resolved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: inc.status === 'resolved' ? 'var(--success)' : 'var(--warning)',
                    textTransform: 'uppercase'
                  }}
                >
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

// 3. SentimentFeed: Real-time sentiment metrics
export const SentimentFeed: React.FC<{ sentiment: SentimentMetrics }> = ({ sentiment }) => {
  return (
    <div className="panel-card glass-card text-center" style={{ padding: 'var(--spacing-md)' }}>
      <h3 className="panel-title text-left" style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <Thermometer size={16} className="inline-icon text-teal" style={{ color: 'var(--secondary-accent)' }} />
        Live Fan Sentiment
      </h3>
      <div className="sentiment-gauge-wrapper" style={{ margin: 'var(--spacing-sm) auto' }}>
        <div className="semi-circle-gauge" style={{ '--sentiment-val': sentiment.averageScore } as React.CSSProperties}>
          <div className="gauge-needle"></div>
          <div className="gauge-center">
            <div className="gauge-score-val">{sentiment.averageScore}%</div>
            <div className="gauge-score-label" style={{ fontSize: '8px' }}>Positive</div>
          </div>
        </div>
      </div>
      <div className="sentiment-metadata" style={{ fontSize: '11px', marginBottom: 'var(--spacing-sm)', display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)' }}>
        <span>Positives: <strong>{sentiment.positiveCount}</strong></span>
        <span className="divider">|</span>
        <span>Negatives: <strong>{sentiment.negativeCount}</strong></span>
      </div>
      <div className="themes-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
        {sentiment.keyThemes.map((theme, i) => (
          <span 
            key={i} 
            className="theme-pill"
            style={{
              fontSize: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--bg-card-border)',
              padding: '2px 8px',
              borderRadius: '12px',
              color: 'var(--text-secondary)'
            }}
          >
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, paddingLeft: 'var(--spacing-xs)' }}>
        <Radio size={14} className="inline-icon" style={{ animation: 'pulse-glow 1.5s infinite ease-in-out' }} />
        <span>LIVE DATA STREAMING</span>
      </div>
      <GateStatusFeed gates={gates} />
      <IncidentFeed incidents={incidents} />
      <SentimentFeed sentiment={sentiment} />
    </div>
  );
};

export default TelemetryPanel;
