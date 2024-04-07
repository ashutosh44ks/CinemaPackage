import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, InputPassword, Checkbox, Heading } from "../../common";
import { api, myToast } from "../../utils";
import SocialLoginBtnGroup from "./components/SocialLoginBtnGroup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiSealCheck } from "react-icons/pi";

const RenderReferral = ({ refBy, setRefBy }) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("referralCode")) {
      setRefBy(searchParams.get("referralCode"));
    }
  }, [searchParams, setRefBy]);
  const [showReferral, setShowReferral] = useState(false);

  if (searchParams.get("referralCode")) {
    return (
      <p className="text-primary text-sm mb-4 flex gap-1 items-center">
        <PiSealCheck /> Referral Code Applied
      </p>
    );
  }
  if (showReferral)
    return (
      <div className="mb-4 w-full">
        <Input
          type="text"
          label="Referral Code (optional)"
          value={refBy}
          onChange={(e) => setRefBy(e.target.value)}
          className="w-full min-w-[20rem]"
        />
      </div>
    );
  return (
    <p
      className="cursor-pointer text-primary text-sm mb-4"
      onClick={() => setShowReferral(true)}
    >
      Do you have a referral code?
    </p>
  );
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [refBy, setRefBy] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const registerUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/signup`, {
        name,
        email,
        mobile: phone,
        password,
        ...(refBy && { refBy }),
      });
      console.log(data);
      navigate(`/auth/verify-account?email=${email}`);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== cPassword)
          return myToast("Passwords do not match", "failure");
        else registerUser();
      }}
      className="max-w-[26rem]"
    >
      <div className="mb-12">
        <Heading level={2} className="text-center mb-2">
          Welcome to CinemaCrate!
        </Heading>
        <p className="text-center text-lightgrey2">
          Sign Up & Get $25 Bonus Credits to Start Watching
        </p>
      </div>
      <div className="mb-4 w-full">
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <Input
          type="text"
          label="Mobile No."
          value={phone}
          onChange={(e) => {
            let newVal = e.target.value;
            if (!isNaN(newVal) && newVal.length <= 10) setPhone(newVal);
          }}
          className="w-full min-w-[20rem]"
          maxLength={10}
          required
        />
      </div>
      <div className="relative mb-4 w-full">
        <InputPassword
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="relative mb-4 w-full">
        <InputPassword
          label="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <Checkbox
          value={terms}
          onChange={(e) => {
            if (e.target.checked) setTerms(false);
            else setTerms(true);
          }}
          required
          text={
            <span className="text-sm">
              I have read and agree to the{" "}
              <a
                className="text-primary hover:text-primary2"
                href="/terms"
                target="_blank"
                rel="noreferrer"
              >
                terms & conditions
              </a>
            </span>
          }
        />
      </div>
      <div className="mb-4 w-full text-xs">
        By submitting your mobile phone number & email address, you&apos;re
        authorising us (opting in) to send you informational and marketing
        related texts and emails. Reply STOP to unsubscribe.
      </div>
      <RenderReferral refBy={refBy} setRefBy={setRefBy} />
      <div className="w-full">
        <Button
          theme="primary"
          className="w-full font-semibold flex justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
      <div className="text-sm mt-2">
        Already have an account?{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={() => {
            if (searchParams.get("redirect"))
              navigate(`/auth/login?redirect=${searchParams.get("redirect")}`);
            else navigate("/auth/login");
          }}
        >
          Login
        </span>
      </div>
      <div className="flex items-center gap-2 my-4">
        <hr className="w-full border-grey" />
        <span className="text-sm text-grey">OR</span>
        <hr className="w-full border-grey" />
      </div>
      <SocialLoginBtnGroup />
    </form>
  );
};

export default Register;
