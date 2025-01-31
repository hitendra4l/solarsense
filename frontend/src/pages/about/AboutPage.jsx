import HomePageLayout from "../../components/HomePageLayout";
import { images } from "../../constants";

const TEAM = [
  {
    name: "Hitendra Kumar Verma",
    image: images.HitendraImage,
    about: "Electrical Engineer, IIT Roorkee",
  },
  {
    name: "Shyam Sundar Paraswal",
    image: images.ShyamImage,
    about: "Electrical Engineer, IIT Roorkee",
  },
  {
    name: "Nishant Jorwal",
    image: images.NishantImage,
    about: "Electrical Engineer, IIT Roorkee",
  },
  {
    name: "Nitin",
    image: images.NitinImage,
    about: "Electrical Engineer, IIT Roorkee",
  },
];

const AboutPage = () => {
  return (
    <HomePageLayout>
      <div className="px-6 mt-10 min-h-[70vh] flex justify-center items-center">
        <div className="w-fit mx-auto flex flex-col gap-8 items-center">
          <p className="text-2xl font-bold">
            The Passionate People Behind SolarSense
          </p>
          <p className="text-xl w-3/4 text-center">
            {`Our team's passion translates into a relentless dedication to
            providing exceptional customer service and innovative solar
            solutions.`}
          </p>
          <div className="flex gap-x-14">
            {TEAM.map((item) => {
              return (
                <div key={item.name} className="flex flex-col items-center">
                  <img
                    src={item.image}
                    alt="team member"
                    className="w-44 h-44 rounded-full object-cover"
                  />
                  <p className="text-lg font-bold">{item.name}</p>
                  <p>Electrical Engineer, IIT Roorkee</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};
export default AboutPage;
