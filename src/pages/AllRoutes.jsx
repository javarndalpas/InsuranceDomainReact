import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserDashboard } from './UserDashboard'
import { AdminDashboard } from './AdminDashboard'
import { Home } from './Home'

export const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/user' element={<UserDashboard />} />
                <Route path='/admin' element={<AdminDashboard />} />
            </Routes>
        </>
    )
}
