// client/src/app/services/[id]/page.js

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ServiceDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [service, setService] = useState(null);
  const [datetime, setDatetime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/services/${id}`);
          if (!response.ok) throw new Error('Service not found.');
          const data = await response.json();
          setService(data.data);
        } catch (error) {
          console.error("Failed to fetch service details", error);
          setMessage(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book. Redirecting...');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }
    if (!datetime) {
      setMessage('Please select a date and time.');
      return;
    }
    setMessage('Booking your appointment...');
    try {
      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId: id, appointmentDatetime: datetime }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Booking failed.');
      setMessage('Appointment booked successfully!');
    } catch (error) {
      setMessage(`Booking failed: ${error.message}`);
    }
  };

  const backgroundImageUrl = 'https://images.pexels.com/photos/3771691/pexels-photo-3771691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  if (loading) return <p className="text-center mt-10">Loading service details...</p>;

  return (
    <main 
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative w-full max-w-4xl bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden md:flex">
        {service && (
          <div className="md:w-1/2 relative min-h-[250px] md:min-h-0">
            <Image
              src={service.image_url || 'https://placehold.co/600x400/E2E8F0/4A5568?text=Image+Not+Available'}
              alt={service.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="p-8 space-y-6 md:w-1/2">
          {service ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
              <p className="text-gray-600">{service.description}</p>
              <div className="flex justify-between items-center text-lg pt-4 border-t">
                <span className="text-gray-500">{service.duration_minutes} minutes</span>
                <span className="font-bold text-gray-900">₹{service.price}</span>
              </div>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">Choose Date and Time</label>
                  <input
                    id="datetime"
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </>
          ) : (
            <p className="text-center text-red-500">{message || 'Service details could not be loaded.'}</p>
          )}
          {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
        </div>
      </div>
    </main>
  );
}
