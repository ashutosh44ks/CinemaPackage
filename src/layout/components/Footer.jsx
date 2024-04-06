import { useNavigate } from "react-router-dom";
import { footerRoutes, layoutPadding } from "../constants";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const socials = [
    <FaFacebookF key="fb" />,
    <FaTwitter key="x" />,
    <FaInstagram key="insta" />,
    <FaYoutube key="yt" />,
  ];

  return (
    <footer
      className={`flex flex-col justify-center items-center ${layoutPadding(
        "py-4"
      )}`}
    >
      <div className="flex justify-between items-center gap-x-8 w-full flex-col md:flex-row md:mb-4">
        <img
          src="/vite.svg"
          alt="logo"
          className="h-20 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <ul className="xs:flex">
          {footerRoutes.map((route) => (
            <li
              key={route.name}
              className="py-2 px-2 min-[480px]:px-3 min-[950px]:px-4 cursor-pointer ease-in-out duration-200 text-center hover:text-primary"
              onClick={() => navigate(route.link)}
            >
              {route.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center gap-x-8 gap-y-2 w-full flex-col-reverse md:flex-row">
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} CinemaCrate. All Rights
          Reserved.
        </p>
        <ul className="flex items-center">
          {socials.map((social, index) => (
            <li
              key={index}
              className="py-2 px-4 cursor-pointer ease-in-out duration-200 text-center hover:text-primary"
            >
              {social}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
