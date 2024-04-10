import CrateBox from "./CrateBox";
import { RiLoader4Line } from "react-icons/ri";

const CratesContainer = ({ loading, filteredCrates }) => {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-16 justify-center mt-16">
      {loading ? (
        [1, 2, 3, 4].map((item) => (
          <div
            className="w-[25rem] border bg-grey border-dark rounded-2xl h-[31rem] m-4 animate-skeleton flex justify-center items-center"
            key={item}
          >
            <RiLoader4Line className="text-4xl animate-spin text-grey" />
          </div>
        ))
      ) : filteredCrates.length > 0 ? (
        filteredCrates.map((item) => <CrateBox item={item} key={item._id} />)
      ) : (
        <div className="text-grey">
          No content available for this genre yet. Check back soon!
        </div>
      )}
    </div>
  );
};

export default CratesContainer;
