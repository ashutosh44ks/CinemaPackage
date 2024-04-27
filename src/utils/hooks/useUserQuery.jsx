import { useQuery } from "@tanstack/react-query";
import { api } from "../index";

function useUserQuery() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["profile", "short"],
    queryFn: async () => {
      const { data } = await api.get("/profile/short");
      return data;
    },
    enabled: localStorage.getItem("cinemaToken") !== null,
  });
  if (isPending)
    return {
      loggedUser: {
        _id: "",
      },
      refetchUserQuery: refetch,
    };
  if (data?.data === undefined) {
    console.log("Some serious shit happened");
    return {
      loggedUser: {
        _id: "",
      },
      refetchUserQuery: refetch,
    };
  }
  return {
    loggedUser: data.data.result,
    refetchUserQuery: refetch,
  };
}

export default useUserQuery;
