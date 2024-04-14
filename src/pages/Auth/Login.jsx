import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { api, myToast, useUserContext } from "../../utils";
import { Button, Checkbox, Heading, Input, InputPassword } from "../../common";
import SocialLoginBtnGroup from "./components/SocialLoginBtnGroup";

const Login = () => {
  const { loggedUser, setLoggedUser } = useUserContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    // if user has checked remember me, then set the email and password from localStorage
    const user = JSON.parse(localStorage.getItem("cinemaUser"));
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: () =>
      api.post(`/login`, {
        email,
        password,
      }),
    onSuccess: ({ data: { data } }) => {
      localStorage.setItem("cinemaToken", data.token);
      localStorage.setItem("cinemaRefreshToken", data.refreshToken);
      if (rememberMe)
        localStorage.setItem(
          "cinemaUser",
          JSON.stringify({
            email,
            password,
          })
        );
      const decodedToken = jwtDecode(data.token);
      setLoggedUser({ ...loggedUser, _id: decodedToken.id });
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
      else navigate("/");
    },
    onError: (err) => {
      myToast(err?.response?.data?.error, "failure");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginMutation.mutate();
      }}
      className="max-w-[26rem]"
    >
      <div className="mb-6">
        <Heading level={2} className="text-center mb-2">
          Welcome Back!
        </Heading>
        <p className="text-center text-grey">
          Unbox Your Next Movie Night with CinemaCrate.
        </p>
        <p className="text-center text-grey">
          We&apos;re glad to see you back!
        </p>
      </div>
      <div className="mb-6 w-full">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-[20rem]"
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
      <div className="w-full flex justify-between mb-4">
        <Checkbox
          id="rememberMe"
          text="Remember Me"
          value={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="text-sm"
        />
        <span
          className="cursor-pointer text-sm hover:text-primary ease-linear duration-200"
          onClick={() => {
            navigate("/auth/forgot-password");
          }}
        >
          Forgot Password ?
        </span>
      </div>
      <div className="w-full">
        <Button theme="primary" className="w-full font-semibold" type="submit">
          Sign In
        </Button>
      </div>
      <div className="text-sm mt-2">
        Don&apos;t have an account?{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={() => {
            if (searchParams.get("redirect"))
              navigate(
                `/auth/register?redirect=${searchParams.get("redirect")}`
              );
            else navigate("/auth/register");
          }}
        >
          Register
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

export default Login;
