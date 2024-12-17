import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const AddPolicies = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverage, setCoverage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (!description || !category  || !coverage || !name || !price || !type) {
      setError('All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, 'policies'), {
        description,
        category,
        coverage,
        name,
        price,
        type,
        createdAt: new Date(),
      });
      setDescription('');
      setCategory('');
      setCoverage('');
      setName('');
      setPrice('');
      setType('');
      setError('');
      setSuccess('Policy added successfully!');
      navigate('/allpolicies')
    } catch (error) {
      setError('Error adding policy. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Add Policy</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Policy Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Life Insurance">Life Insurance</option>
            <option value="Vehicle Insurance">Vehicle Insurance</option>
            <option value="Retirement">Retirement</option>
          </select>
        </div>

        <div>
          <label htmlFor="coverage" className="block text-lg font-medium text-gray-700">Coverage:</label>
          <input
            type="text"
            id="coverage"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-lg font-medium text-gray-700">Policy Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Life Insurance">Life Insurance</option>
            <option value="Vehicle Insurance">Vehicle Insurance</option>
            <option value="Retirement">Retirement</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Policy
          </button>
        </div>
      </form>
    </div>
  );
};
