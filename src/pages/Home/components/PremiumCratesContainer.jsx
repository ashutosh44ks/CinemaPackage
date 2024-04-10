import PremiumCrateBox from "./PremiumCrateBox";
import { RiLoader4Line } from "react-icons/ri";

const PremiumCratesContainer = ({ loading, premiumCrates }) => {
  return (
    <div
      className="flex flex-wrap gap-x-8 gap-y-16 justify-center mt-16"
      id="special"
    >
      {loading ? (
        [1, 2].map((item) => (
          <div
            className="w-[25rem] border bg-grey border-dark rounded-2xl h-[31rem] m-4 animate-skeleton flex justify-center items-center"
            key={item}
          >
            <RiLoader4Line className="text-4xl animate-spin text-grey" />
          </div>
        ))
      ) : premiumCrates.length > 0 ? (
        premiumCrates.map((item) => (
          <PremiumCrateBox item={item} key={item._id} />
        ))
      ) : (
        <div className="text-grey">
          No special crates available at this moment
        </div>
      )}
    </div>
  );
};

export default PremiumCratesContainer;
