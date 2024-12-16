import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';

export const Home = () => {
  const [policies, setPolicies] = useState([]);
  const policyRef = collection(db, "policies");

  useEffect(() => {
    const getPolicies = async () => {
      try {
        const querySnapshot = await getDocs(policyRef);
        const policyList = querySnapshot.docs.map(doc => doc.data());
        setPolicies(policyList);
        console.log(policies, "-----");
      } catch (error) {
        console.log("Error fetching policies:", error);
      }
    }
    getPolicies()
  }, [])

  return (
    <div>
      <div className="px-4 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.length > 0 ? (
            policies.map((policy) => (
              <div key={policy.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{policy.name}</h2>
                <p className="text-gray-700"><strong>Category:</strong> {policy.category}</p>
                <p className="text-gray-700"><strong>Type:</strong> {policy.type}</p>
                <p className="text-gray-700"><strong>Coverage:</strong> {policy.coverage}</p>
                <p className="text-gray-700"><strong>Price:</strong> ${policy.price}</p>
                <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buy</button>
                <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add to Compare</button>
                <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Review</button>

              </div>
            ))
          ) : (
            <p>No policies available</p>
          )}
        </div>
      </div>
    </div>
  )
}


