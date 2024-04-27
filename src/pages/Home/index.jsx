import { useState, useMemo } from "react";
import { api, useUserQuery } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "../../common";
import Banner from "./components/Banner";
import Steps from "./components/Steps";
import GenreMenu from "./components/GenreMenu";
import PremiumCratesContainer from "./components/PremiumCratesContainer";
import CratesContainer from "./components/CratesContainer";
import Testimonials from "./components/Testimonials";

const Packages = () => {
  const { loggedUser } = useUserQuery();

  const genre = useMemo(
    () => ["All", "Action", "Comedy", "Drama", "Thriller", "Others"],
    []
  );
  const [activeGenreIndex, setActiveGenreIndex] = useState(0);

  const getCrates = async () => {
    let activeGenre = genre[activeGenreIndex].toLowerCase();
    if (activeGenre === "all") activeGenre = "";
    const {
      data: { data },
    } = await api.get(`/crates/standard?genre=${activeGenre}`);
    return data;
  };
  const getLimitedCrates = async () => {
    const {
      data: { data },
    } = await api.get("/crates/limited");
    return data;
  };
  const getPremiumCrates = async () => {
    const {
      data: { data },
    } = await api.get("/crates/premium");
    return data;
  };

  const standardCratesQuery = useQuery({
    queryKey: ["crates", "standard", genre[activeGenreIndex]],
    queryFn: getCrates,
  });
  const limitedCratesQuery = useQuery({
    queryKey: ["crates", "limited"],
    queryFn: getLimitedCrates,
  });
  const premiumCratesQuery = useQuery({
    queryKey: ["crates", "premium"],
    queryFn: getPremiumCrates,
  });

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
        <CratesContainer
          loading={standardCratesQuery.isLoading}
          crates={standardCratesQuery?.data?.result || []}
          type="standard"
        />
      </div>
      <div className="my-20">
        <div>
          <Heading level={2} className="text-center text-primary mb-2">
            Limited Crates
          </Heading>
          <p className="text-center text-grey">
            Get your hands on our Limited Crates! These special collections are
            available for a limited time only, so don&apos;t miss out on the
            chance to discover hidden gems and cult classics.
          </p>
        </div>
        <CratesContainer
          loading={limitedCratesQuery.isLoading}
          crates={limitedCratesQuery?.data?.result || []}
          type="limited"
        />
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
          loading={premiumCratesQuery.isLoading}
          premiumCrates={premiumCratesQuery?.data?.result || []}
        />
      </div>
      <Testimonials />
    </div>
  );
};

export default Packages;
