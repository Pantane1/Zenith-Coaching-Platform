// ==========================================
// API INTEGRATION CONFIGURATION
// ==========================================

// Payment Processor (Stripe/PayPal)
// Replace these with your actual production keys when deploying the backend
export const PAYMENT_CONFIG = {
  PROVIDER: 'Stripe',
  // INSERT_YOUR_KEY_HERE
  PUBLISHABLE_KEY: 'pk_test_xxxxxxxxxxxxxxxxxxxxx', 
  // Secret keys should strictly remain on the backend
};

// Email Service (SendGrid/Mailgun)
export const EMAIL_CONFIG = {
  PROVIDER: 'SendGrid',
  // INSERT_YOUR_KEY_HERE
  API_KEY_PUBLIC_ID: 'SG.xxxxxxxxxxxxxxxxxxxxx' 
};

// Analytics / Other Services
export const ANALYTICS_CONFIG = {
  // INSERT_YOUR_KEY_HERE
  TRACKING_ID: 'UA-XXXXXXXXX-X' 
};

// Mock Data for Demo Purposes
export const MOCK_COACHES = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    specialty: 'Executive Leadership',
    description: 'Former Fortune 500 VP helping new executives find their voice and lead with confidence.',
    hourlyRate: 250,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    tags: ['leadership', 'business', 'public-speaking']
  },
  {
    id: 'c2',
    name: 'David Chen',
    specialty: 'Career Transition',
    description: 'Expert in navigating complex career pivots, resume optimization, and interview prep.',
    hourlyRate: 150,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    tags: ['career', 'interviews', 'resume']
  },
  {
    id: 'c3',
    name: 'Elena Rodriguez',
    specialty: 'Life & Wellness',
    description: 'Holistic approach to balancing personal well-being with professional ambition.',
    hourlyRate: 120,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    tags: ['wellness', 'balance', 'mindfulness']
  },
  {
    id: 'c4',
    name: 'Marcus Johnson',
    specialty: 'Startup Strategy',
    description: 'Helping founders go from idea to Series A. YC Alumni.',
    hourlyRate: 300,
    imageUrl: 'https://picsum.photos/200/200?random=4',
    tags: ['startup', 'fundraising', 'strategy']
  }
];