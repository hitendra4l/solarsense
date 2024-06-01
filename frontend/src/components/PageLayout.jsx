import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PageLayout = () => {
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex gap-3 px-6">
      <Sidebar />
      <div className="flex-grow mt-6">
        <Outlet />
      </div>
    </div>
  );
};
export default PageLayout;
