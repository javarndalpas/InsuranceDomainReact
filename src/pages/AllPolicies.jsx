import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const AllPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const policyRef = collection(db, "policies");
  const navigate = useNavigate();
  const [myUserRole, setMyUserRole] = useState("");
  const user = auth.currentUser;
  console.log(user, "----user");

  const handleAddPolicy = () => {
    navigate("/addpolicies");
  };
  // code to get the roles
  const getRoles = async () => {
    const docRef = doc(db, "roles", user.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userRole = userData.role;
      setMyUserRole(userRole);
      console.log("User role:--yyy--->", userRole);
    }
  };
  useEffect(() => {
    //policies
    const getPolicies = async () => {
      try {
        const querySnapshot = await getDocs(policyRef);
        const policyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(policyList, " p");
        setPolicies(policyList);
        // console.log(policies);
      } catch (err) {
        console.log(err);
      }
    };
    getRoles();
    getPolicies();
  }, []);
  const handleCheckout = (id) => {
    console.log(id);
    navigate(`/checkout/${id}`);
  };
  return (
    <div>
      <div className=" py-4">
        <h1 className="text-3xl bg-slate-500 py-4 font-semibold text-center mb-6 text-white">
          Insurance Policies
        </h1>
        {myUserRole != "user" && (
          <button
            type="button"
            onClick={() => handleAddPolicy()}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add Policy
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  bg-slate-200 p-6">
          {policies.length > 0 ? (
            policies.map((policy) => (
              <div
                key={policy.id}
                className="p-4 rounded-lg shadow-lg  bg-slate-100"
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
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => handleCheckout(policy.id)}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Review
                </button>
              </div>
            ))
          ) : (
            <p>No policies available</p> // Handle case when no policies are fetched
          )}
        </div>
      </div>
    </div>
  );
};
