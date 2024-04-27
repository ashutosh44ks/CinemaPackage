import { useNavigate } from "react-router-dom";
import { Button, Heading } from "../../../common";

const PremiumCrateBox = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[25rem] border border-primary rounded-2xl">
      <div className="rounded-t-2xl bg-primary text-dark w-full text-center p-2 xs:py-4 xs:px-4 min-[500px]:px-6 font-medium line-clamp-1 tracking-widest">
        PREMIUM SUBSCRIPTION
      </div>
      <div className="rounded-b-2xl bg-dark p-4 xs:p-8">
        <div className="h-[8rem] flex flex-col justify-center">
          <Heading level={2} className="text-center limit-to-2-lines">
            {item.name}
          </Heading>
          <Heading level={5} className="text-center limit-to-2-lines">
            {item.casts.map((cast, index) => (
              <span key={index}>
                {cast}
                {index < item.casts.length - 1 ? ", " : ""}
              </span>
            ))}
          </Heading>
        </div>
        <hr className="my-6 mx-6 border-grey" />
        <div className="text-center line-clamp-5 break-words h-24">
          {item.plot}
        </div>
        <div className="mt-8">
          <Button
            className="w-full font-medium"
            theme="primary"
            rounded="md"
            size="md"
            onClick={() => {
              navigate("/premium-crates/" + item._id);
            }}
          >
            View Pricings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumCrateBox;
