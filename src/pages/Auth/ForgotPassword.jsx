import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, myToast } from "../../utils";
import { Heading, Button, Input, InputPassword } from "../../common";
import { AiOutlineLoading } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const resetPassword = async () => {
    try {
      const { data } = await api.post(`/resetPass`, {
        email,
        otp: +otp,
        password,
      });
      console.log(data);
      myToast(data.msg, "success");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };

  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const initiateResetPass = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/resetPassOTP`, {
        email,
      });
      console.log(data);
      myToast(data.msg, "success");
      setPage(1);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
      setShowResend(true);
    }
    setLoading(false);
  };

  const [page, setPage] = useState(1);

  if (page === 0)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          initiateResetPass();
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
                initiateResetPass();
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
          resetPassword();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <Heading level={2} className="text-center mb-2">
            Reset Password
          </Heading>
          <p className="text-center text-lightgrey2">
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
            required
          />
        </div>
        <div className="mb-4 w-full">
          <InputPassword
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full mb-4">
          <Button theme="primary" className="w-full" type="submit">
            Change Password
          </Button>
        </div>
      </form>
    );
};

export default ForgotPassword;
