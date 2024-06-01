import { Link } from "react-router-dom";
import HomePageLayout from "../../components/HomePageLayout";
import { images } from "../../constants";

const LandingPage = () => {
  return (
    <HomePageLayout>
      <div
        style={{ "--image-url": `url(${images.BackgroundImageLandingPage})` }}
        className="w-full -mb-9 h-[600px] bg-[image:var(--image-url)] bg-cover"
      >
        <div className="text-white mx-auto px-80 text-center pt-12 flex flex-col gap-5">
          <h1 className="text-[54px] font-extrabold tracking-wide">
            Unlock Your Solar Potential: Solar Power Estimation & Finance
            Analysis
          </h1>
          <h3 className="text-xl font-bold">
            Free Solar Energy Estimation & Financing. Power your future,
            affordably
          </h3>
          <div className="text-white text-2xl font-bold pt-8 flex justify-around">
            <Link
              className="border-[3px] px-6 py-3 rounded-full hover:bg-white hover:text-light-hard hover:border-light-hard transition-colors duration-300"
              to={"/about"}
            >
              Contact Us
            </Link>
            <Link
              className="border-[3px] px-6 py-3 rounded-full hover:bg-white hover:text-light-hard hover:border-light-hard transition-colors duration-300"
              to={"/create-new-project"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};
export default LandingPage;
