import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config';


export const UserDashboard = () => {
const [userPolicies,setUserPolicies] = useState([]);
  useEffect(() => {
    const getUserData = async () => {

      const userId = auth.currentUser.uid;
      console.log('User ID:', userId);

      const docRef = doc(db, 'roles', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userRole = userData.role;
        setUserPolicies(userData.purchasedPolicies);
        // console.log('User role:', userRole);
         console.log('===', userData.purchasedPolicies);
      }
    }
    getUserData()
  }, [])
  return (
    <>
      <div className='text-4xl text-blue-700'>MyDashboard</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  bg-slate-200 p-6">
        {userPolicies.length > 0 ? (
          userPolicies.map((policy) => (
            <div key={policy.id} className="p-4 rounded-lg shadow-lg  bg-slate-100">
              <h2 className="text-xl font-semibold mb-2">{policy.name}</h2>
              <p className="text-gray-700"><strong>Category:</strong> {policy.category}</p>
              <p className="text-gray-700"><strong>Type:</strong> {policy.type}</p>
              <p className="text-gray-700"><strong>Coverage:</strong> {policy.coverage}</p>
              <p className="text-gray-700"><strong>Price:</strong> ${policy.price}</p>
              <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleCheckout(policy.id)}>Claim</button>
              <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Review</button>
            </div>
          ))
        ) : (
          <p>No policies available</p> // Handle case when no policies are fetched
        )}
      </div>
    </>
  )
}
