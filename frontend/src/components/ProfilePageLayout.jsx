import Footer from "./Footer";
import NavbarDynamic from "./NavbarDynamic";

const ProfilePageLayout = ({ children }) => {
  return (
    <div className="container mx-auto">
      <NavbarDynamic
        path={"/create-new-project"}
        buttonName={"+ Create Project"}
      />
      {children}
      <Footer />
    </div>
  );
};
export default ProfilePageLayout;
