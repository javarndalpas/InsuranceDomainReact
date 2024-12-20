import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';

export const UserDashboard = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserData = async () => {
    const userId = auth.currentUser.uid;
    const docRef = doc(db, 'roles', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUserPolicies(userData.purchasedPolicies || []);
      console.log(userPolicies, "======>pol");
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

        const policyIndex = purchasedPolicies.findIndex(
          (policy) => policy.policyId === policyId
        );

        if (policyIndex !== -1) {
          purchasedPolicies[policyIndex] = {
            ...purchasedPolicies[policyIndex],
            claim: true,
            clamApproval: false,
          };
          await updateDoc(userRoleRef, {
            purchasedPolicies,
          });
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
      <div className="text-3xl bg-slate-500 py-4 font-semibold text-center mb-6 text-white">My Dashboard</div>

      {/* Modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalVisible(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Our Experts Are Reviewing Your Request.
            </h3>
            <div role="status">
              <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => setIsModalVisible(false)}
            >
              OK
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setIsModalVisible(false)}
            >
              Exit
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-200 p-6">
        {userPolicies.length > 0 ? (
          userPolicies.map((policy) => (
            <div
              key={policy.id}
              className="p-4 rounded-lg shadow-lg bg-slate-100"
            >
              <h2 className="text-xl font-semibold mb-2">{policy.name}</h2>
              <p className="text-gray-700">
                <strong>Category:</strong> {policy.category}
              </p>
              <p className="text-gray-700">
                <strong>Type:</strong> {policy.type}
              </p>
              <p className="text-gray-700">
                <strong>Coverage:</strong> {policy.coverage}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${policy.price}
              </p>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Review
              </button>
              {policy.claim == true && policy.clamApproval == false ? (
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  onClick={() => setIsModalVisible(true)}
                >
                  View Claim Status
                </button>
              ) : (policy.claim == true && policy.clamApproval == true ?
                (
                  <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Approved Successfully</button>

                ) : (
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={() => handleUserClaim(policy.policyId)}
                  >
                    Claim
                  </button>
                )
              )
              }
            </div>
          ))
        ) : (
          <p>No policies available</p>
        )}
      </div>
    </>
  );
};
