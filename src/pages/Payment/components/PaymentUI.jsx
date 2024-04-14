import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Button } from "../../../common";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";

const PaymentUI = ({ status, validatePayment, message }) => {
  const navigate = useNavigate();

  const [numberOfDots, setNumberOfDots] = useState(0);
  useEffect(() => {
    validatePayment();
    const myInterval = setInterval(() => {
      setNumberOfDots((numberOfDots) => (numberOfDots + 1) % 4);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [validatePayment]);
  
  return (
    <div className="flex flex-col items-center">
      <Heading level={2} className="mb-8">
        Payment <span className="text-primary">Validation</span>
      </Heading>
      {status === "" ? (
        <div>
          <Heading level={3} className="flex justify-center mb-2">
            <GoDotFill className="text-primary" />
            <GoDotFill
              className={`text-primary ${
                numberOfDots >= 1 ? "opacity-100" : "opacity-50"
              }`}
            />
            <GoDotFill
              className={`text-primary ${
                numberOfDots >= 2 ? "opacity-100" : "opacity-50"
              }`}
            />
            <GoDotFill
              className={`text-primary ${
                numberOfDots >= 3 ? "opacity-100" : "opacity-50"
              }`}
            />
          </Heading>
          <p className="text-center">
            Please wait while we validate your payment.
          </p>
          <p className="text-center">Do NOT refresh the page or go back.</p>
        </div>
      ) : status === "success" ? (
        <div>
          <h3 className="font-medium flex justify-center items-center gap-2 mb-2">
            <RiCheckboxCircleLine className="text-primary" />
            Payment Successful
          </h3>
          <p className="text-center text-lightgrey2">
            Thank you for your payment.
          </p>
          <div className="flex justify-center mt-8">
            <Button
              theme="primary"
              onClick={() => {
                navigate("/my-account/transactions");
              }}
            >
              Redirect to My Account
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-medium flex justify-center items-center gap-2 mb-2">
            <RxCrossCircled className="text-primary" />
            Payment Failed
          </h3>
          {message && (
            <>
              <p className="text-center mb-2">{message}</p>
              <p className="text-center text-lightgrey2">
                If you think this is an error, you can raise an issue in the support page.
              </p>
            </>
          )}
          <p className="text-center text-lightgrey2">
            Please copy the url and mention it while you raise an issue in the
            support page. We will get back to you shortly.
          </p>
          <div className="flex justify-center mt-8">
            <Button
              theme="primary"
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              Raise an Issue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentUI;
