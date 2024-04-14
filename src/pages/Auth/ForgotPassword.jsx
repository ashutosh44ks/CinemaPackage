import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api, myToast } from "../../utils";
import { Heading, Button, Input, InputPassword } from "../../common";
import { AiOutlineLoading } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const resetPassMutation = useMutation({
    mutationFn: () =>
      api.post(`/resetPassword`, {
        email,
        otp: +otp,
        password,
      }),
    onSuccess: ({ data }) => {
      myToast(data.msg, "success");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    },
    onError: (err) => {
      myToast(err?.response?.data?.error, "failure");
    },
  });

  const [showResend, setShowResend] = useState(false);
  const generateResetPassOTPMutation = useMutation({
    mutationFn: () =>
      api.post(`/generateResetPassOTP`, {
        email,
      }),
    onSuccess: ({ data }) => {
      myToast(data.msg, "success");
      setPage(1);
    },
    onError: (err) => {
      myToast(err?.response?.data?.error, "failure");
      setShowResend(true);
    },
  });

  const [page, setPage] = useState(0);

  if (page === 0)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateResetPassOTPMutation.mutate();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <Heading level={2} className="text-center mb-2">
            Reset Password
          </Heading>
          <p className="text-center text-grey">
            Enter your registered email to receive a password reset OTP
          </p>
        </div>
        <div className="mb-4 w-full">
          <Input
            type="email"
            label="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-[20rem]"
            disabled={generateResetPassOTPMutation.isPending}
            required
          />
        </div>
        <div className="w-full">
          <Button
            theme="primary"
            className="w-full flex gap-2 justify-center items-center font-medium"
            type="submit"
            disabled={generateResetPassOTPMutation.isPending}
          >
            {generateResetPassOTPMutation.isPending && (
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
                generateResetPassOTPMutation.mutate();
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
          resetPassMutation.mutate();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <Heading level={2} className="text-center mb-2">
            Reset Password
          </Heading>
          <p className="text-center text-grey">
            Enter the OTP sent to your email and your new password
          </p>
        </div>
        <div className="mb-4 w-full">
          <Input
            type="email"
            label="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-[20rem]"
            disabled
            required
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            label="Enter OTP sent in your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full min-w-[20rem]"
            disabled={resetPassMutation.isPending}
            required
          />
        </div>
        <div className="mb-4 w-full">
          <InputPassword
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full min-w-[20rem]"
            disabled={resetPassMutation.isPending}
            required
          />
        </div>
        <div className="w-full mb-4">
          <Button
            theme="primary"
            className="w-full"
            type="submit"
            disabled={resetPassMutation.isPending}
          >
            Change Password
          </Button>
        </div>
      </form>
    );
};

export default ForgotPassword;
