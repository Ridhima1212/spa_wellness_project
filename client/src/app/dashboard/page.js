// client/src/app/admin/dashboard/page.js

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch all appointments
  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        throw new Error('Access Forbidden: You are not an admin.');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch appointments.');
      }

      const data = await response.json();
      setAppointments(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [router]);

  // Function to handle status updates
  const handleStatusChange = async (appointmentId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status.');
      }
      
      // Refresh the list of appointments to show the change
      fetchAppointments(); 
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-700 mt-10">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold text-lg">{error}</p>
        <p className="text-gray-600 mt-2">Please log in as an administrator to view this page.</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Admin Dashboard: All Appointments</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appt.user_name}</div>
                        <div className="text-sm text-gray-500">{appt.user_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{appt.service_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(appt.appointment_datetime).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            appt.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select 
                          onChange={(e) => handleStatusChange(appt.id, e.target.value)} 
                          value={appt.status}
                          className="p-1 border border-gray-300 rounded-md text-black"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No appointments have been booked yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
