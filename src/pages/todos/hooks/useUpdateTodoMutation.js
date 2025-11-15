import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useUpdateTodoMutation = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      const url = `${API_BASE}/todo/${id}/${completed ? "done" : "undone"}`;

      const resp = await fetch(url, {
        method: "POST",
        credentials: "include",
      });

      if (!resp.ok) {
        if (resp.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        } else {
          throw new Error("Error updating todo");
        }
      }

      const data = await resp.json();

      return data;
    },
  });

  return mutation;
};
