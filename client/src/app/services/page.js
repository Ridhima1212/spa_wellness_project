// client/src/app/services/page.js

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getServices() {
      try {
        const response = await fetch('http://localhost:3001/api/services', {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch services.');
        const result = await response.json();
        setServices(result.data || []); 
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    getServices();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-700 mt-10">Loading services...</p>;
  }

  return (
    <main className="bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Discover Our Treatments
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            A curated selection of services designed to rejuvenate your mind, body, and soul.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="block group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image_url || 'https://placehold.co/600x400/E2E8F0/4A5568?text=Image+Not+Available'}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E2E8F0/4A5568?text=Image+Not+Found'; }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{service.name}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                  <div className="flex justify-between items-center text-lg mt-auto pt-4 border-t border-gray-100">
                    <span className="text-gray-500">{service.duration_minutes} minutes</span>
                    <span className="font-bold text-gray-900">₹{service.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
