import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAllProjectsData } from "../../services/queries/projects";
import { useProjectState } from "../../contexts/useProjectState";
import ProfilePageLayout from "../../components/ProfilePageLayout";

const AllProjects = () => {
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state) => state.user);
  const { setSelectedProject } = useProjectState();

  const { data: allProjects } = useAllProjectsData({ token: user?.token });
  console.log("allProjects", allProjects);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  console.log("allProjects", allProjects);
  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <ProfilePageLayout>
      <div className="">
        <h1 className="text-3xl font-bold mt-20 pl-20 mb-5">All Projects</h1>
        <table className="table-auto w-[90%] mx-auto mb-52 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-dark-soft text-white">
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Latitude</th>
              <th className="px-4 py-2">Longitude</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {allProjects?.map((project, index) => (
              <tr
                onClick={() => {
                  setSelectedProject(project);
                  navigate(`/project/${project?._id}/project-overview`);
                }}
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#E4E5EA]" : "bg-white"
                } hover:cursor-pointer`}
              >
                <td className="border px-4 py-2">{project.name}</td>
                <td className="border px-4 py-2">{project.latitude}</td>
                <td className="border px-4 py-2">{project.longitude}</td>
                <td className="border px-4 py-2">
                  {formatDate(project.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProfilePageLayout>
  );
};
export default AllProjects;
