import React, { useState } from 'react';
import { CopilotResponse, GateTelemetry, Incident } from '../types/copilot.types';
import { buildRecommendations, StructuredRecommendation } from '../services/recommendationService';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';

interface DecisionSupportPanelProps {
  latestResponse: CopilotResponse | null;
  gates: GateTelemetry[];
  incidents: Incident[];
}

export const OperationalRecommendationCard: React.FC<{
  recommendation: StructuredRecommendation;
}> = ({ recommendation }) => {
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="recommendation-card glass-card">
      <div className="recommendation-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="recommendation-card-title-group">
          <Brain className="recommendation-card-icon" size={18} />
          <div>
            <span className="recommendation-card-category">
              AI Operational Directive
            </span>
            <h4 className="recommendation-card-title">
              {recommendation.recommendedAction}
            </h4>
          </div>
        </div>
        <div className="recommendation-card-badge-group">
          {actionStatus && (
            <span className="status-pill active">
              {actionStatus}
            </span>
          )}
          {isExpanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
        </div>
      </div>

      {isExpanded && (
        <div className="recommendation-card-body">
          {/* 1. Evidence */}
          <div>
            <span className="recommendation-section-label">Observable Evidence</span>
            <p className="recommendation-section-text">
              {recommendation.observableEvidence}
            </p>
          </div>

          {/* 2. Situation Analysis */}
          <div>
            <span className="recommendation-section-label">Situation Analysis</span>
            <p className="recommendation-section-text">
              {recommendation.situationAnalysis}
            </p>
          </div>

          {/* 3. Risk Assessment */}
          <div>
            <span className="recommendation-section-label">Risk Assessment</span>
            <p className="recommendation-section-risk">
              {recommendation.riskAssessment}
            </p>
          </div>

          {/* 4. Operational Reasoning */}
          <div>
            <span className="recommendation-section-label">Operational Reasoning</span>
            <p className="recommendation-section-text">
              {recommendation.operationalReasoning}
            </p>
          </div>

          {/* 5. Predicted Impact */}
          <div>
            <span className="recommendation-section-label">Predicted Impact</span>
            <p className="recommendation-section-impact">
              {recommendation.predictedImpact}
            </p>
          </div>

          {/* 6. Confidence Assessment */}
          <div>
            <span className="recommendation-section-label">Confidence Assessment</span>
            <p className="recommendation-section-confidence">
              {recommendation.confidenceAssessment}
            </p>
          </div>

          {/* 7. Alternative Considered */}
          {recommendation.alternativeConsidered && (
            <div>
              <span className="recommendation-section-label">Alternative Considered & Rejected</span>
              <p className="recommendation-section-text alternative-text">
                {recommendation.alternativeConsidered}
              </p>
            </div>
          )}

          {/* Action buttons section */}
          <div className="recommendation-card-actions">
            <button 
              className="quick-action-btn action-btn-centered" 
              onClick={() => setActionStatus('Under Review')}
            >
              Review Recommendation
            </button>
            <button 
              className="quick-action-btn action-btn-centered-approved" 
              onClick={() => setActionStatus('Approved')}
            >
              Approve Recommendation
            </button>
            <button 
              className="quick-action-btn action-btn-centered" 
              onClick={() => setActionStatus('Response Plan Gen')}
            >
              Generate Response Plan
            </button>
            <button 
              className="quick-action-btn action-btn-centered" 
              onClick={() => setActionStatus('Exec Plan Loaded')}
            >
              View Execution Plan
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export const DecisionSupportPanel: React.FC<DecisionSupportPanelProps> = ({
  latestResponse,
  gates,
  incidents
}) => {
  const recommendations = buildRecommendations(latestResponse, gates, incidents);

  return (
    <div className="decision-support-pane" role="region" aria-label="AI Decision Support Panel">
      <div className="panel-header-title">
        <Brain size={14} className="inline-icon" />
        <span>EXPLAINABLE AI RECOMMENDATION HUBS</span>
      </div>

      <div className="recommendations-list">
        {recommendations.map((rec) => (
          <OperationalRecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default DecisionSupportPanel;
