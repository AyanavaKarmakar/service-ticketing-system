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
    if (username === "") {
      navigate("/");
    }

    // redirect to home, if user is not logged in or in the wrong dashboard
    if (
      (username === "employee1" &&
        !location.pathname.startsWith("/dashboard/admin".toLowerCase())) ||
      (username !== "employee1" &&
        location.pathname.startsWith("/dashboard/employee".toLowerCase()))
    ) {
      navigate("/");
    } else if (
      username !== "employee1" &&
      !location.pathname
        .toLowerCase()
        .startsWith(`/dashboard/${userType}`.toLowerCase())
    ) {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <>
      {username !== "" && (
        <footer className="m-8">
          <p className="text-center text-base text-black font-medium">
            {"Logged in as "}
            <span className="font-semibold underline">{username}</span>
          </p>
        </footer>
      )}
    </>
  );
};
