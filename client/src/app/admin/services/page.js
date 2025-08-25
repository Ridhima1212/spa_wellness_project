// client/src/app/admin/services/page.js

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '',
    image_url: '',
  });

  // Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/services');
      if (!response.ok) throw new Error('Failed to fetch services.');
      const data = await response.json();
      setServices(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open the modal to add a new service
  const handleAddService = () => {
    setEditingService(null);
    setFormData({ name: '', description: '', price: '', duration_minutes: '', image_url: '' });
    setIsModalOpen(true);
  };

  // Open the modal to edit an existing service
  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({ ...service });
    setIsModalOpen(true);
  };

  // Handle deleting a service
  const handleDeleteService = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete service.');
      fetchServices(); // Refresh the list
    } catch (err) {
      alert(err.message);
    }
  };
  
  // Handle form submission (for both create and update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingService ? 'PUT' : 'POST';
    const url = editingService 
      ? `http://localhost:3001/api/services/${editingService.id}` 
      : 'http://localhost:3001/api/services';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 403) throw new Error('Forbidden: You are not an admin.');
      if (!response.ok) throw new Error('Failed to save service.');
      
      setIsModalOpen(false);
      fetchServices(); // Refresh the list
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <>
      <main className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Manage Services</h1>
            <button onClick={handleAddService} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Add New Service
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{service.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.duration_minutes} min</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => handleEditService(service)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button onClick={() => handleDeleteService(service.id)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Add/Edit Service */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-black">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Service Name" required className="w-full p-2 border rounded-md text-black"/>
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required className="w-full p-2 border rounded-md text-black"/>
              <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" required className="w-full p-2 border rounded-md text-black"/>
              <input name="duration_minutes" type="number" value={formData.duration_minutes} onChange={handleInputChange} placeholder="Duration (minutes)" required className="w-full p-2 border rounded-md text-black"/>
              <input name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="Image URL" required className="w-full p-2 border rounded-md text-black"/>
              <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
