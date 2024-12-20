// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const Navbar = () => {
  const [myUserRole, setMyUserRole] = useState("");
  const user = auth.currentUser;
  console.log(user, "----user");

  const getRoles = async () => {
    const docRef = doc(db, "roles", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userRole = userData.role;
      setMyUserRole(userRole);
      console.log("User role:", userRole);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  const activeClass =
    "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 ";
  const inActiveClass =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("User Logged Out!");
    });
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b mb-4 border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/845/443/non_2x/fitness-tracker-for-fitness-equipment-fitness-tracker-icon-suitable-for-apps-website-developer-graphic-designer-needs-on-white-background-free-vector.jpg"
              className="h-8"
              alt=" Logo"
            />
            <span className="self-center font-semibold whitespace-nowrap text-4xl text-blue-800 dark:text-white">
              Insurance Domain
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

              < li >
                <NavLink
                  to="/Home"
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allpolicies"
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                  aria-current="page"
                >
                  Policies
                </NavLink>
              </li>
              {myUserRole == "user" && (
                <li>
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      isActive ? activeClass : inActiveClass
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {/* <li>
                <NavLink
                  to="/workouts"
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  compare
                </NavLink>
              </li> */}
              {myUserRole != 'user' && (
                <li>
                  <NavLink
                    to="/allusers"
                    className={({ isActive }) =>
                      isActive ? activeClass : inActiveClass
                    }
                  >
                    {(myUserRole === 'agent') ?

                      ( <span>Agent Dashboard</span> )
                      :
                      ( <span>Admin Dashboard</span>)
                    }
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  My profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </>
  );
};
