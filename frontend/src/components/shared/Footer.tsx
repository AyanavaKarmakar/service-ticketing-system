import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Footer = () => {
  const { username, userType } = useSelector(
    (state: RootState) => state.userData
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home, if user is not logged in or in the wrong dashboard
    if (
      (username === "employee1" && location.pathname !== "/dashboard/admin") ||
      (username !== "employee1" && location.pathname === "/dashboard/employee")
    ) {
      navigate("/");
    } else if (
      username !== "employee1" &&
      location.pathname !== `/dashboard/${userType}`
    ) {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <>
      {username !== "" && (
        <footer>
          <p className="text-center text-base text-black font-medium">
            Logged in as {username}
          </p>
        </footer>
      )}
    </>
  );
};
