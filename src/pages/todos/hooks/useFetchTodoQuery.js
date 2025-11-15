import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useFetchTodoQuery = () => {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async function () {
      const resp = await fetch(`${API_BASE}/todo`, {
        credentials: "include",
        method: "GET",
      });

      if (!resp.ok) {
        if (resp.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        } else {
          throw new Error("error fetching todos");
        }
      }

      const data = await resp.json();

      return data;
    },
  });

  return query;
};
