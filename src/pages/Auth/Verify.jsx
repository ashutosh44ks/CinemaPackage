import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api, myToast } from "../../utils";
import { Button, Heading, Input } from "../../common";
import { AiOutlineLoading } from "react-icons/ai";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [emailInput, setEmailInput] = useState("");
  // set emailInput from url (passed from register page)
  useEffect(() => {
    setEmailInput(searchParams.get("email"));
  }, [searchParams]);

  const [page, setPage] = useState(0);
  const [otp, setOtp] = useState("");

  const verifyOTPMutation = useMutation({
    mutationFn: () =>
      api.post(`/verifyOTP`, {
        email: emailInput,
        otp: +otp,
      }),
    onSuccess: () => {
      myToast("Please login to continue", "success");
      if (searchParams.get("redirect"))
        navigate("/auth/login?redirect=" + searchParams.get("redirect"));
      else navigate("/auth/login");
    },
    onError: (err) => myToast(err?.response?.data?.error, "failure"),
  });

  const [showResend, setShowResend] = useState(false);
  const generateOTPMutation = useMutation({
    mutationFn: () =>
      api.post(`/generateVerificationOTP`, {
        email: emailInput,
      }),
    onSuccess: (data) => {
      myToast(data.msg, "success");
      setPage(1);
    },
    onError: (err) => {
      myToast(err?.response?.data?.error, "failure");
      setShowResend(true);
    },
  });

  if (page === 0)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateOTPMutation.mutate();
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
            disabled={generateOTPMutation.isPending}
          />
        </div>
        <div className="w-full">
          <Button
            theme="primary"
            className="w-full flex gap-2 justify-center items-center font-medium"
            type="submit"
            disabled={generateOTPMutation.isPending}
          >
            {generateOTPMutation.isPending && (
              <AiOutlineLoading className="animate-spin" size={16} />
            )}
            Send OTP
          </Button>
        </div>
        {showResend && (
          <div className="w-full flex justify-end gap-1 font-medium text-sm mt-2">
            Did not receive OTP?
            <span
              className="cursor-pointer text-primary"
              onClick={() => {
                generateOTPMutation.mutate();
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
          verifyOTPMutation.mutate();
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
            disabled={verifyOTPMutation.isPending}
          />
        </div>
        <div className="w-full mb-4">
          <Button
            theme="primary"
            className="w-full"
            type="submit"
            disabled={verifyOTPMutation.isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    );
};

export default VerifyAccount;
