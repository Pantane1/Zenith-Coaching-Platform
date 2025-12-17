import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coach, User } from '../types';
import * as mockBackend from '../services/mockBackend';
import { getCoachRecommendation } from '../services/geminiService';
import CoachCard from '../components/CoachCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { PAYMENT_CONFIG } from '../constants';

interface BookingProps {
  user: User | null;
}

const BookingPage: React.FC<BookingProps> = ({ user }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  
  // AI Matching State
  const [userGoal, setUserGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<{id: string, reasoning: string} | null>(null);

  // Booking Details State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    mockBackend.getCoaches().then(setCoaches);
  }, []);

  const handleAiMatch = async () => {
    if (!userGoal.trim()) return;
    setIsAnalyzing(true);
    const result = await getCoachRecommendation(userGoal, coaches);
    if (result) {
      setRecommendation({ id: result.coachId, reasoning: result.reasoning });
    }
    setIsAnalyzing(false);
  };

  const handleSelectCoach = (coach: Coach) => {
    if (!user) {
        navigate('/login');
        return;
    }
    setSelectedCoach(coach);
    setStep(2);
  };

  const handlePayment = async () => {
    if (!selectedCoach || !user) return;
    setIsProcessingPayment(true);

    // Simulate API calls to Stripe/PayPal using config
    console.log(`Using Payment Provider: ${PAYMENT_CONFIG.PROVIDER} with key: ${PAYMENT_CONFIG.PUBLISHABLE_KEY}`);
    
    try {
      await mockBackend.createBooking({
        userId: user.id,
        coachId: selectedCoach.id,
        coachName: selectedCoach.name,
        date,
        time,
        amount: selectedCoach.hourlyRate,
        notes: userGoal
      });
      navigate('/dashboard');
    } catch (e) {
      alert("Payment failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Step 1: Coach Selection
  if (step === 1) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find Your Perfect Coach
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Browse our roster or let AI match you based on your goals.
          </p>
        </div>

        {/* AI Matcher Section */}
        <div className="max-w-3xl mx-auto mb-16 bg-indigo-50 rounded-xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg>
            AI Smart Match
          </h2>
          <div className="flex gap-4">
            <input 
              type="text" 
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
              placeholder="e.g., I want to improve my executive presence and public speaking..."
              value={userGoal}
              onChange={(e) => setUserGoal(e.target.value)}
            />
            <Button onClick={handleAiMatch} isLoading={isAnalyzing} disabled={!userGoal}>
              Analyze
            </Button>
          </div>
        </div>

        {/* Coach Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map(coach => (
            <CoachCard 
              key={coach.id} 
              coach={coach} 
              onSelect={handleSelectCoach}
              recommended={recommendation?.id === coach.id}
              reasoning={recommendation?.id === coach.id ? recommendation?.reasoning : undefined}
            />
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Schedule & Payment
  if (step === 2 && selectedCoach) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900 mb-6 flex items-center">
          ← Back to coaches
        </button>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Book Session with {selectedCoach.name}</h2>
            <p className="text-gray-500 mt-2">Rate: ${selectedCoach.hourlyRate}/hour</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Input 
                label="Time" 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details (Secure)</h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold">Provider:</span> {PAYMENT_CONFIG.PROVIDER}
                </p>
                <div className="space-y-3">
                    <Input label="Card Number" placeholder="4242 4242 4242 4242" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Expiry" placeholder="MM/YY" />
                        <Input label="CVC" placeholder="123" />
                    </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded mb-6">
                  <span className="font-bold text-gray-700">Total Due:</span>
                  <span className="font-bold text-xl text-indigo-600">${selectedCoach.hourlyRate}.00</span>
              </div>

              <Button 
                onClick={handlePayment} 
                className="w-full" 
                isLoading={isProcessingPayment}
                disabled={!date || !time}
              >
                Confirm & Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BookingPage;