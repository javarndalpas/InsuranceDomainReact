import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [policies, setPolicies] = useState([]);
  const policyRef = collection(db, "policies");
  const navigate = useNavigate()

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

  const navigateToAll =() =>{
    navigate('/allpolicies')
  }
  return (
    <div>
      <div className="px-4 py-6">
        <div className="home_container relative bg-white h-[700px]">
          <img src="https://img.lovepik.com/background/20211021/large/lovepik-blue-banner-posters-background-image_500361605.jpg" alt="" />
          <p className="absolute italic text-blue-100 text-4xl font-bold top-[250px] left-[250px]">
            Buy Insurance plans tailored for you!
          </p>
          <p className="absolute text-blue-100 italic text-4xl font-bold top-[350px] left-[250px]">Discover insurance plans as per your needs</p>
        </div>
        <div className='bg-black p-6 mb-4'>
          <button onClick={()=>navigateToAll()} type="button" className="text-white  bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 ">
            <svg aria-hidden="true" class="w-10 h-3 me-2 -ms-1" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z" fill="white" /></svg>
            Explore our best policies
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.length > 0 ? (
            policies.map((policy) => (
              <div key={policy.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{policy.name}</h2>
                <p className="text-gray-700"><strong>Category:</strong> {policy.category}</p>
                <p className="text-gray-700"><strong>Type:</strong> {policy.type}</p>
                <p className="text-gray-700"><strong>Coverage:</strong> {policy.coverage}</p>
                <p className="text-gray-700"><strong>Price:</strong> ${policy.price}</p>
                <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buy</button>
                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add to Compare</button>
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Review</button>
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


