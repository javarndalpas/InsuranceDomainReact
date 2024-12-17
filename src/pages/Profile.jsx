import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';

export const Profile = () => {
    const [user,setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Log the user data to the console
                setUser(currentUser.email);
                console.log('Current User:', {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                });
            } else {
                console.log('No user is logged in');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='max-w-4xl mx-auto p-6 shadow-lg rounded-lg  bg-white h-56'>
            <div className='text-4xl text-blue-700 mb-8'> Profile Info</div>
            <p> Name :  {user}</p>
            <p> Dob :  16/07/1983</p>
        </div>
    );
};
