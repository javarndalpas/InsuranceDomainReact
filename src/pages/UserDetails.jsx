import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';

export const UserDetails = () => {
  const [error, setError] = useState('');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);

  const { id } = useParams(); 

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const docRef = doc(db, "roles", id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log(userData.purchasedPolicies); 

          setUser(userData); 
          setPolicies(userData.purchasedPolicies || []); 
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    getUserDetails();
  }, [id]); 
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4 text-blue-800">User Details</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
      
        </div>
      ) : (
        <p>No user data available.</p>
      )}

      {policies.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Purchased Policies</h2>
          {policies.map((policy, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p><strong>Policy Name:</strong> {policy.name}</p>
              <p><strong>Category:</strong> {policy.category}</p>
              <p><strong>Price:</strong> ${policy.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No policies found for this user.</p>
      )}
    </div>
  );
};
