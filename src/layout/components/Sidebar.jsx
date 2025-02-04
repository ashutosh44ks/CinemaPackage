import { useNavigate } from "react-router-dom";

const Sidebar = ({ showSidebar, activeRoute, loggedUser, logout }) => {
  const navigate = useNavigate();
  const data = [
    {
      name: "Home",
      link: "/",
      func: () => navigate("/"),
      show: true,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      func: () => navigate("/contact-us"),
      show: true,
    },
    {
      name: "FAQs",
      link: "/faq",
      func: () => navigate("/faq"),
      show: true,
    },
    {
      name: "Login",
      link: "/auth/login",
      func: () => navigate("/auth/login"),
      show: loggedUser._id === "",
    },
    {
      name: "Register",
      link: "/auth/register",
      func: () => navigate("/auth/register"),
      show: loggedUser._id === "",
    },
    {
      name: "My Crates",
      link: "/my-crates",
      func: () => navigate("/my-account/my-crates"),
      show: loggedUser._id !== "",
    },
    {
      name: "Cart",
      link: "/cart",
      func: () => navigate("/cart"),
      show: loggedUser._id !== "",
    },
    {
      name: "Store",
      link: "/store",
      func: () => navigate("/store"),
      show: loggedUser._id !== "",
    },
    {
      name: "Logout",
      func: logout,
      link: "#",
      show: loggedUser._id !== "",
    },
  ];
  return (
    <aside
      className={`fixed w-full bg-dark2 overflow-hidden z-50 flex flex-col justify-start items-center ease-in-out duration-500 ${
        showSidebar ? "h-[calc(100vh-3rem)] pt-8 sm:pt-0" : "h-0"
      }`}
    >
      {data.map((route, index) => (
        <div
          key={index}
          className={`${route.show ? "block" : "hidden"} ${
            activeRoute === route.link
              ? "after:content-[''] after:block after:w-4 after:absolute after:h-[0.1rem] after:bg-primary after:left-1/2 after:-translate-1/2"
              : "cursor-pointer"
          } text-center py-4 text-xl`}
          onClick={route.func}
        >
          {route.name}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
