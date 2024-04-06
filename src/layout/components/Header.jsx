import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useUserContext } from "../../utils/useUserContext";
import { paddingX as layoutPadding } from "./layoutClasses";
import Breadcrumbs from "../../common/Breadcrumbs";
import Button from "../../common/Button";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbShoppingCartDollar } from "react-icons/tb";
import { PiWallet } from "react-icons/pi";

const Menu = ({ route, activeRoute }) => {
  return (
    <Link
      className={
        activeRoute === route.link
          ? "after:content-none after:block after:w-4 after:absolute after:h-[0.1rem] after:bg-yellow"
          : ""
      }
      to={route.link}
    >
      {route.name}
    </Link>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUser, setLoggedUser, getProfileShort } = useUserContext();

  const logout = () => {
    localStorage.removeItem("cinemaToken");
    localStorage.removeItem("cinemaRefreshToken");
    setLoggedUser({
      _id: "",
      name: "",
      wallet: 0,
      defaultDiscount: 0,
      cart: [],
      isAddress: false,
    });
    navigate("/auth/login");
  };

  const publicRoutes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "FAQs",
      link: "/faq",
    },
  ];
  const protectedRoutes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "My Crates",
      link: "/my-account/my-crates",
    },
    {
      name: "Store",
      link: "/store",
    },
  ];

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

  useEffect(() => {
    if (loggedUser._id !== "") getProfileShort();
  }, [loggedUser._id]);

  return (
    <>
      <header
        className={`flex justify-between items-center gap-6 min-[480px]:gap-4 ${layoutPadding(
          "py-4"
        )} bg-darkblack text-white`}
      >
        <img
          src="/assets/logo.png"
          alt="logo"
          className="h-[4.5rem] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="hidden min-[900px]:flex items-center gap-6 min-[900px]:gap-4 min-[950px]:gap-6">
          {loggedUser._id === ""
            ? publicRoutes.map((route) => (
                <Menu
                  route={route}
                  activeRoute={activeRoute}
                  key={route.link}
                />
              ))
            : protectedRoutes.map((route) => (
                <Menu
                  route={route}
                  activeRoute={activeRoute}
                  key={route.link}
                />
              ))}
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
                  theme="yellow"
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
                  <ul className="group-hover:block hidden absolute z-10 right-6 min-[950px]:right-14 xl:right-[5.5rem] 2xl:right-[7.5rem] top-20 w-36 bg-darkblack border-dark border-r-4 border-t-0">
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium"
                      onClick={() => navigate("/my-account/account-details")}
                    >
                      My Profile
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium"
                      onClick={() => navigate("/store")}
                    >
                      Store
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium rounded-bl-sm rounded-br-sm"
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
