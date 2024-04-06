import { Outlet } from "react-router-dom";
import { paddingX as layoutPadding } from "./components/layoutClasses";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className={`${layoutPadding("py-16")} ease-in-out duration-200`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
