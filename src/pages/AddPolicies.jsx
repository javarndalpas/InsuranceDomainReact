import React, { useState } from 'react';
import { db } from '../firebase/config'; 
import { collection, addDoc } from 'firebase/firestore'; 

export const AddPolicies = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title || !description || !category || !date) {
      setError('All fields are required.');
      return;
    }

    try {
 
      await addDoc(collection(db, 'policies'), {
        title,
        description,
        category,
        date: new Date(date),
        createdAt: new Date(),
      });

      setTitle('');
      setDescription('');
      setCategory('');
      setDate('');
      setError('');
      setSuccess('Policy added successfully!');
    } catch (error) {
      setError('Error adding policy. Please try again.');
    }
  };

  return (
    <div className="add-policy">
      <h1>Add Policy</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Policy Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Health">Health</option>
            <option value="Safety">Safety</option>
            <option value="Privacy">Privacy</option>
            <option value="Terms">Terms</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Policy</button>
      </form>
    </div>
  );
};
