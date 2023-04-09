import { clsx } from "clsx";
import { useLocation, useNavigate } from "react-router";

export const RequestFormDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { requestFormId } = state;

  console.log(requestFormId);

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/dashboard/customer")}
        className={clsx(
          "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
          "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
        )}
      >
        Go Back
      </button>
    </>
  );
};
