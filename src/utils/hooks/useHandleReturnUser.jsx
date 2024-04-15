import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { updateToken } from "../index";

const useHandleReturnUser = () => {
  const [loggedUser, setLoggedUser] = useState({
    _id: "",
    name: "",
    wallet: 0,
    defaultDiscount: 0,
    cart: [],
    isAddress: false,
  });
  const [loading, setLoading] = useState(true);
  const handleReturningUser = async () => {
    if (localStorage.getItem("cinemaToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("cinemaToken"));
      if (decodedToken.exp * 1000 < Date.now()) {
        const userId = await updateToken();
        setLoggedUser({ ...loggedUser, _id: userId });
      } else {
        console.log("back user", decodedToken, decodedToken.id);
        setLoggedUser({ ...loggedUser, _id: decodedToken.id });
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    handleReturningUser();
  }, []);

  return { loading, loggedUser, setLoggedUser };
};

export default useHandleReturnUser;
