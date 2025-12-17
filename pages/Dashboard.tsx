import React, { useEffect, useState } from 'react';
import { User, Booking } from '../types';
import * as mockBackend from '../services/mockBackend';
import { generateWelcomeMessage } from '../services/geminiService';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [welcomeMsg, setWelcomeMsg] = useState('Welcome back!');

  useEffect(() => {
    const fetchData = async () => {
      const userBookings = mockBackend.getUserBookings(user.id);
      setBookings(userBookings);
      
      const nextBooking = userBookings.find(b => new Date(b.date) > new Date())?.date;
      const msg = await generateWelcomeMessage(user.name, nextBooking);
      setWelcomeMsg(msg);
    };
    fetchData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-indigo-600 mb-8 italic">{welcomeMsg}</p>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Upcoming Sessions
            </h3>
            <Link to="/booking" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              + Book New Session
            </Link>
          </div>
          <ul className="divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <li className="px-4 py-12 text-center text-gray-500">
                You haven't booked any coaching sessions yet.
              </li>
            ) : (
              bookings.map((booking) => (
                <li key={booking.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {booking.coachName}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        ${booking.amount}
                      </div>
                    </div>
                    {booking.notes && (
                        <p className="mt-2 text-xs text-gray-400">Note: {booking.notes}</p>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;