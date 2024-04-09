import { useState, useEffect } from "react";
import { api, useUserContext } from "../../utils";
import Banner from "./components/Banner";
import Steps from "./components/Steps";
// import PackageContainer from "./components/PackageContainer";
// import SpecialPackageContainer from "./components/SpecialPackageContainer";
// import PackageMenu from "./components/PackageMenu";
import Testimonials from "./components/Testimonials";
import "./packages.css";

const Packages = () => {
  const { loggedUser } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [specialLoading, setSpecialLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [specialPackages, setSpecialPackages] = useState([]);

  const getPackages = async () => {
    try {
      const { data } = await api.get("/allCrates");
      console.log(data.dta);
      // show only packages that have not expired
      const temp = data.dta.filter(
        (item) => +new Date(item.endDate) >= +new Date()
      );
      setPackages(temp);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getSpecialPackages = async () => {
    try {
      const { data } = await api.get("/user/allSpecialPackages");
      console.log(data.dta);
      setSpecialPackages(data.dta);
    } catch (error) {
      console.log(error);
    }
    setSpecialLoading(false);
  };
  useEffect(() => {
    getPackages();
    getSpecialPackages();
  }, []);

  const sports = ["All", "NBA", "NHL", "NFL", "NCAAB", "Others"];
  const [activeSportsIndex, setActiveSportsIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      if (activeSportsIndex === 0) setFilteredPackages([...packages]);
      else
        setFilteredPackages(
          packages.filter((item) => item.sports === sports[activeSportsIndex])
        );
    }
  }, [activeSportsIndex, loading]);

  return (
    <div>
      <Banner />
      {loggedUser._id === "" && <Steps />}
      {/* <div className="my-20">
        <div>
          <h2 className="font-medium text-center mb-2">
            Get Started with <span className="text-yellow">Our Packages</span>
          </h2>
          <p className="text-center text-lightgrey2">
            Embark on your winning adventure now! Explore our tailored packages
            to kickstart your gaming journey with an unbeatable edge.
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <PackageMenu
            sports={sports}
            activeSportsIndex={activeSportsIndex}
            setActiveSportsIndex={setActiveSportsIndex}
          />
        </div>
        <PackageContainer
          loading={loading}
          filteredPackages={filteredPackages}
        />
      </div>
      <div className="my-20">
        <div>
          <h2 className="font-medium text-center mb-2">
            Get exclusive JordansPicks content using our{" "}
            <span className="text-yellow">Premium Packages</span>
          </h2>
          <p className="text-center text-lightgrey2">
            These packages are designed to give you the best of the best. Get
            access to our premium picks and take your gaming experience to the
            next level.
          </p>
        </div>
        <SpecialPackageContainer
          loading={specialLoading}
          specialPackages={specialPackages}
        />
      </div> */}
      <Testimonials />
    </div>
  );
};

export default Packages;
