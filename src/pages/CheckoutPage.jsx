import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/config';

export const CheckoutPage = () => {
    const id = useParams();
    const policyRef = collection(db, "policies",)
    useEffect(() => {
        const getPolicies = async () => {
            try {
                const querySnapshot = await getDocs(policyRef,id);
                const policyList = querySnapshot.docs.map(doc => doc.data())
                console.log(policyList)
                // setPolicies(policyList);
            } catch (err) {
                console.log(err);
            }
        }
        getPolicies();
    }, [])


    // const policyRef = collection(db, "policies", id)
    console.log(id, "-------",)
    return (
        <>CheckoutPage</>
    )
}
