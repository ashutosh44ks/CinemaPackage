import { useState, useEffect, useMemo } from "react";
import { api, useUserContext } from "../../utils";
import { Heading } from "../../common";
import Banner from "./components/Banner";
import Steps from "./components/Steps";
import GenreMenu from "./components/GenreMenu";
import CratesContainer from "./components/CratesContainer";
import PremiumCratesContainer from "./components/PremiumCratesContainer";
import Testimonials from "./components/Testimonials";

const Packages = () => {
  const { loggedUser } = useUserContext();

  const [loading, setLoading] = useState(true);
  const [crates, setCrates] = useState([]);
  const [filteredCrates, setFilteredCrates] = useState([]);
  const [premiumLoading, setPremiumLoading] = useState(true);
  const [premiumCrates, setPremiumCrates] = useState([]);

  const getCrates = async () => {
    try {
      const { data } = await api.get("/crates");
      console.log(data.result);
      // show only crates that have not expired
      const temp = data.result.filter((item) => {
        if (!item.endDate) return true;
        if (+new Date(item.endDate) >= +new Date()) return true;
      });
      setCrates(temp);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getPremiumCrates = async () => {
    try {
      const { data } = await api.get("/allpremiumCrates");
      console.log(data.result);
      setPremiumCrates(data.result);
    } catch (error) {
      console.log(error);
    }
    setPremiumLoading(false);
  };
  useEffect(() => {
    getCrates();
    getPremiumCrates();
  }, []);

  const genre = useMemo(
    () => ["All", "Action", "Comedy", "Drama", "Thriller", "Others"],
    []
  );
  const [activeGenreIndex, setActiveGenreIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      if (activeGenreIndex === 0) setFilteredCrates([...crates]);
      else
        setFilteredCrates(
          crates.filter((item) => item.genre === genre[activeGenreIndex])
        );
    }
  }, [activeGenreIndex, loading, crates, genre]);

  return (
    <div>
      <Banner />
      {loggedUser._id === "" && <Steps />}
      <div className="my-20">
        <div>
          <Heading level={2} className="text-center mb-2">
            Unwrap Entertainment with Our Curated{" "}
            <span className="text-yellow">Crates</span>
          </Heading>
          <p className="text-center text-grey">
            Dive into a world of cinematic adventures! Explore our themed movie
            and TV show selections - the perfect way to start your next
            binge-watching marathon.
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <GenreMenu
            genre={genre}
            activeGenreIndex={activeGenreIndex}
            setActiveGenreIndex={setActiveGenreIndex}
          />
        </div>
        <CratesContainer loading={loading} filteredCrates={filteredCrates} />
      </div>
      <div className="my-20">
        <div>
          <Heading level={2} className="text-center mb-2">
            Unlock Exclusive Content with Our{" "}
            <span className="text-primary">Premium Crates</span>
          </Heading>
          <p className="text-center text-grey">
            Level up your entertainment with exclusive content! Our Premium
            Crates offer access to hidden gems and highly-anticipated titles,
            taking your movie and TV nights to the next level.
          </p>
        </div>
        <PremiumCratesContainer
          loading={premiumLoading}
          premiumCrates={premiumCrates}
        />
      </div>
      <Testimonials />
    </div>
  );
};

export default Packages;
