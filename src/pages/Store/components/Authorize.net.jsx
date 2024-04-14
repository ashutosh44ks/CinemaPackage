import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptData, api } from "../../../utils";
import { PaymentCard } from "../../../common";

const Authorize = ({ storeId, loggedUser }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const authorizePayment = async (cardNumber, cardExpiryDate, cardCvc) => {
    setIsLoading(true);
    const encryptedCardDetails = encryptData(
      `${cardNumber},${cardExpiryDate},${cardCvc}`
    );
    try {
      const { data } = await api.post("/buyStoreAuthorize", {
        storeId,
        encryptedCardDetails,
      });
      console.log(data);
      navigate(
        `/payment/${storeId}?storeId=${storeId}&userId=${loggedUser._id}&status=success`
      );
    } catch (error) {
      console.log(error);
      navigate(
        `/payment/${storeId}?storeId=${storeId}&userId=${loggedUser._id}&status=failed&message=${error?.response?.data?.error}`
      );
    }
    setIsLoading(false);
  };

  return <PaymentCard isLoading={isLoading} submitFn={authorizePayment} />;
};

export default Authorize;
