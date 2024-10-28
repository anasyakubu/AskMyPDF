// import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoGlobeOutline } from "react-icons/io5";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="">
        <div className="p-10">
          <div className="bg-black p-5 pt-10 rounded-lg text-white">
            <div className="p-1 space-y-2 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
              {/* One */}
              <div className="">
                <p className="text-sm">
                  <a href="/">About Us</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Feedbacks</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Communities</a>
                </p>
              </div>
              {/* Two */}
              <div className="">
                <p className="text-sm">
                  <a href="/">Trust & Safety Issues</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Help & Support</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/" target="_blank">
                    Developer
                  </a>
                </p>
              </div>
              {/* Three */}
              <div className="">
                <p className="text-sm">
                  <a href="/">Terms of Services</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Privacy Policy</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Faq</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Profile</a>
                </p>
              </div>
              {/* Four */}
              <div className="">
                <p className="text-sm">
                  <a href="/">Contact Us</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Download</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">Github</a>
                </p>
                <p className="mt-3 text-sm">
                  <a href="/">X</a>
                </p>
              </div>
            </div>
            {/*  */}
            <div className="mt-10 mb-5">
              <div className="p-1 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
                <div className="icons">
                  <p className="flex">
                    {/* <span>Fellow me</span> */}
                    <span
                      className="flex justify-around"
                      //style={{ marginLeft: "20px" }}
                    >
                      <a
                        href="https://www.instagram.com/anass.developer/"
                        className="p-3 bg-white rounded-full m-2 icon"
                        target="_blank"
                      >
                        <FaInstagram className="text-black" />
                      </a>
                      <a
                        href="https://twitter.com/___anaaasss"
                        className="p-3 bg-white rounded-full m-2 icon"
                        target="_blank"
                      >
                        <BsTwitterX className="text-black" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/anas-yakubu-02a20725a/"
                        className="p-3 bg-white rounded-full m-2 icon"
                        target="_blank"
                      >
                        <FaLinkedin className="text-black" />
                      </a>
                      <a
                        href="https://github.com/anasyakubu"
                        className="p-3 bg-white rounded-full m-2 icon"
                        target="_blank"
                      >
                        <FaGithub className="text-black" />
                      </a>
                      <a
                        href="https://portfolio-beta-psi.vercel.app/"
                        className="p-3 bg-white rounded-full m-2 icon"
                        target="_blank"
                      >
                        <IoGlobeOutline className="text-black" />
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="m-5 border border-b border-white"></div>
            {/* copy right */}
            <div className="mt-5 p-3 text-center">
              <p className="text-sm">
                {/* <span>&#169;</span> */}
                <span>2024 </span>
                <span>Made with ❤️ by </span>

                <a
                  className="underline"
                  href="https://portfolio-beta-psi.vercel.app/"
                  target="_blank"
                >
                  Anas Yakubu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
