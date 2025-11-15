import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      let todos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (prevData) => {
        return prevData.filter((data) => data._id !== id);
      });

      const url = `${API_BASE}/todo/${id}`;

      const resp = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });

      if (!resp.ok) {
        if (resp.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        } else {
          queryClient.setQueryData(["todos"], todos);
          throw new Error("Error deleting todo");
        }
      }

      const data = await resp.json();

      return data;
    },
  });

  return mutation;
};
