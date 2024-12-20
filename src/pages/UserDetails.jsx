import { doc, getDoc, updateDoc } from 'firebase/firestore';
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


  const handleApprovedClaims = async (policyId) => {
    // const userId = auth.currentUser.uid;
    const userRoleRef = doc(db, 'roles', id);

    try {
      const userRoleDoc = await getDoc(userRoleRef);

      if (userRoleDoc.exists()) {
        const userData = userRoleDoc.data();
        const purchasedPolicies = [...userData.purchasedPolicies];

        const policyIndex = purchasedPolicies.findIndex(
          (policy) => policy.policyId === policyId
        );

        if (policyIndex !== -1) {
          purchasedPolicies[policyIndex] = {
            ...purchasedPolicies[policyIndex],
            clamApproval: true,
          };
          await updateDoc(userRoleRef, {
            purchasedPolicies,
          });
          console.log(`Policy with ID ${policyId} claimed Approved successfully.`);
        } else {
          console.log('Policy not found in purchasedPolicies.');
        }
      } else {
        console.log('User role document not found.');
      }
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

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
          <h2 className="text-xl font-semibold mb-4 bg-black text-white py-4">All the Purchased Policies of this user</h2>
          {policies.map((policy, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p><strong>Policy Name:</strong> {policy.name}</p>
              <p><strong>Category:</strong> {policy.category}</p>
              <p><strong>Price:</strong> ${policy.price}</p>
              {(policy.claim == true && policy.clamApproval == false)
                ?
                <button type="button" onClick={() => handleApprovedClaims(policy.policyId)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Approve Claim</button>
                :
                (policy.claim == true && policy.clamApproval == true ?
                  (<button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Successfully Approved</button>
                  ) : (
                    <button type="button" class="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Customer has't asked for claimed yet</button>
                  )
                )
              }
            </div>
          ))}
        </div>
      ) : (
        <p>No policies found for this user.</p>
      )}
    </div>
  );
};
