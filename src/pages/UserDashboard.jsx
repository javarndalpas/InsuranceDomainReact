import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';

export const UserDashboard = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const getUserData = async () => {
    const userId = auth.currentUser.uid;
    console.log('User ID:', userId);

    const docRef = doc(db, 'roles', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      if(userData.purchasedPolicies){
        setUserPolicies(userData.purchasedPolicies);
      }else{
        setUserPolicies(0)
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  const handleUserClaim = async (policyId) => {
    const userId = auth.currentUser.uid;
    const userRoleRef = doc(db, 'roles', userId);

    try {
      const userRoleDoc = await getDoc(userRoleRef);

      if (userRoleDoc.exists()) {
        const userData = userRoleDoc.data();
        const purchasedPolicies = [...userData.purchasedPolicies];

        const policyIndex = purchasedPolicies.findIndex(policy => policy.policyId === policyId);

        if (policyIndex !== -1) {
          purchasedPolicies[policyIndex] = {
            ...purchasedPolicies[policyIndex],
            claim: true,
            clamApproval:false,
          };
          await updateDoc(userRoleRef, {
            purchasedPolicies: purchasedPolicies
          });
          // getUserData()
          // setClaimStatuses(prev => ({
          //   ...prev,
          //   [policyId]: true
          // }));
          console.log(`Policy with ID ${policyId} claimed successfully.`);
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
    <>
      <div className='text-4xl text-blue-700'>My Dashboard</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-200 p-6">
        {userPolicies.length > 0 ? (
          userPolicies.map((policy) => (
            <div key={policy.id} className="p-4 rounded-lg shadow-lg bg-slate-100">
              <h2 className="text-xl font-semibold mb-2">{policy.name}</h2>
              <p className="text-gray-700"><strong>Category:</strong> {policy.category}</p>
              <p className="text-gray-700"><strong>Type:</strong> {policy.type}</p>
              <p className="text-gray-700"><strong>Coverage:</strong> {policy.coverage}</p>
              <p className="text-gray-700"><strong>Price:</strong> ${policy.price}</p>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Review
              </button>

              {policy.claim=== true ? (
               <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View Claim Status</button>


              ) : (
                <>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => handleUserClaim(policy.policyId)}
                  >
                    Claim
                  </button>
                </>
              )}
            </div>
          ))

        ) : (
          <p>No policies available</p>
        )}
      </div>
    </>
  );
};
