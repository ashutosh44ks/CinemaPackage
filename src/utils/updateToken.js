import axios from "axios";
import { jwtDecode } from "jwt-decode";

const updateToken = async () => {
  const refreshToken = localStorage.getItem("cinemaRefreshToken");
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BASE_API_URL}user/refreshToken`,
      {
        refreshToken,
      }
    );
    localStorage.setItem("cinemaToken", data.result);
    const decodedToken = jwtDecode(data.result);
    console.log("token updated");
    return decodedToken.id;
  } catch (e) {
    console.log(e);
    localStorage.removeItem("cinemaToken");
    localStorage.removeItem("cinemaRefreshToken");
    return null;
  }
};

export default updateToken;
