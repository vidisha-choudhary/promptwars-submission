// Shared utilities and types for ArenaMind AI
export const VERSION = '1.0.0';
export interface User {
  id: string;
  name: string;
  role: 'fan' | 'operator' | 'organizer';
}
