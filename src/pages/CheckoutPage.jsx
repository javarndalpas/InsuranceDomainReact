import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';


export const CheckoutPage = () => {
    const { id } = useParams();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');


    const userId = auth.currentUser.uid;
    console.log('User ID:', userId);
    // console.log('Policy ID:', policy.id);
    console.log('////:', id);

    useEffect(() => {
        const getPolicy = async () => {
            try {
                const docRef = doc(db, "policies", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPolicy(docSnap.data());
                } else {
                    setError('Policy not found');
                }
            } catch (err) {
                setError('Error fetching policy');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getPolicy();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
            setError('All fields are required.');
            return;
        }

        setError('');
        alert('Payment details submitted successfully!');
    };

    const handleCheckout = async (userId, id) => {
        if (!userId || !id) {
            console.error("User ID or Policy ID is missing");
            return;
        }
        try {

            const userRoleRef = doc(db, 'roles', userId);
            const userRoleDoc = await getDoc(userRoleRef);

            if (!userRoleDoc.exists()) {
                console.log('No such document!');
                return;
            }
            const userRole = userRoleDoc.data().role;

            const policyRef = doc(db, 'policies', id);
            const policyDoc = await getDoc(policyRef);

            if (!policyDoc.exists()) {
                console.log('No such policy!');
                return;
            }
            const policyData = policyDoc.data();

            const policyPurchase = {
                policyId: id,
                name: policyData.name,
                price: policyData.price,
                category: policyData.category,
                description: policyData.description,
                datePurchased: new Date(),
                role: userRole,
            };

            await updateDoc(userRoleRef, {
                purchasedPolicies: userRoleDoc.data().purchasedPolicies
                    ? [...userRoleDoc.data().purchasedPolicies, policyPurchase]
                    : [policyPurchase],
            });

            console.log('Purchase successfully added to user document!');
        } catch (error) {
            console.log('Error processing purchase:', error);
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Checkout Page</h2>
            <div className='flex' >
                <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg  bg-slate-200 ">
                    {policy ? (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-900">{policy.name}</h3>
                            <p className="text-lg text-gray-700">{policy.description}</p>
                            <div className="flex flex-wrap gap-4">
                                <p className="text-md text-gray-600">Category: <span className="font-semibold text-gray-800">{policy.category}</span></p>
                                <p className="text-md text-gray-600">Coverage: <span className="font-semibold text-gray-800">{policy.coverage}</span></p>
                                <p className="text-md text-gray-600">Price: <span className="font-semibold text-gray-800">${policy.price}</span></p>
                                <p className="text-md text-gray-600">Type: <span className="font-semibold text-gray-800">{policy.type}</span></p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-lg text-red-500">Policy not found</p>
                    )}
                </div>
                <div>
                    <div className="max-w-md mx-auto p-8 rounded-lg shadow-md  bg-slate-200">
                        <h2 className="text-3xl font-semibold text-center mb-6">Payment Details</h2>
                        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="cardHolderName" className="block text-lg font-medium text-gray-700">
                                    Card Holder Name
                                </label>
                                <input
                                    type="text"
                                    id="cardHolderName"
                                    value={cardHolderName}
                                    onChange={(e) => setCardHolderName(e.target.value)}
                                    required
                                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Card Holder Name"
                                />
                            </div>


                            <div>
                                <label htmlFor="cardNumber" className="block text-lg font-medium text-gray-700">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Card Number"
                                />
                            </div>


                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="expiryDate" className="block text-lg font-medium text-gray-700">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="month"
                                        id="expiryDate"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        required
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label htmlFor="cvv" className="block text-lg font-medium text-gray-700">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        required
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter CVV"
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => handleCheckout(userId,id)}
                                    type="submit"
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Submit Payment Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};
