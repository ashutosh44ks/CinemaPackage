import { useState, useEffect, useCallback } from "react";
import { api, myToast, useUserContext } from "../../../utils";

const useCartAPIs = () => {
  const { loggedUser, setLoggedUser } = useUserContext();

  const [cart, setCart] = useState([]);
  const [expiredItemCount, setExpiredItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const getCart = useCallback(async () => {
    try {
      const {
        data: { result },
      } = await api.get("/cart");
      const temp = result.filter(
        (item) =>
          +new Date(item.endDate) >= +new Date() && item.status === "active"
      );
      setCart(result);
      setExpiredItemCount(result.length - temp.length);
      setTotal(cart.reduce((acc, item) => acc + item.price, 0));
      setGrandTotal(
        cart.reduce((acc, item) => acc + item.price, 0) -
          (cart.reduce((acc, item) => acc + item.price, 0) *
            loggedUser.defaultDiscount) /
            100
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [cart, loggedUser.defaultDiscount]);
  useEffect(() => {
    getCart();
  }, [getCart]);
  const removeFromCart = async (crateId) => {
    try {
      const { data } = await api.delete(`/cart/crate/${crateId}`);
      console.log(data);
      getCart();
      const temp = { ...loggedUser };
      temp.cart = temp.cart.filter((item) => item !== crateId);
      setLoggedUser(temp);
      myToast(data.msg, "success");
    } catch (error) {
      console.log(error);
      myToast(error?.response?.data?.error, "failure");
    }
  };
  const clearCart = async () => {
    try {
      const { data } = await api.delete("/cart/clear");
      console.log(data);
      setCart([]);
      setExpiredItemCount(0);
      setTotal(0);
      setGrandTotal(0);
      const temp = { ...loggedUser };
      temp.cart = [];
      setLoggedUser(temp);
      myToast(data.msg, "success");
    } catch (error) {
      console.log(error);
      myToast(error?.response?.data?.error, "failure");
    }
  };

  return {
    cart,
    expiredItemCount,
    total,
    grandTotal,
    loading,
    removeFromCart,
    clearCart,
  };
};

export default useCartAPIs;
