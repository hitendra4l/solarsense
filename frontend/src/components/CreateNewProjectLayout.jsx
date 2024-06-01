import Footer from "./Footer";
import NavbarDynamic from "./NavbarDynamic";

const CreateNewProjectLayout = ({ children }) => {
  return (
    <div className="container mx-auto">
      <NavbarDynamic path={"/all-projects"} buttonName={"See All Project"} />
      {children}
      <Footer />
    </div>
  );
};
export default CreateNewProjectLayout;
