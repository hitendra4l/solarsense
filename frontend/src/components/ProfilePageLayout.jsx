import Footer from "./Footer";
import NavbarDynamic from "./NavbarDynamic";

const ProfilePageLayout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col h-[100vh] justify-between">
        <NavbarDynamic
          path={"/create-new-project"}
          buttonName={"+ Create Project"}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default ProfilePageLayout;
