import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";


const useRole = () => {
  const { user } = useAuth();

  const { data: role, isLoading, isError } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await fetch(`https://life-insurance-management-server.vercel.app/users/role/${user.email}`);
      const data = await res.json();
      return data?.role;
    },
  });

  return { role, isLoading, isError };
};

export default useRole;
