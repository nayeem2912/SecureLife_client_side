import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";


const useRole = () => {
  const { user } = useAuth();

  const { data: role, isLoading, isError } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, // ensures query only runs when user is available
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users/role/${user.email}`);
      const data = await res.json();
      return data?.role;
    },
  });

  return { role, isLoading, isError };
};

export default useRole;
