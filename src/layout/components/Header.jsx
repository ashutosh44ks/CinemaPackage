import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useUserQuery from "../../utils/hooks/useUserQuery";
import { Breadcrumbs, Button } from "../../common";
import {
  publicHeaderRoutes,
  protectedHeaderRoutes,
  layoutPadding,
} from "../constants";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbShoppingCartDollar } from "react-icons/tb";
import { PiWallet } from "react-icons/pi";

const Menu = ({ routeList, activeRoute }) => {
  return routeList.map((route) => (
    <Link
      className={
        activeRoute === route.link
          ? "after:content-[''] after:block after:w-4 after:absolute after:h-[0.1rem] after:bg-primary"
          : ""
      }
      to={route.link}
      key={route.link}
    >
      {route.name}
    </Link>
  ));
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { loggedUser } = useUserQuery();

  const logout = () => {
    localStorage.removeItem("cinemaToken");
    localStorage.removeItem("cinemaRefreshToken");
    queryClient.removeQueries(["profile", "short"]);
    navigate("/auth/login");
  };

  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (showSidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showSidebar]);

  const [activeRoute, setActiveRoute] = useState("");
  useEffect(() => {
    setActiveRoute(location.pathname);
    if (showSidebar) setShowSidebar(false);
  }, [location]);

  return (
    <>
      <header
        className={`flex justify-between items-center gap-6 min-[480px]:gap-4 ${layoutPadding(
          "py-4"
        )}`}
      >
        <img
          src="/vite.svg"
          alt="logo"
          className="h-[4.5rem] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="hidden min-[900px]:flex items-center gap-6 min-[900px]:gap-4 min-[950px]:gap-6">
          <Menu
            routeList={
              loggedUser._id === "" ? publicHeaderRoutes : protectedHeaderRoutes
            }
            activeRoute={activeRoute}
          />
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-6 min-[900px]:gap-4 min-[950px]:gap-6">
            {loggedUser._id === "" ? (
              <>
                <Button
                  theme="transparent"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                  size="md-rect"
                >
                  Login
                </Button>
                <Button
                  theme="primary"
                  onClick={() => {
                    navigate("/auth/register");
                  }}
                  size="md-rect"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  theme="dark-noborder"
                  onClick={() => {
                    navigate("/store");
                  }}
                  className="font-medium flex items-center gap-2"
                >
                  <PiWallet />
                  {location.pathname.includes("payment") ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-white" />
                  ) : (
                    `$${loggedUser?.wallet?.toFixed(2)}`
                  )}{" "}
                  credits
                </Button>
                {loggedUser.id !== "" && (
                  <Link className="flex gap-2 items-center" to="/cart">
                    <TbShoppingCartDollar />
                    Cart
                  </Link>
                )}
                <div className="flex gap-2 items-center group py-4">
                  <FaRegUserCircle />
                  <div className="flex gap-1 items-center">
                    {loggedUser.name}
                    <MdKeyboardArrowDown className="text-xl" />
                  </div>
                  <ul className="group-hover:block hidden absolute z-10 right-6 min-[950px]:right-14 xl:right-[5.5rem] 2xl:right-[7.5rem] top-20 w-36 bg-dark2 border-dark border-r-4 border-t-0">
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-dark2 font-medium"
                      onClick={() => navigate("/my-account/account-details")}
                    >
                      My Profile
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-dark2 font-medium"
                      onClick={() => navigate("/store")}
                    >
                      Store
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-dark2 font-medium rounded-bl-sm rounded-br-sm"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="p-4 sm:p-6 text-xl sm:hidden text-white cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose /> : <GiHamburgerMenu />}
        </div>
      </header>
      <Breadcrumbs />
      <Sidebar
        showSidebar={showSidebar}
        activeRoute={activeRoute}
        loggedUser={loggedUser}
        logout={logout}
      />
    </>
  );
};

export default Header;
