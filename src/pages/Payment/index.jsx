import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserQuery } from "../../utils";
import PaymentUI from "./components/PaymentUI";

const Payment = () => {
  const location = useLocation();
  const { refetchUserQuery} = useUserQuery();
  const searchParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState("");
  const validatePayment = () => {
    setTimeout(() => setStatus(searchParams.get("status")), 2500);
    refetchUserQuery();
  };

  return (
    <PaymentUI
      status={status}
      validatePayment={validatePayment}
      message={searchParams.get("message")}
    />
  );
};

export default Payment;
