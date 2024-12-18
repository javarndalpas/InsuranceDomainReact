import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const[uname, setUname] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user)

      const userRoleRef = doc(db, 'roles', user.uid);
      await setDoc(userRoleRef, {
        role: role,
        email: user.email,
        name: uname
      });

      alert('Signup successful!');
      history("/")
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">Enter Full Name</label>
            <input
              type="text"
              id="name"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600" htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <p>Already have an account <Link to="/signin" className='text-blue-500' >signin</Link > </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};
