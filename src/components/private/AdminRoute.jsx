import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminRoute = ({ children }) => {
  const isAdmin = useSelector(
    (state) => state.auth.currentUser && state.auth.currentUser.role === "admin"
  );

  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/"); // Redirect to the main page if user is not an admin
    }
  }, [isAdmin, router]);

  if (!isAdmin) { // Corrected the variable name here
    return null; 
  }

  return children;
};

export default AdminRoute;
