/* eslint-disable react/prop-types */
import { Route, Routes, Navigate } from "react-router-dom";
import { UserDashboard } from "./UserDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { Home } from "./Home";
import { AllPolicies } from "./AllPolicies";
import { Signup } from "./Signup";
import Signin from "./Signin";
import AgentDashboard from "./AgentDashboard";
import { Profile } from "./Profile";
import { CheckoutPage } from "./CheckoutPage";
import { AddPolicies } from "./AddPolicies";
import { AllUsers } from "./AllUsers";
import { UserDetails } from "./UserDetails";
import { auth } from "../firebase/config";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/" />;
};

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent"
          element={
            <PrivateRoute>
              <AgentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/allpolicies"
          element={
            <PrivateRoute>
              <AllPolicies />
            </PrivateRoute>
          }
        />
        <Route
          path="/allusers"
          element={
            <PrivateRoute>
              <AllUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/addpolicies"
          element={
            <PrivateRoute>
              <AddPolicies />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdetails/:id"
          element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout/:id"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
