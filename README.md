# ArenaMind AI – Organizer Copilot

## Overview

ArenaMind AI is an AI-powered operations assistant designed for stadium organizers during large sporting events such as the FIFA World Cup.

The application helps organizers monitor live operational conditions, predict crowd congestion, recommend actions, and generate multilingual public announcements using Google Gemini.

---

## Chosen Persona

**Organizer**

This project focuses on assisting tournament organizers with operational intelligence and real-time decision support.

---

## Problem Statement

Managing thousands of spectators during large sporting events is challenging. Organizers need quick, explainable decisions for situations such as:

- Crowd congestion
- Gate closures
- Heavy rain
- Medical emergencies
- VIP arrivals

ArenaMind AI provides AI-generated recommendations to improve safety and operational efficiency.

---

## Features

- AI Organizer Copilot
- Real-time operational recommendations
- Crowd congestion prediction
- Emergency response planning
- Multilingual public announcements
- Confidence score for AI decisions
- Live telemetry dashboard
- Operational monitoring interface

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Node.js
- Express
- TypeScript

### AI

- Google Gemini API

---

## How It Works

1. Live telemetry is collected from the operations dashboard.
2. The organizer selects a scenario such as Heavy Rain or Gate Closure.
3. The telemetry and scenario are sent to the backend.
4. Google Gemini analyzes the operational context.
5. The AI returns:
   - Prediction
   - Reasoning
   - Recommended actions
   - Confidence score
   - Emergency announcement

---

## Assumptions

- Live telemetry is simulated for demonstration purposes.
- Crowd metrics represent real-time stadium monitoring data.
- AI recommendations assist organizers and do not replace human decision-making.

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd promptwars-submission
```

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env` file inside the `server` directory:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### Start development

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Project Structure

```
client/
server/
shared/
docs/
```

---

## AI Workflow

User Input

↓

Operational Telemetry

↓

Google Gemini

↓

AI Reasoning

↓

Recommendations

↓

Organizer Decision Support

---

## Future Improvements

- Live IoT integration
- CCTV crowd analytics
- Predictive staffing
- Live event APIs
- SMS and push notification integration

---

## License

Created for Prompt Wars Virtual Challenge.