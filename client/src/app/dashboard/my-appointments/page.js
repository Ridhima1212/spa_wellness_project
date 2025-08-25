// client/src/app/dashboard/my-appointments/page.js

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/appointments/my-appointments', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments. Please log in again.');
      }

      const data = await response.json();
      setAppointments(data.data);
    } catch (err) {
      setError(err.message);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [router]);

  // NEW FUNCTION: Handle appointment cancellation
  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment.');
      }

      // Refresh the list of appointments after successful cancellation
      fetchAppointments();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-700 mt-10">Loading your appointments...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        <Link href="/login" className="text-indigo-600 hover:underline mt-4 inline-block">Go to Login</Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">My Appointments</h1>
        
        {appointments.length > 0 ? (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <div key={appt.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-indigo-600 mb-2">{appt.service_name}</h2>
                  <div className="text-gray-700 space-y-1">
                    <p><strong>Date & Time:</strong> {new Date(appt.appointment_datetime).toLocaleString()}</p>
                    <p><strong>Status:</strong> <span className="font-medium capitalize">{appt.status}</span></p>
                    <p><strong>Price:</strong> ₹{appt.service_price}</p>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => handleCancelAppointment(appt.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg shadow-md">
            <p>You have no appointments booked.</p>
            <Link href="/services" className="text-indigo-600 hover:underline mt-4 inline-block">Book a Service</Link>
          </div>
        )}
      </div>
    </main>
  );
}
