export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  description: string;
  hourlyRate: number;
  imageUrl: string;
  tags: string[];
}

export interface Booking {
  id: string;
  userId: string;
  coachId: string;
  coachName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  amount: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AiRecommendation {
  coachId: string;
  reasoning: string;
}