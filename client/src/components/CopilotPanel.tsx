import React, { useState, useRef, useEffect } from 'react';
import {
  Send, RefreshCw, AlertTriangle, Play,
  ChevronRight, Globe, Languages, ShieldAlert, Sparkles, Clock
} from 'lucide-react';
import {
  Incident, GateTelemetry, SentimentMetrics,
  SimulatedScenario, AnnouncementLanguage, CopilotResponse
} from '../types/copilot.types';

interface CopilotPanelProps {
  getTelemetryData: () => {
    gates: GateTelemetry[];
    incidents: Incident[];
    sentiment: SentimentMetrics;
  };
}

interface HistoryItem {
  timestamp: string;
  userPrompt: string;
  scenario: SimulatedScenario;
  targetLanguage: AnnouncementLanguage;
  response: CopilotResponse;
}

export const CopilotPanel: React.FC<CopilotPanelProps> = ({ getTelemetryData }) => {
  const [userMessage, setUserMessage] = useState('');
  const [scenario, setScenario] = useState<SimulatedScenario>('none');
  const [targetLanguage, setTargetLanguage] = useState<AnnouncementLanguage>('english');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);


  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const getApiUrl = (path: string) => {
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const base = isDev ? 'http://localhost:5000' : '';
    return `${base}${path}`;
  };

  const handleReason = async (overridePrompt?: string) => {
    const promptToSend = overridePrompt !== undefined ? overridePrompt : userMessage;

    // Telemetry is ONLY collected at the exact moment the action is triggered
    const telemetry = getTelemetryData();

    setLoading(true);
    setError(null);

    const payload = {
      telemetry,
      scenario,
      targetLanguage,
      userMessage: promptToSend ? promptToSend.trim() : undefined,
    };

    try {
      const response = await fetch(getApiUrl('/api/v1/copilot/reason'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();

        console.error("Backend Error:", errorBody);

        throw new Error(errorBody);
      }

      const data: CopilotResponse = await response.json();

      if (!data.success) {
        throw new Error('Failed to generate operational insights');
      }



      // Save in-memory history log
      const logItem: HistoryItem = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        userPrompt: promptToSend || 'General Operational Analysis',
        scenario,
        targetLanguage,
        response: data,
      };
      setHistory(prev => [...prev, logItem]);
      setUserMessage('');
    } catch (err: any) {
      setError(err.message || 'Unable to generate operational insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceBadge = (score: number) => {
    if (score >= 0.80) {
      return <span className="badge badge-success" aria-label={`High confidence: ${Math.round(score * 100)}%`}>High ({Math.round(score * 100)}%)</span>;
    }
    if (score >= 0.50) {
      return <span className="badge badge-warning" aria-label={`Medium confidence: ${Math.round(score * 100)}%`}>Medium ({Math.round(score * 100)}%)</span>;
    }
    return <span className="badge badge-danger" aria-label={`Low confidence: ${Math.round(score * 100)}%`}>Low ({Math.round(score * 100)}%)</span>;
  };

  const quickActions = [
    { label: 'Predict Congestion', prompt: 'Predict congestion risk at active gates based on current flow and occupancy.' },
    { label: 'Prioritize Incidents', prompt: 'Prioritize current incidents based on safety impact and recommend resolutions.' },
    { label: 'Generate Alert Announcement', prompt: 'Generate emergency announcement for current scenario.' },
  ];

  return (
    <aside
      className="copilot-panel glass-card"
      role="complementary"
      aria-label="ArenaMind AI Copilot Panel"
    >
      <div className="copilot-header">
        <div className="header-title-container">
          <Sparkles className="copilot-icon-glow" aria-hidden="true" />
          <h2 className="copilot-title">ArenaMind <span className="text-glow">Copilot</span></h2>
        </div>
        <div className="copilot-status">
          <span className="pulse-indicator"></span>
          <span className="status-text">Reasoning Agent Active</span>
        </div>
      </div>

      {/* Simulator and Language Control Bar */}
      <div className="copilot-controls-grid">
        <div className="control-group">
          <label htmlFor="scenario-select" className="control-label">
            <Play className="inline-icon" size={14} aria-hidden="true" /> Scenario Simulator
          </label>
          <select
            id="scenario-select"
            className="control-select"
            value={scenario}
            onChange={(e) => setScenario(e.target.value as SimulatedScenario)}
            disabled={loading}
          >
            <option value="none">No Scenario (Normal)</option>
            <option value="gate_closure">Gate Closure Simulation</option>
            <option value="heavy_rain">Heavy Rain Simulation</option>
            <option value="medical_emergency">Medical Emergency Simulation</option>
            <option value="vip_arrival">VIP Arrival Simulation</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="lang-select" className="control-label">
            <Globe className="inline-icon" size={14} aria-hidden="true" /> Alert Language
          </label>
          <select
            id="lang-select"
            className="control-select"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as AnnouncementLanguage)}
            disabled={loading}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi (हिंदी)</option>
            <option value="spanish">Spanish (Español)</option>
          </select>
        </div>
      </div>

      {/* Feed Container */}
      <div className="copilot-feed-container">
        {history.length === 0 && !loading && !error && (
          <div className="copilot-empty-state">
            <Sparkles className="empty-sparkle" size={36} aria-hidden="true" />
            <h3 className="empty-title">ArenaMind AI Copilot</h3>
            <p className="empty-subtitle">
              Choose a quick action or ask a question about stadium operations.
            </p>
            <div className="quick-actions-list">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="quick-action-btn"
                  onClick={() => handleReason(action.prompt)}
                  type="button"
                >
                  <ChevronRight size={14} className="btn-chevron" aria-hidden="true" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History Messages */}
        {history.map((item, index) => (
          <div key={index} className="history-turn">
            <div className="user-request-bubble">
              <div className="bubble-header">
                <span className="user-label">Organizer Request</span>
                <span className="timestamp-label"><Clock size={10} /> {item.timestamp}</span>
              </div>
              <p className="bubble-text">{item.userPrompt}</p>
              {(item.scenario !== 'none' || item.targetLanguage !== 'english') && (
                <div className="bubble-metadata">
                  {item.scenario !== 'none' && <span className="meta-tag">Scenario: {item.scenario}</span>}
                  {item.targetLanguage !== 'english' && <span className="meta-tag">Lang: {item.targetLanguage}</span>}
                </div>
              )}
            </div>

            {/* AI Reasoning Response Box */}
            <div className="ai-response-box">
              <div className="response-header">
                <Sparkles size={14} className="response-sparkle" aria-hidden="true" />
                <span className="response-label">AI Copilot Analysis</span>
              </div>

              {/* Predictions List */}
              {item.response.predictions && item.response.predictions.map((p, pIdx) => (
                <div key={pIdx} className="insight-card">
                  <div className="insight-card-header">
                    <span className="insight-card-title">Prediction & Recommendation</span>
                    {getConfidenceBadge(p.confidence)}
                  </div>

                  <div className="insight-prediction-block">
                    <span className="insight-label-tag">PREDICTION</span>
                    <p className="insight-content-text font-semibold">{p.prediction}</p>
                  </div>

                  {/* Explainable AI: Reasoning must appear immediately below prediction */}
                  <div className="insight-reasoning-block">
                    <span className="insight-label-tag">REASONING</span>
                    <p className="insight-content-text text-secondary">{p.reasoning}</p>
                  </div>

                  <div className="insight-recommendation-block">
                    <span className="insight-label-tag">RECOMMENDATION</span>
                    <p className="insight-content-text text-accent">{p.recommendation}</p>
                  </div>
                </div>
              ))}

              {/* Redirection details */}
              {item.response.redirectionPlan && (
                <div className="action-details-card redirection-alert">
                  <div className="action-card-header">
                    <ShieldAlert size={16} />
                    <span>Active Redirection Action Plan</span>
                  </div>
                  <div className="redirection-flow">
                    <div className="flow-step font-bold text-red">{item.response.redirectionPlan.sourceGateId}</div>
                    <div className="flow-arrow">&rarr;</div>
                    <div className="flow-step font-bold text-green">{item.response.redirectionPlan.targetGateId}</div>
                  </div>
                  <p className="action-text"><strong>Reason:</strong> {item.response.redirectionPlan.reason}</p>
                  <p className="action-text"><strong>Recommendation:</strong> {item.response.redirectionPlan.recommendation}</p>
                </div>
              )}

              {/* Multilingual Announcement */}
              {item.response.emergencyAnnouncements && (
                <div className="action-details-card announcement-alert">
                  <div className="action-card-header">
                    <Languages size={16} />
                    <span>Emergency Announcement ({item.response.emergencyAnnouncements.language.toUpperCase()})</span>
                  </div>
                  <div className="announcement-text-box">
                    <p className="announcement-quote">"{item.response.emergencyAnnouncements.text}"</p>
                  </div>
                </div>
              )}

              {/* Scenario Impact */}
              {item.response.simulationImpact && (
                <div className="action-details-card simulation-alert">
                  <div className="action-card-header">
                    <Play size={16} />
                    <span>Scenario Impact Simulation Report: {item.response.simulationImpact.scenario.toUpperCase()}</span>
                  </div>
                  <div className="insight-prediction-block">
                    <span className="insight-label-tag">PREDICTED IMPACT</span>
                    <p className="insight-content-text">{item.response.simulationImpact.prediction}</p>
                  </div>
                  <div className="insight-reasoning-block">
                    <span className="insight-label-tag">REASONING</span>
                    <p className="insight-content-text text-secondary">{item.response.simulationImpact.reasoning}</p>
                  </div>
                  <div className="insight-recommendation-block">
                    <span className="insight-label-tag">MITIGATION RECOMMENDATION</span>
                    <p className="insight-content-text text-accent">{item.response.simulationImpact.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading experience */}
        {loading && (
          <div
            className="copilot-loading-container"
            role="status"
            aria-live="polite"
          >
            <div className="loading-spinner-orb"></div>
            <p className="loading-text">ArenaMind AI is analyzing stadium telemetry...</p>
          </div>
        )}

        {/* Error experience */}
        {error && (
          <div className="copilot-error-card" role="alert">
            <AlertTriangle className="error-icon" size={24} aria-hidden="true" />
            <div className="error-content">
              <h4 className="error-card-title">Unable to generate operational insights.</h4>
              <p className="error-card-text">Please try again.</p>
            </div>
            <button
              className="error-retry-btn"
              onClick={() => handleReason()}
              disabled={loading}
              type="button"
            >
              <RefreshCw size={14} className="inline-icon" aria-hidden="true" /> Retry
            </button>
          </div>
        )}

        <div ref={historyEndRef} />
      </div>

      {/* Input Form Area */}
      <form
        className="copilot-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (userMessage.trim() && !loading) {
            handleReason();
          }
        }}
      >
        <input
          type="text"
          className="copilot-input-field"
          placeholder="Ask Copilot about gates, incidents, or safety..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          disabled={loading}
          aria-label="Copilot query prompt input"
        />
        <button
          type="submit"
          className="copilot-submit-btn"
          disabled={loading || !userMessage.trim()}
          aria-label="Send query to Copilot"
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </form>
    </aside>
  );
};
export default CopilotPanel;
