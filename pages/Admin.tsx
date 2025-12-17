import React, { useEffect, useState } from 'react';
import { User, Booking } from '../types';
import * as mockBackend from '../services/mockBackend';
import { useNavigate } from 'react-router-dom';

interface AdminProps {
  user: User;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    setAllBookings(mockBackend.getAllBookings());
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            System Bookings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Overview of all platform activity.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allBookings.map((b) => (
                <tr key={b.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.coachName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.date} {b.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${b.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {allBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No bookings found in system.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;