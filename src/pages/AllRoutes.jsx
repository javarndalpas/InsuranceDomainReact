import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import { UserDashboard } from './UserDashboard'
import { AdminDashboard } from './AdminDashboard'
import { Home } from './Home'
import { AllPolicies } from './AllPolicies'
import { Signup } from './Signup'
import Signin from './Signin'
import AgentDashboard from './AgentDashboard'
import { Profile } from './profile'
import { CheckoutPage } from './CheckoutPage'
import { AddPolicies } from './AddPolicies'
import { AllUsers } from './AllUsers'
import { UserDetails } from './UserDetails'

export const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/user' element={<UserDashboard />} />
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/agent' element={<AgentDashboard />} />
                <Route path='/allpolicies' element={<AllPolicies />} />
                <Route path='/allusers' element={<AllUsers />} />
                <Route path='/addpolicies' element={<AddPolicies />} />
                <Route path='/userdetails/:id' element={<UserDetails />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/checkout/:id' element={<CheckoutPage />} />
                <Route path='/' element={<Signin />} />
            </Routes>
        </>
    )
}
