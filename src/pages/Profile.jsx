import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../firebase/config';

export const Profile = () => {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Log the user data to the console
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
        <div>
            <h1>Profile Page</h1>
        </div>
    );
};
