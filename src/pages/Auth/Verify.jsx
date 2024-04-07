import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, myToast, useUserContext } from "../../utils";
import { Button, Heading, Input } from "../../common";
import { AiOutlineLoading } from "react-icons/ai";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loggedUser } = useUserContext();

  const [emailInput, setEmailInput] = useState("");
  useEffect(() => {
    setEmailInput(searchParams.get("email"));
  }, [searchParams]);

  const [otp, setOtp] = useState("");
  const verifyAccount = async () => {
    try {
      const { data } = await api.post(`/user/verifyAccount`, {
        email: emailInput,
        otp: +otp,
      });
      console.log(data);
      myToast(data.msg, "success");
      if (loggedUser._id !== "") navigate("/");
      else {
        myToast("Please login to continue", "success");
        if (searchParams.get("redirect"))
          navigate("/auth/login?redirect=" + searchParams.get("redirect"));
        else navigate("/auth/login");
      }
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };

  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const initiateVerify = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/user/generateOTP`, {
        email: emailInput,
      });
      console.log(data);
      myToast(data.msg, "success");
      setPage(1);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
      setShowResend(true);
    }
    setLoading(false);
  };

  const [page, setPage] = useState(0);

  if (page === 0)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          initiateVerify();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <Heading level={2} className="text-center mb-2">
            Verify Account
          </Heading>
          <p className="text-center text-grey">
            Enter your registered email to receive an OTP that&apos;ll be used
            for your verification
          </p>
        </div>
        <div className="mb-4 w-full">
          <Input
            type="email"
            label="Enter your registered email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full">
          <Button
            theme="primary"
            className="w-full flex gap-2 justify-center items-center font-medium"
            type="submit"
            disabled={loading}
          >
            {loading && <AiOutlineLoading className="animate-spin" size={16} />}
            Send OTP
          </Button>
        </div>
        {showResend && (
          <div className="w-full flex justify-end gap-1 font-medium text-sm mt-2">
            Did not receive OTP?
            <span
              className="cursor-pointer text-primary"
              onClick={() => {
                initiateVerify();
              }}
            >
              Resend
            </span>
          </div>
        )}
      </form>
    );
  else if (page === 1)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verifyAccount();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <Heading level={2} className="text-center mb-2">
            Verify Account
          </Heading>
          <p className="text-center text-grey">
            Enter the OTP sent to your email
          </p>
        </div>
        <div className="mb-4 w-full">
          <Input
            type="email"
            label="Email"
            value={emailInput}
            className="w-full min-w-[20rem]"
            disabled
            required
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full mb-4">
          <Button theme="primary" className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    );
};

export default VerifyAccount;
