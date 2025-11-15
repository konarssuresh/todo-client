import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useAddTodoMutation = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (title = "") => {
      let url = `${API_BASE}/todo`;
      let body = { title };

      const resp = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        if (resp.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        } else {
          throw new Error("Error adding  todo");
        }
      }

      let data = await resp.json();

      return data;
    },
  });

  return mutation;
};
