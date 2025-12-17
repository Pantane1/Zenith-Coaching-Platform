import React from 'react';
import { Coach } from '../types';
import Button from './Button';

interface CoachCardProps {
  coach: Coach;
  onSelect: (coach: Coach) => void;
  recommended?: boolean;
  reasoning?: string;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, onSelect, recommended, reasoning }) => {
  return (
    <div className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${recommended ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-transparent'}`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          AI Recommended
        </div>
      )}
      <div className="h-48 w-full overflow-hidden bg-gray-200">
        <img src={coach.imageUrl} alt={coach.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{coach.name}</h3>
            <p className="text-indigo-600 font-medium">{coach.specialty}</p>
          </div>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            ${coach.hourlyRate}/hr
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 text-sm line-clamp-3">
          {coach.description}
        </p>

        {recommended && reasoning && (
          <div className="mt-3 p-3 bg-indigo-50 rounded-md text-xs text-indigo-800 italic border border-indigo-100">
            " {reasoning} "
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {coach.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={() => onSelect(coach)}>
            View & Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;