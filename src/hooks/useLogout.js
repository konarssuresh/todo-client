import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../constants/constants";
import { useNavigate } from "react-router";

const useLogout = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
      return true;
    },
  });

  return logoutMutation;
};

export { useLogout };
