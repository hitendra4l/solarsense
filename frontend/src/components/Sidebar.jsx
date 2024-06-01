import { createContext, useContext, useState } from "react";
import { images } from "../constants";
import { MdGridView } from "react-icons/md";
// import { BsHouseGear } from "react-icons/bs";
import { BsClipboard2Data } from "react-icons/bs";
import { MdOutlineSolarPower } from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProjectState } from "../contexts/useProjectState";
const SidebarContext = createContext();

export default function Sidebar() {
  const navigate = useNavigate();
  const { selectedProject } = useProjectState();
  const userState = useSelector((state) => state.user);
  const NAV_ITEMS = [
    {
      name: "Project Overview",
      icon: <MdGridView className="text-white w-7 h-7" />,
      path: `/project/${selectedProject?._id}/project-overview`,
    },
    // {
    //   name: "PV Config",
    //   icon: <BsHouseGear className="text-white w-7 h-7" />,
    //   path: `/project/${selectedProject?._id}/pv-config`,
    // },
    {
      name: "Meteo Data",
      icon: <BsClipboard2Data className="text-white w-7 h-7" />,
      path: `/project/${selectedProject?._id}/meteo-data`,
    },
    {
      name: "Energy Estimation",
      icon: <MdOutlineSolarPower className="text-white w-7 h-7" />,
      path: `/project/${selectedProject?._id}/energy-estimation`,
    },
    {
      name: "Finance",
      icon: <HiOutlineBanknotes className="text-white w-7 h-7" />,
      path: `/project/${selectedProject?._id}/finance`,
    },
    {
      name: "Generate Report",
      icon: <CgNotes className="text-white w-7 h-7" />,
      path: `/project/${selectedProject?._id}/generate-report`,
    },
  ];
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <aside className="h-screen flex items-center w-fit sticky top-0 z-[100] print:hidden">
        <nav className="h-[calc(100%-48px)] flex flex-col justify-between items-center py-6 bg-dark-soft rounded-2xl relative group/expand">
          <div className="flex justify-between items-center">
            <Link to={"/"}>
              <img
                src={expanded ? images.LogoWhite : images.LogoWhiteSmall}
                className={`overflow-hidden transition-all`}
              />
            </Link>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="absolute bg-white rounded-full w-6 h-6 -right-3 top-14 opacity-0 group-hover/expand:opacity-100"
            >
              {expanded ? (
                <IoIosArrowDropleftCircle className="text-light-soft w-full h-full hover:text-light-hard transition-colors duration-200" />
              ) : (
                <IoIosArrowDroprightCircle className="text-light-soft w-full h-full hover:text-light-hard transition-colors duration-200" />
              )}
            </button>
          </div>

          <nav className="flex flex-col px-3 self-start">
            <SidebarContext.Provider value={{ expanded }}>
              {NAV_ITEMS.map((item) => {
                return (
                  <SidebarItem
                    key={item.name}
                    icon={item.icon}
                    text={item.name}
                    path={item.path}
                    alert
                  />
                );
              })}
            </SidebarContext.Provider>
          </nav>

          <button
            className={`border-t flex p-3 items-center hover:bg-dark-hard transition-colors duration-200 ${
              expanded && "self-start"
            }`}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img
              src={
                userState.userInfo.avatar
                  ? import.meta.env.VITE_UPLOAD_FOLDER_BASE_URL +
                    userState?.userInfo?.avatar
                  : images.DefaultAvatar
              }
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all text-white ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-start">
                  {userState.userInfo?.name}
                </h4>
                <p className="text-xs text-start">
                  {userState.userInfo?.email}
                </p>
              </div>
            </div>
          </button>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, path }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <NavLink
      exact
      to={path}
      className={({ isActive }) =>
        isActive ? "active-sidebar-item group" : "sidebar-item group"
      }
    >
      {icon}
      <span
        className={`overflow-hidden transition-all text-white ${
          expanded ? "w-full ml-3" : "w-0 hidden"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`absolute left-full w-fit text-nowrap rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
