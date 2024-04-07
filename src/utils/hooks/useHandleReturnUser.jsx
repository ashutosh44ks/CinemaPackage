import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api, updateToken } from "../index";

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

  const getProfileShort = async () => {
    try {
      const { data } = await api.get("/getProfileShort");
      console.log(data);
      setLoggedUser({
        _id: data.dta._id,
        wallet: data.dta.wallet,
        name: data.dta.name,
        defaultDiscount: data.dta.defaultDiscount,
        cart: data.dta.cart || [],
        isAddress: data.dta.isAddress,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { loading, getProfileShort, loggedUser, setLoggedUser };
};

export default useHandleReturnUser;
