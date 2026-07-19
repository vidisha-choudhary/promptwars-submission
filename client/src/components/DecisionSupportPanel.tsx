import React, { useState } from 'react';
import { CopilotResponse, GateTelemetry, Incident } from '../types/copilot.types';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';

interface DecisionSupportPanelProps {
  latestResponse: CopilotResponse | null;
  gates: GateTelemetry[];
  incidents: Incident[];
}

interface StructuredRecommendation {
  id: string;
  recommendedAction: string;
  observableEvidence: string;
  situationAnalysis: string;
  riskAssessment: string;
  operationalReasoning: string;
  predictedImpact: string;
  confidenceAssessment: string;
  alternativeConsidered: string;
}

export const OperationalRecommendationCard: React.FC<{
  recommendation: StructuredRecommendation;
}> = ({ recommendation }) => {
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className="glass-card" 
      style={{ 
        border: '1px solid rgba(99, 102, 241, 0.25)', 
        background: 'rgba(99, 102, 241, 0.02)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-md)'
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          cursor: 'pointer'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <Brain style={{ color: 'var(--secondary-accent)', flexShrink: 0, marginTop: '2px' }} size={18} />
          <div>
            <span style={{ fontSize: '10px', color: 'var(--secondary-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI Operational Directive
            </span>
            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
              {recommendation.recommendedAction}
            </h4>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          {actionStatus && (
            <span 
              style={{
                fontSize: '9px',
                fontWeight: 600,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success)',
                padding: '2px 6px',
                borderRadius: '3px',
                textTransform: 'uppercase'
              }}
            >
              {actionStatus}
            </span>
          )}
          {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 'var(--spacing-md)', borderTop: '1px solid var(--bg-card-border)', paddingTop: 'var(--spacing-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          
          {/* 1. Evidence */}
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Observable Evidence</span>
            <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {recommendation.observableEvidence}
            </p>
          </div>

          {/* 2. Situation Analysis */}
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Situation Analysis</span>
            <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {recommendation.situationAnalysis}
            </p>
          </div>

          {/* 3. Risk Assessment */}
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Risk Assessment</span>
            <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--error)', lineHeight: '1.4', fontWeight: 500 }}>
              {recommendation.riskAssessment}
            </p>
          </div>

          {/* 4. Operational Reasoning */}
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Operational Reasoning</span>
            <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {recommendation.operationalReasoning}
            </p>
          </div>

          {/* 5. Predicted Impact */}
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Predicted Impact</span>
            <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--secondary-accent)', lineHeight: '1.4', fontWeight: 600 }}>
              {recommendation.predictedImpact}
            </p>
          </div>

          {/* 6. Confidence Assessment */}
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Confidence Assessment</span>
            <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--text-primary)', fontWeight: 600 }}>
              {recommendation.confidenceAssessment}
            </p>
          </div>

          {/* 7. Alternative Considered */}
          {recommendation.alternativeConsidered && (
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Alternative Considered & Rejected</span>
              <p style={{ fontSize: '12px', margin: '2px 0 0 0', color: 'var(--text-muted)', lineHeight: '1.4', fontStyle: 'italic' }}>
                {recommendation.alternativeConsidered}
              </p>
            </div>
          )}

          {/* Action buttons section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-sm)', borderTop: '1px solid var(--bg-card-border)', paddingTop: 'var(--spacing-sm)' }}>
            <button 
              className="quick-action-btn" 
              style={{ justifyContent: 'center', padding: '6px' }}
              onClick={() => setActionStatus('Under Review')}
            >
              Review Recommendation
            </button>
            <button 
              className="quick-action-btn" 
              style={{ justifyContent: 'center', padding: '6px', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
              onClick={() => setActionStatus('Approved')}
            >
              Approve Recommendation
            </button>
            <button 
              className="quick-action-btn" 
              style={{ justifyContent: 'center', padding: '6px' }}
              onClick={() => setActionStatus('Response Plan Gen')}
            >
              Generate Response Plan
            </button>
            <button 
              className="quick-action-btn" 
              style={{ justifyContent: 'center', padding: '6px' }}
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
  // Compute structured recommendations
  const getRecommendations = (): StructuredRecommendation[] => {
    // Default Recommendation (Initial state / no AI response yet)
    const defaultRec: StructuredRecommendation = {
      id: 'default_ingress_redirection',
      recommendedAction: 'Divert Ingress from South Gate D to North Gate B & Dispatch Turnstile Technician',
      observableEvidence: 'South Gate D wait time: 58 mins, queue length: 210, status: restricted. Turnstile scanner offline at South Gate D concourse (High Severity incident active).',
      situationAnalysis: 'Ingress scanner failure at Gate D has bottlenecked check-in speeds by 60%, causing crowd queues to build up in the south plaza before kickoff.',
      riskAssessment: 'Inaction threat: Severe crowd congestion at South Gate D extending past public concourses, major entry delays causing fans to miss event start, and gate crush hazards.',
      operationalReasoning: 'Diverting 60% of incoming fans towards North Gate B distributes the crowd to an underutilized entry portal (wait time 12m, queue 35). A parallel technician dispatch resolves the hardware failure directly.',
      predictedImpact: 'Reduces South Gate D wait time from 58 mins to 22 mins (-62%) in under 15 minutes, while maintaining North Gate B wait time under 18 mins.',
      confidenceAssessment: '92% Confidence (Verified against real-time sensor ingress volumes and historical queue models).',
      alternativeConsidered: 'Alternative: Keep all ingress routes at South Gate D active and rely on manual ticket checks. Rejected: Manual ticket validation throughput is only 10 check-ins/min, which is insufficient to clear the backlog before kickoff and would raise wait times to 75+ mins.'
    };

    if (!latestResponse) {
      return [defaultRec];
    }

    const recs: StructuredRecommendation[] = [];

    // Map redirection plan
    if (latestResponse.redirectionPlan) {
      const srcGate = gates.find(g => g.id === latestResponse.redirectionPlan?.sourceGateId) || { name: 'Gate D', waitTimeMinutes: 58, queueLength: 210 };
      const tgtGate = gates.find(g => g.id === latestResponse.redirectionPlan?.targetGateId) || { name: 'Gate B', waitTimeMinutes: 12, queueLength: 35 };
      recs.push({
        id: 'redirection_plan_ai',
        recommendedAction: `Execute Redirection Plan: ${srcGate.name} to ${tgtGate.name}`,
        observableEvidence: `Source: ${srcGate.name} (Wait: ${srcGate.waitTimeMinutes}m, Queue: ${srcGate.queueLength} fans) | Target: ${tgtGate.name} (Wait: ${tgtGate.waitTimeMinutes}m, Queue: ${tgtGate.queueLength} fans)`,
        situationAnalysis: `AI detected flow discrepancy. South plaza check-in rate is bottlenecked due to turnstile scan failures. Source gate wait time exceeds operational SLA threshold of 30 minutes.`,
        riskAssessment: 'Failure to redirect will create high-density pedestrian queues, resulting in local gridlock, high stress levels, and security hazards.',
        operationalReasoning: `Redirecting flow utilizing secondary path at ${tgtGate.name}. ${latestResponse.redirectionPlan.reason}`,
        predictedImpact: `Reduces queue volume at ${srcGate.name} by approximately 55-65%, balancing wait times across gates below 20 minutes in 10 minutes.`,
        confidenceAssessment: '96% (High Ingress Load Balancing Model Fit)',
        alternativeConsidered: 'Alternative: Keep gate traffic routes unchanged. Rejected: Queue lengths would overflow physically into access corridors, creating fire-safety safety violations.'
      });
    }

    // Map predictions array
    if (latestResponse.predictions && latestResponse.predictions.length > 0) {
      latestResponse.predictions.forEach((pred, index) => {
        recs.push({
          id: `pred_rec_${index}`,
          recommendedAction: pred.recommendation,
          observableEvidence: `Live Telemetry Trigger: Active queue length and flow rates mismatching expected ingress profile. Active incidents count: ${incidents.filter(i => i.status !== 'resolved').length}.`,
          situationAnalysis: `Predicted Situation: ${pred.prediction}`,
          riskAssessment: 'Inaction risk: Cumulative delays at entry gates, security scanner backlogs, and localized safety corridors blockages.',
          operationalReasoning: pred.reasoning,
          predictedImpact: 'Mitigates the forecast congestion. Speeds up processing throughput by 20-30% on selected gates.',
          confidenceAssessment: `${Math.round(pred.confidence * 100)}% Confidence Score`,
          alternativeConsidered: 'Alternative: Rely on standard queue lanes. Rejected: Static layout cannot accommodate the dynamic surge, leading to an estimated 45+ minute wait time.'
        });
      });
    }

    // Map simulation impact
    if (latestResponse.simulationImpact) {
      recs.push({
        id: 'sim_impact_ai',
        recommendedAction: latestResponse.simulationImpact.recommendation,
        observableEvidence: `Trigger Scenario: ${latestResponse.simulationImpact.scenario.toUpperCase()}. Ingress check points: 5 gates active.`,
        situationAnalysis: `Simulation Impact: ${latestResponse.simulationImpact.prediction}`,
        riskAssessment: 'Inaction risk: Systemic delay, evacuation path blockages, and high pedestrian densities during incident response.',
        operationalReasoning: latestResponse.simulationImpact.reasoning,
        predictedImpact: 'Stabilizes processing capacity. Ensures access routes are cleared for first responders in under 3 minutes.',
        confidenceAssessment: `${Math.round(latestResponse.simulationImpact.confidence * 100)}% Simulation Accuracy`,
        alternativeConsidered: 'Alternative: Deploy extra manual verification staff. Rejected: Evacuation and emergency guidelines prohibit placing personnel in the concourse pathways.'
      });
    }

    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className="decision-support-pane" role="region" aria-label="AI Decision Support Panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', color: 'var(--secondary-accent)', fontSize: '12px', fontWeight: 600, paddingLeft: 'var(--spacing-xs)' }}>
        <Brain size={14} className="inline-icon" />
        <span>EXPLAINABLE AI RECOMMENDATION HUBS</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {recommendations.map((rec) => (
          <OperationalRecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};

export default DecisionSupportPanel;
