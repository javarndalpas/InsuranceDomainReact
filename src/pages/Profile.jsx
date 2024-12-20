import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const Profile = () => {
    const [user, setUser] = useState();
    const [username, setusername] = useState("");
    const Currentuser = auth.currentUser;


    const getRoles = async () => {
        const docRef = doc(db, "roles", Currentuser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userRole = userData.name;
             setusername(userRole);
            // console.log("User role:----->profile", userData.name);
        }
    };
    getRoles()

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
            <div className='text-4xl text-blue-700 mb-8 flex pl-20  '> Profile Info :</div>
            <div className='flex justify-around'>
                <div>
                    <img alt="Profile Avatar"
                        className="w-24 h-24 rounded-full shadow-md object-cover"
                        src="https://thumbs.dreamstime.com/z/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg" />
                </div>
                <div className=' pt-4 text-left'>
                    <p> User Name :  {username}</p>
                    <p> Email :  {user}</p>
                    <p> Dob :  16/07/1983</p>
                </div>
            </div>
        </div>
    );
};
