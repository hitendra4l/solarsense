import {
  FaFacebookSquare,
  FaYoutube,
  FaInstagramSquare,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { images } from "../constants";

const Footer = () => {
  return (
    <div className="mt-9 w-full bg-light-bg px-6 flex justify-between items-center pt-8 pb-5">
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex w-full justify-between">
          <img src={images.Logo} alt="logo" />
          <div className="flex w-[calc(100%-400px)] justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-xl text-dark-hard font-bold">Contact us:</p>
              <div className="flex flex-col text-dark-soft">
                <a href="tel:+">+91 7742441347</a>
                <a href="mailto:">hitendra_kv@ee.iitr.ac.in</a>
                <a href="mailto:">shyam_sp@ee.iitr.ac.in</a>
                <a href="mailto:">nishant_j@ee.iitr.ac.in</a>
                <a href="mailto:">nitin@ee.iitr.ac.in</a>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl text-dark-hard font-bold">Our services:</p>
              <div className="flex flex-col text-dark-soft">
                <p>Data visualization</p>
                <p>Energy Estimation</p>
                <p>Finance Calculation</p>
                <p>Solar Report</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl text-dark-hard font-bold">Follow us on:</p>
              <div className="flex flex-wrap gap-3.5 w-32">
                <FaLinkedinIn className="w-8 h-8 text-dark-soft" />
                <FaFacebookSquare className="w-8 h-8 text-dark-soft" />
                <FaSquareXTwitter className="w-8 h-8 text-dark-soft" />
                <FaYoutube className="w-8 h-8 text-dark-soft" />
                <FaInstagramSquare className="w-8 h-8 text-dark-soft" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl text-dark-hard font-bold">Our address:</p>
              <div className="flex flex-col gap-1 text-dark-soft">
                <p className="w-52">
                  Electrical Engineering Department, IIT Roorkee, Uttarakhand
                </p>
                <p>Pin Code : 247667 </p>
              </div>
            </div>
          </div>
        </div>
        <p>SolarSense © Copyright 2024. All rights reserved. </p>
      </div>
    </div>
  );
};
export default Footer;
