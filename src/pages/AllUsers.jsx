/* eslint-disable no-unused-vars */
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 
    const usersRef = collection(db, "roles");
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(auth.currentUser);
        const getUsers = async () => {
            try {
                const querySnapshot = await getDocs(usersRef);
                const userList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        getUsers();
    }, []);

    const handleUserDetails = (id) => {
        navigate(`/userdetails/${id}`);
    };

    const handleUserDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
            try {
                const userDocRef = doc(db, "roles", id);
                await deleteDoc(userDocRef);
                setUsers(users.filter((user) => user.id !== id));
                alert("User deleted successfully");
            } catch (err) {
                console.error("Error deleting user:", err);
                alert("Error deleting user");
            }
        }
    };

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800">All Users</h1>
            <div className="space-y-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="p-4 rounded-lg shadow-lg bg-slate-100">
                            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>Role:</strong> {user.role}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleUserDetails(user.id)}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    View Details
                                </button>
                                <button
                                    type="button"
                                    disabled={currentUser?.uid === user.id} // Disable if the logged-in user matches
                                    className={`text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
                                        currentUser?.uid === user.id ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    onClick={() => handleUserDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users available</p>
                )}
            </div>
        </div>
    );
};
