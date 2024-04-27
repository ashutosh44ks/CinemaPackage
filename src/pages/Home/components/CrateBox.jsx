import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserQuery, api, myToast } from "../../../utils";
import { Button, Heading } from "../../../common";
import LimitedCrateBoxHeader from "./LimitedCrateBoxHeader";

const CrateBox = ({ item, type }) => {
  const navigate = useNavigate();
  const { loggedUser, refetchUserQuery } = useUserQuery();
  const [cartText, setCartText] = useState("Add to Cart");

  const addToCart = async (packageId) => {
    try {
      const { data } = await api.post("/user/addItemToCart", { packageId });
      console.log(data);
      refetchUserQuery();
      myToast(data.msg, "success");
      setCartText("Added in Cart");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
      if (err?.response?.data?.error === "Item already in cart")
        setCartText("Already in Cart");
    }
  };

  return (
    <div className="w-[25rem] border border-primary rounded-2xl">
      {type === "limited" ? (
        <LimitedCrateBoxHeader item={item} />
      ) : (
        <div className="rounded-t-2xl bg-primary text-dark w-full text-center p-2 xs:py-4 xs:px-4 min-[500px]:px-6 font-medium line-clamp-1">
          STANDARD CRATE
        </div>
      )}
      <div className="rounded-b-2xl bg-dark p-4 xs:p-8">
        <div className="h-[10rem] xs:h-[12rem] flex flex-col justify-center">
          <div className="flex justify-center items-center gap-4">
            <div
              className={`flex items-start ${
                loggedUser.defaultDiscount !== 0 ? "line-through" : ""
              }`}
            >
              <Heading level={4} className="mt-1">
                $
              </Heading>
              <Heading level={1} className="text-primary">
                {item.price.toFixed(2)}
              </Heading>
            </div>
            {loggedUser.defaultDiscount !== 0 && (
              <div className="flex items-start">
                <Heading level={4} className="mt-1">
                  $
                </Heading>
                <Heading level={1} className="text-primary">
                  {(
                    item.price -
                    item.price * (loggedUser.defaultDiscount / 100)
                  ).toFixed(2)}
                </Heading>
              </div>
            )}
          </div>
          <Heading level={2} className="text-center line-clamp-2 my-2 xs:my-4">
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
        <hr className="my-4 xs:my-6 mx-6 border-grey hidden xs:block" />
        <div className="text-center line-clamp-5 break-words h-24">
          {item.plot}
        </div>
        <div className="mt-4 xs:mt-8 flex flex-row xs:flex-col gap-4">
          <Button
            className="w-full font-medium"
            rounded="md"
            size="md"
            onClick={() => {
              navigate("/crates/" + item._id);
            }}
          >
            Buy Now
          </Button>
          {loggedUser._id !== "" && (
            <Button
              className="w-full font-medium"
              theme="dark"
              rounded="md"
              size="md"
              onClick={() => {
                addToCart(item._id);
              }}
            >
              {cartText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrateBox;
