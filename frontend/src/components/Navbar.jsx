import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { images } from "../constants/index.js";
import { logout } from "../store/actions/user.js";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);

  const [profileDropDown, setProfileDropDown] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="sticky top-0 left-0 right-0 w-full bg-light-bg px-6 flex justify-between items-center py-4 shadow-md z-50">
      <NavLink to={"/"}>
        <img src={images.Logo} alt="logo" />
      </NavLink>
      <nav className="flex gap-x-12 items-center">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "active-nav-item" : "nav-item"
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive ? "active-nav-item" : "nav-item"
          }
        >
          About
        </NavLink>

        <NavLink
          to={"/faq"}
          className={({ isActive }) =>
            isActive ? "active-nav-item" : "nav-item"
          }
        >
          FAQ
        </NavLink>

        {user ? (
          <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            <div className="relative group">
              <div className="flex flex-col items-center">
                <button
                  className="flex items-center gap-x-1 mt-5 lg:mt-0 border-blue-500 rounded-full transition-all duration-200"
                  onClick={() => setProfileDropDown(!profileDropDown)}
                >
                  <img
                    className="w-11 h-11 object-cover rounded-full border-2 border-white"
                    src={
                      user?.avatar
                        ? import.meta.env.VITE_UPLOAD_FOLDER_BASE_URL +
                          user?.avatar
                        : images.DefaultAvatar
                    }
                    alt=""
                  />
                </button>
                <div
                  className={`${
                    profileDropDown ? "block " : "hidden "
                  } lg:hidden transition-all duration-300 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                >
                  <ul className="bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        navigate("/profile");
                      }}
                      type="button"
                      className="hover:bg-light-hard focus:bg-light-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft w-full"
                    >
                      Profile page
                    </button>

                    <button
                      onClick={() => {
                        navigate("/create-new-project");
                      }}
                      type="button"
                      className="hover:bg-light-hard focus:bg-light-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      Create new project
                    </button>

                    <button
                      onClick={() => {
                        navigate("/all-projects");
                      }}
                      type="button"
                      className="hover:bg-light-hard focus:bg-light-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      All Projects
                    </button>

                    <button
                      type="button"
                      onClick={logoutHandler}
                      className="hover:bg-light-hard focus:bg-light-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to={"/signup"}
            className="text-lg font-extrabold text-white px-6 py-2 rounded-md bg-light-soft hover:bg-light-hard transition-colors duration-200"
          >
            Sign Up
          </Link>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
